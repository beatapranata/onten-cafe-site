/* Every word, price and link on the site. If a fact isn't in here with a
   source, it doesn't ship.

   Sources:
   [menu]   In-store printed menu card, photographed 2026-09-13
   [on10]   In-store ON10 Handroll Menu card, photographed 2026-09-13
   [gbp]    Google Business Profile listing "Cafe Onten", viewed 2026-09-13
   [resy]   Sushi Onten listing on Resy (Instagram handle only)
   [photo]  Google listing interior photo: white double-height room, wood
            furniture, potted trees — basis for "bright, plant-filled"
   [shots]  The cafe's official photos (src/assets/photos, non-"brady"): the
            La Marzocco on the bar, the labelled pastry case (cinnamon stick,
            raspberry cheese danish, croissants), the pour-over, the ceramics
   [wifi]   In-store "FREE Wi-Fi — Scan to join" placard, photographed 2026-09-13 */

import type { StaticImageData } from "next/image";
import barDetail from "@/assets/photos/bar-detail-dried-flowers.jpg";
import barista from "@/assets/photos/barista-pour-over.jpg";
import baristaGlazed from "@/assets/photos/barista-pour-glazed-cup.jpg";
import ceramics from "@/assets/photos/ceramic-bowls-window.jpg";
import counterPampas from "@/assets/photos/counter-iced-drink-pampas.jpg";
import on10Sign from "@/assets/photos/on10-sign-olive-tree.jpg";
import friends from "@/assets/photos/friends-iced-coffee-laughing.jpg";
import pinkTee from "@/assets/photos/iced-coffee-pink-dried-flowers.jpg";
import oliveTree from "@/assets/photos/iced-latte-olive-tree.jpg";
import diningRoom from "@/assets/photos/dining-room-window-wall.jpg";
import interior from "@/assets/photos/interior-sunlit-bar-trees.jpg";
import latteHeart from "@/assets/photos/latte-art-heart-pour.jpg";
import latteRoom from "@/assets/photos/latte-glazed-cup-room.jpg";
import lattePour from "@/assets/photos/latte-pour-ceramic-cup.jpg";
import table from "@/assets/photos/live-edge-communal-table.jpg";
import pastry from "@/assets/photos/pastry-case-croissants.jpg";

export type Price = number;

/* `tier` is Brady's ranking from the folder he delivered, and it decides
   placement: "primary" (the cafe's official photos, and his shots he put
   alongside them) take prime spots; "last" (his USE LAST folder) only ever
   appears after everything else. */
export type Photo = {
  src: StaticImageData;
  alt: string;
  caption: string;
  tier: "primary" | "last";
  /* where the subject sits, for object-position when the frame crops */
  focus?: string;
};

export type MenuItem = { name: string; price: Price; note?: string };

export type MenuGroup = { title: string; items: MenuItem[] };

/* Written the way the menu board writes them: parts joined with "+". */
export type Signature = {
  name: string;
  price: Price;
  parts: string[];
};

export const BUSINESS = {
  /* [gbp] name as registered. The signage and menu set it as "ONTEN CAFE" —
     the wordmark follows the collateral, structured data follows the listing,
     so NAP stays identical to Google. */
  legalName: "Cafe Onten",
  wordmark: "ONTEN CAFE",
  wordmarkCaption: "COFFEE",
  street: "180 10th St NE",
  city: "Atlanta",
  region: "GA",
  postal: "30309",
  neighborhood: "Midtown",
  phoneDisplay: "(770) 457-7161",
  phoneE164: "+17704577161",
  instagram: "on10_atl",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Cafe+Onten+180+10th+St+NE+Atlanta+GA+30309",
  rating: { value: 4.9, count: 7, source: "Google" },
} as const;

export const SITE = {
  title: "Coffee Shop in Midtown Atlanta — Cafe Onten",
  description:
    "Layered house signatures with housemade ube, peanut and coconut syrups — plus the ON10 handroll bar at the same address. 180 10th St NE, Midtown.",
} as const;

export const HERO = {
  eyebrow: "Midtown Atlanta · 10th Street",
  headlineLead: "Layered coffee,",
  headlineAccent: "made in house.",
  lede:
    "Housemade ube, peanut and coconut syrups, three cold foams, and a four-drink signature list — poured in a bright, plant-filled room on 10th Street.",
} as const;

