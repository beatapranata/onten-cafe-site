#!/usr/bin/env node
/**
 * WCAG contrast matrix for a design-system palette.
 *
 * Why this exists as a script rather than arithmetic done inline: nearly every
 * real contrast failure hides behind alpha or color-mix(). `rgba(238,233,215,.72)`
 * is not `#eee9d7` — it renders as `#b3b3a9` over one ground and `#b7b8af` over
 * another, and those are different ratios. Comments in shipped codebases are
 * wrong about this routinely, and each one is a shipped accessibility bug.
 *
 * Usage:
 *   node contrast.mjs palette.json
 *   node contrast.mjs palette.json --json      machine-readable output
 *   node contrast.mjs palette.json --strict    exit 1 on any declared-pair failure
 *
 * Input shape (see assets/palette.example.json):
 * {
 *   "tokens":     { "ink": "#191b1c", "paper": "#f2eee3", ... },
 *   "grounds":    ["paper", "ink"],          // surfaces text actually sits on
 *   "composites": [                          // alpha / color-mix values, resolved
 *     { "name": "muted-on-dark", "fg": "#f2eee3", "alpha": 0.72, "over": "ink" },
 *     { "name": "note", "mix": ["#eee9d7", 0.52], "over": "navy" }
 *   ],
 *   "pairs": [                               // combinations you INTEND to ship
 *     { "fg": "ink", "bg": "paper", "size": "body" },
 *     { "fg": "accent", "bg": "paper", "size": "large" }
 *   ]
 * }
 *
 * `size` is "body" (needs 4.5:1) or "large" (needs 3:1 — ≥24px, or ≥19px bold).
 * Omit `pairs` and everything is reported without gating.
 */

import { readFileSync } from "node:fs";

/* ---------------------------------------------------------------- colour */

