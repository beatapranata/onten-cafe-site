import { ADD_ONS, BUSINESS, MENU, ON10, SIGNATURES, build } from "@/lib/content";

/* Generated from the same content module that renders the page, so the
   markup can't drift from what's visible.

   Deliberately absent:
   • aggregateRating — the 4.9 is Google's, not a first-party review system.
     Marking up third-party ratings as your own is a structured-data policy
     violation and a manual-action risk. It's shown on the page, attributed.
   • openingHoursSpecification — sources disagree on coffee hours. Only the
     handroll bar's hours are printed in-store, and they appear in the copy. */
export function StructuredData({ siteUrl }: { siteUrl: string }) {
  const offer = (price: number) => ({
    "@type": "Offer",
    price: price.toFixed(2),
    priceCurrency: "USD",
  });

  const data = {
    "@context": "https://schema.org",
    "@type": "CafeOrCoffeeShop",
    name: BUSINESS.legalName,
    alternateName: "Onten Cafe",
    url: siteUrl,
    telephone: BUSINESS.phoneE164,
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS.street,
      addressLocality: BUSINESS.city,
      addressRegion: BUSINESS.region,
      postalCode: BUSINESS.postal,
      addressCountry: "US",
    },
    servesCuisine: ["Coffee", "Japanese"],
    sameAs: [`https://www.instagram.com/${BUSINESS.instagram}`],
    hasMenu: {
      "@type": "Menu",
      name: "Coffee menu",
      hasMenuSection: [
        {
          "@type": "MenuSection",
          name: "Signatures",
          hasMenuItem: SIGNATURES.map((s) => ({
            "@type": "MenuItem",
            name: s.name,
            description: build(s),
            offers: offer(s.price),
          })),
        },
        ...MENU.map((g) => ({
          "@type": "MenuSection",
          name: g.title,
          hasMenuItem: g.items.map((i) => ({
            "@type": "MenuItem",
            name: i.name,
            ...(i.note ? { description: i.note } : {}),
            offers: offer(i.price),
          })),
        })),
        {
          "@type": "MenuSection",
          name: ON10.name,
          description: `${ON10.body} ${ON10.byob}. ${ON10.hours}.`,
          hasMenuItem: ON10.sets.map((set) => ({
            "@type": "MenuItem",
            name: `Handroll ${set.name}`,
            description: set.rolls.join(", "),
            offers: offer(set.price),
          })),
        },
      ],
    },
    description: `Coffee with housemade ${ADD_ONS.syrups.items
      .slice(0, 3)
      .join(", ")
      .toLowerCase()} syrups and layered house signatures, plus the ON10 handroll bar, in Midtown Atlanta.`,
  };

  return (
    <script
      type="application/ld+json"
      /* JSON.stringify escapes quotes; the < replace stops a menu string from
         ever closing the script tag early. */
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