/* [menu] "OUR SIGNATURES", in board order */
export const SIGNATURES: Signature[] = [
  { name: "Coconuts About You", price: 7.25, parts: ["Iced latte", "coconut syrup", "vanilla syrup"] },
  { name: "In a Jiffy", price: 7.5, parts: ["Flash brew", "salted peanut foam", "cocoa powder"] },
  { name: "Ube-tter Believe It", price: 7.75, parts: ["Iced latte", "coconut milk", "ube foam"] },
  { name: "Onten Classic", price: 7.5, parts: ["2 shots espresso", "Thai tea", "vanilla cold foam"] },
];

export const build = (s: Signature) => s.parts.join(" + ");

export const SIGNATURES_COPY = {
  eyebrow: "Our signatures",
  body: "Built on the housemade syrups and cold foams — the base, the shot, and what sits on top.",
} as const;

/* [menu] "COFFEE" board */
export const MENU: MenuGroup[] = [
  {
    title: "Hot coffee",
    items: [
      { name: "Americano", price: 4.75 },
      { name: "Cappuccino", price: 4.75 },
      { name: "Cortado", price: 4.75 },
      { name: "Espresso", price: 2.5, note: "2 shots" },
      { name: "Latte", price: 4.95 },
    ],
  },
  {
    title: "Cold coffee",
    items: [
      { name: "Iced Americano", price: 4.95 },
      { name: "Iced Latte", price: 5.25 },
      { name: "Iced Mocha", price: 5.75 },
      { name: "Flash Brew Coffee", price: 4.95 },
    ],
  },
  {
    title: "Non-coffee",
    items: [
      { name: "Matcha Latte", price: 6.5 },
      { name: "Hot Chocolate", price: 4.0 },
      { name: "Thai Tea", price: 6.5 },
    ],
  },
];

/* [menu] "FLAVORS / ADD ONS" */
export const ADD_ONS = {
  syrups: {
    title: "Housemade syrups",
    items: ["Ube", "Peanut", "Coconut", "Caramel", "Vanilla", "Mocha"],
    price: "+.50 · extra +.75",
  },
  seasonal: {
    title: "Seasonal syrups",
    items: ["Miso brown sugar", "Maple cinnamon"],
    price: "+.75",
  },
  foam: {
    title: "Cold foam",
    items: ["Vanilla", "Ube", "Salted peanut"],
    price: "Salted peanut +1.25",
  },
  milk: {
    title: "Milk",
    items: ["Almond", "Oat", "Coconut"],
    price: "+.50",
  },
} as const;

/* [on10] */
export const ON10 = {
  name: "ON10 Handroll Bar",
  eyebrow: "Same address, at the bar",
  headline: "Original handrolls, at the bar.",
  body: "Original handrolls are served at the Handroll Bar only. Walk-ins welcome.",
  hours: "11:30 AM – 9:30 PM",
  byob: "Free BYOB",
  sets: [
    { name: "4-roll set", price: 24, rolls: ["Spicy tuna", "Salmon", "Lobster", "Scallop"] },
    {
      name: "6-roll set",
      price: 38,
      rolls: ["Spicy tuna", "Salmon", "Lobster", "Scallop", "Blue crab", "Wagyu"],
    },
  ],
} as const;

export const PHOTOS = {
  on10Sign: {
    src: on10Sign,
    alt: "The ON10 sign on a white soffit above the bar, seen past the soft leaves of an olive tree",
    caption: "ON10",
    tier: "primary",
    focus: "55% 35%",
  },
  pinkTee: {
    src: pinkTee,
    alt: "A smiling woman in a pink T-shirt holds an iced coffee beside potted olive trees and dried flowers",
    caption: "Iced, to stay",
    tier: "primary",
    focus: "45% 40%",
  },
  barDetail: {
    src: barDetail,
    alt: "Dried flowers in grey stone vases and bags of coffee lined up in front of a La Marzocco espresso machine",
    caption: "The La Marzocco",
    tier: "primary",
    focus: "30% 55%",
  },
  friends: {
    src: friends,
    alt: "Two friends laugh together holding iced coffees in the cafe's bright dining room",
    caption: "Stay a while",
    tier: "primary",
    focus: "50% 38%",
  },
  interior: {
    src: interior,
    alt: "Cafe Onten's sunlit dining room: white walls, wooden chairs and round tables, a leather banquette, and potted trees beside the espresso bar",
    caption: "The room",
    tier: "primary",
    focus: "62% 55%",
  },
  /* Replaced a counter photo that turned out to be stock — never ship one on
     a real business's site, however on-brand it looks. */
  diningRoom: {
    src: diningRoom,
    alt: "Guests working at the long live-edge table and leather banquettes beneath a two-storey window wall, with potted trees and a bonsai",
    caption: "The dining room",
    tier: "primary",
    focus: "55% 55%",
  },
} satisfies Record<string, Photo>;