const hex = (h) => {
  const s = String(h).trim().replace(/^#/, "");
  const full = s.length === 3 ? s.split("").map((c) => c + c).join("") : s;
  if (!/^[0-9a-fA-F]{6}$/.test(full)) throw new Error(`Bad hex: ${h}`);
  const n = parseInt(full, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};

const toHex = (rgb) =>
  "#" + rgb.map((c) => Math.round(c).toString(16).padStart(2, "0")).join("");

/* sRGB → linear, then relative luminance. Exactly the WCAG formula; do not
   substitute a cheap weighted sum here — that's fine for a binary light/dark
   decision, but it gives wrong ratios. */
const lin = (c) => {
  const x = c / 255;
  return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
};

const luminance = ([r, g, b]) =>
  0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);

const ratio = (a, b) => {
  const la = luminance(a);
  const lb = luminance(b);
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
};

/** Source-over composite: what the eye actually receives. */
const composite = (fg, alpha, bg) =>
  fg.map((c, i) => c * alpha + bg[i] * (1 - alpha));

/* ------------------------------------------------------------------ input */

const file = process.argv[2];
const asJson = process.argv.includes("--json");
const strict = process.argv.includes("--strict");

if (!file) {
  console.error(
    "usage: node contrast.mjs <palette.json> [--json] [--strict]\n" +
      "       see assets/palette.example.json for the input shape",
  );
  process.exit(2);
}

let spec;
try {
  spec = JSON.parse(readFileSync(file, "utf8"));
} catch (err) {
  console.error(`Could not read ${file}: ${err.message}`);
  process.exit(2);
}

const tokens = spec.tokens ?? {};
if (!Object.keys(tokens).length) {
  console.error("No `tokens` in palette file — nothing to measure.");
  process.exit(2);
}

/** Resolve a name or a literal hex to rgb. */
const resolve = (ref) => {
  if (ref == null) throw new Error("Missing colour reference");
  if (typeof ref === "string" && tokens[ref]) return hex(tokens[ref]);
  return hex(ref);
};

/* Resolve composites into named, concrete colours so they can be measured and,
   crucially, so the computed hex is printed — that value is what belongs in a
   code comment, not the raw token. */
const resolved = {};
for (const [name, value] of Object.entries(tokens)) resolved[name] = hex(value);

const composites = [];
for (const c of spec.composites ?? []) {
  const over = resolve(c.over);
  let fg;
  let alpha;
  if (Array.isArray(c.mix)) {
    // color-mix(in oklab, X n%, GROUND) approximated in sRGB. Close enough for
    // a pass/fail gate; if a value lands within ~0.15 of the threshold, check it
    // in the browser rather than trusting this.
    [fg, alpha] = [hex(c.mix[0]), c.mix[1] > 1 ? c.mix[1] / 100 : c.mix[1]];
  } else {
    fg = resolve(c.fg);
    alpha = c.alpha ?? 1;
  }
  const flat = composite(fg, alpha, over);
  const name = c.name ?? `${c.fg ?? "mix"}@${alpha}-over-${c.over}`;
  resolved[name] = flat;
  composites.push({
    name,
    computed: toHex(flat),
    over: c.over,
    ratio: ratio(flat, over),
    alpha,
  });
}

/* ----------------------------------------------------------------- matrix */

const groundNames = spec.grounds?.length
  ? spec.grounds
  : Object.keys(tokens); // no declared grounds: measure everything against everything

/* Only cross the raw TOKENS with the grounds. Composites are deliberately
   excluded from the matrix and reported separately against their own `over`
   ground — a composite is a colour that only exists on one surface, so
   measuring `hero-lede` against `sand` produces a row that can never occur
   and buries the rows that can. The first version of this script emitted 150
   rows for a 12-colour palette and nobody read past the first screen. */
const rows = [];
const seen = new Set();
for (const fgName of Object.keys(tokens)) {
  for (const gName of groundNames) {
    if (fgName === gName) continue;
    const bg = resolved[gName];
    if (!bg) continue;
    const key = [fgName, gName].sort().join("|");
    if (seen.has(key)) continue;
    seen.add(key);
    rows.push({ fg: fgName, bg: gName, ratio: ratio(resolved[fgName], bg) });
  }
}
rows.sort((a, b) => b.ratio - a.ratio);

/* Below ~2.5 a pair is so far from usable for text that listing it is noise —
   those are two grounds, not a text/ground pair. Keep them out of the default
   view; --all brings them back for a full audit. */
const FLOOR = 2.5;
const showAll = process.argv.includes("--all");
const visible = showAll ? rows : rows.filter((r) => r.ratio >= FLOOR);

/* ------------------------------------------------------- declared pairs */

const failures = [];
for (const p of spec.pairs ?? []) {
  const need = p.size === "large" ? 3 : 4.5;
  const r = ratio(resolve(p.fg), resolve(p.bg));
  if (r < need) {
    failures.push({ ...p, size: p.size ?? "body", ratio: r, need });
  }
}

/* ----------------------------------------------------------------- output */

if (asJson) {
  console.log(
    JSON.stringify({ matrix: rows, composites, failures }, null, 2),
  );
} else {
  const mark = (r) => (r >= 7 ? "AAA" : r >= 4.5 ? "AA " : r >= 3 ? "lg " : "-- ");
  const w = Math.max(...Object.keys(resolved).map((k) => k.length), 12);

  console.log(`\nContrast matrix — ${file}`);
  console.log(
    showAll
      ? "Tokens × grounds, all pairs.\n"
      : `Tokens × grounds, pairs at ${FLOOR}:1 or better (${rows.length - visible.length} lower pairs hidden — pass --all to see them).\n`,
  );
  console.log(
    `${"FOREGROUND".padEnd(w)}  ${"GROUND".padEnd(14)}  RATIO   BODY  LARGE`,
  );
  console.log("-".repeat(w + 40));
  for (const { fg, bg, ratio: r } of visible) {
    console.log(
      `${fg.padEnd(w)}  ${bg.padEnd(14)}  ${r.toFixed(2).padStart(5)}   ` +
        `${r >= 4.5 ? " ok " : "FAIL"}  ${r >= 3 ? " ok " : "FAIL"}   ${mark(r)}`,
    );
  }

  if (composites.length) {
    console.log(
      "\nComposited values — paste the computed hex into your comments, not the token\n",
    );
    for (const c of composites) {
      console.log(
        `  ${c.name.padEnd(w)}  ${c.computed}  over ${String(c.over).padEnd(12)}` +
          `  ${c.ratio.toFixed(2).padStart(5)}  ${c.ratio >= 4.5 ? "ok" : c.ratio >= 3 ? "large only" : "FAIL"}`,
      );
    }
  }

  if (spec.pairs?.length) {
    console.log(
      `\nDeclared pairs: ${spec.pairs.length - failures.length}/${spec.pairs.length} pass`,
    );
    for (const f of failures) {
      console.log(
        `  FAIL  ${f.fg} on ${f.bg} (${f.size}) — ${f.ratio.toFixed(2)}, needs ${f.need}`,
      );
    }
  }

  if (failures.length) {
    console.log(
      "\nFix these before writing components. The usual remedies, in order:\n" +
        "  1. Deepen the foreground into a `-deep` variant kept for this purpose.\n" +
        "  2. Move the text to a different named ground.\n" +
        "  3. Demote the colour to decoration (rules, fills, large display) and\n" +
        "     use a text token for anything that must be read.\n" +
        "  Making the text bigger is a last resort, not a fix — a caption that\n" +
        "  becomes a subhead to pass contrast is now the wrong caption.\n",
    );
  } else {
    console.log("");
  }
}

process.exit(strict && failures.length ? 1 : 0);