/* [shots] Gallery order is deliberate: primary tier first, "last" tier last. */
export const INSIDE = {
  eyebrow: "Inside",
  headlineLead: "Sunlight, ceramics,",
  headlineAccent: "and a long wood table.",
  body: "Espresso on the La Marzocco, milk poured to order, and croissants, cinnamon sticks and raspberry cheese danishes in the case.",
  photos: [
    {
      src: lattePour,
      alt: "A barista in a canvas apron pours steamed milk into a grey ceramic cup at the wooden bar",
      caption: "Poured to order",
      tier: "primary",
      focus: "55% 45%",
    },
    {
      src: table,
      alt: "A long live-edge wooden communal table lined with wooden chairs and small potted plants under white industrial ceilings",
      caption: "The long table",
      tier: "primary",
      focus: "50% 70%",
    },
    {
      src: barista,
      alt: "A smiling barista in a cap and apron makes a pour-over at the bar beside dried flowers",
      caption: "Pour-over at the bar",
      tier: "primary",
      focus: "40% 50%",
    },
    {
      src: pastry,
      alt: "A wooden pastry case with croissants, a cinnamon stick and a raspberry cheese danish on paper doilies, labelled with chalkboard signs",
      caption: "In the case",
      tier: "primary",
      focus: "55% 45%",
    },
    {
      src: ceramics,
      alt: "Rows of glazed ceramic bowls on a wooden shelf and table by a sunlit window, beside a basket of dried grasses",
      caption: "By the window",
      tier: "primary",
      focus: "60% 60%",
    },
    {
      src: baristaGlazed,
      alt: "A barista in a canvas apron pours steamed milk from a steel pitcher into a purple glazed cup",
      caption: "Into the glaze",
      tier: "primary",
      focus: "45% 60%",
    },
    {
      src: counterPampas,
      alt: "A man in a sage T-shirt holds an iced drink at the live-edge counter, with pampas grass and shelves of coffee bags behind him",
      caption: "At the counter",
      tier: "primary",
      focus: "55% 45%",
    },
    {
      src: oliveTree,
      alt: "A woman in a grey hoodie smiles holding an iced latte beside an olive tree and a leather banquette",
      caption: "Iced latte",
      tier: "primary",
      focus: "50% 35%",
    },
    {
      src: latteHeart,
      alt: "Milk pours from a steel pitcher into a latte in a glazed ceramic cup, forming heart-shaped latte art",
      caption: "Latte art",
      tier: "last",
      focus: "50% 58%",
    },
    {
      src: latteRoom,
      alt: "A hand holds a latte with leaf art in a pink-and-purple glazed cup, the dining room soft in the background",
      caption: "A latte, to stay",
      tier: "last",
      focus: "50% 55%",
    },
  ] satisfies Photo[],
} as const;

/* [wifi] */
export const LINGER = {
  headline: "Stay a while.",
  note: "Free Wi-Fi",
  detail: "Scan the code in the cafe to join.",
} as const;

export const CREDIT = {
  lead: "Website built by",
  name: "ClipPlayMedia",
  url: "https://clipplaymedia.com",
} as const;

export const NAV = [
  { href: "#signatures", label: "Signatures" },
  { href: "#menu", label: "Menu" },
  { href: "#inside", label: "Inside" },
  { href: "#on10", label: "ON10" },
  { href: "#visit", label: "Visit" },
] as const;

/* Always two decimals: prices sit in a right-aligned column, and "$4" beside
   "$4.75" breaks it. (The handroll sets print as whole dollars on their own
   card and render directly, not through this.) */
export const money = (p: Price) => `$${p.toFixed(2)}`;

export const addressLine = `${BUSINESS.street}, ${BUSINESS.city}, ${BUSINESS.region} ${BUSINESS.postal}`;
