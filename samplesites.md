# Sample Site Designs — Build Runbook

How we build the real-world-inspired sample designs. Follow this routine for
every design so they all meet the same bar.

---

## Goal

Recreate well-known real businesses' websites as selectable **designs** for
Kovasite tenants. Keep each reference's **structure/layout faithful**, but swap
in the client's own **images, video, copy, menu, hours, contact**. Every type
(food, hair & beauty, fitness, …) gets a set of designs the client can pick.

Plan per sector: build the reference designs **as originals first**, then derive
**2 variants per original** (e.g. 6 originals → 18 total), before moving to the
next sector.

---

## Hard requirements (every design)

1. **Faithful structure** — match the reference's section order, hero type, nav,
   booking/CTA placement, and footer. Compare against the reference screenshots.
2. **Single venue** — our tenants are one business, not a chain. Drop
   multi-location grids / 50-location dropdowns; adapt those to single-venue
   sections (hero, about, menu, gallery, hours, contact).
3. **Swap all media** — never reuse the reference's photos/video. Use the
   tenant's `hero_image_url` / `hero_video_url` / `gallery`, with tasteful
   placeholders for samples.
4. **Editable in place** — tag editable text with `data-edit` and images with
   `data-edit-image` so the on-page editor works:
   - `data-edit="tenant.business_name"`, `data-edit="content.tagline"`,
     `data-edit="content.about"`, `data-edit="content.phone|email|address|cuisine_type"`
   - menu items: `data-edit="item:<id>:name|description|price"`
   - hours: `data-edit="hours:<i>:day|open"`
   - images: `data-edit-image="hero"` (and gallery images render plain).
5. **Mobile responsive** — test narrow widths. Stack multi-column sections;
   collapse the nav to a **functional** hamburger (see Interactivity); make
   full-width buttons; never let absolutely-positioned items collide.
6. **Interactivity needs a client component** — designs are server-rendered, so
   anything stateful (mobile menu, toggles, carousels) goes in a small
   `"use client"` component (e.g. `MobileNav.tsx`). Don't ship dead buttons.
7. **Palette** — bake the reference's palette as the design's identity
   (constants at top of the file). It's fine to read `var(--accent)` where the
   reference uses a single accent, but match the look first.
8. **Pull real data** — use `groupCatalog(catalog)` for the menu, `content.hours`
   for hours, `content.socials` for social links, `content.ordering_links` for
   order/delivery buttons, etc. Render these as **lists** (map over the array) so
   rows a tenant adds in the dashboard appear automatically; fall back gracefully
   when empty. Don't hardcode hours/socials — tenants add/remove these rows
   themselves (Content & menu → add-row editors).
9. **Sticky header** — the nav/header sticks to the top while scrolling. Build it
   as a `fixed inset-x-0 top-0 z-50` client component that's transparent over the
   hero and turns solid (brand colour) once `window.scrollY > ~40` (e.g.
   `EmberHeader.tsx`). Keep editable bits (`data-edit="tenant.business_name"`) in
   it; add `pointer-events-auto` on those where the wrapper is `pointer-events-none`.
10. **Everything works — real bookings, contact & links.** No dead buttons. The
    site is for the tenant to actually take reservations and enquiries:
    - **Booking widget** → a `"use client"` component that POSTs to
      `/api/site-forms` with `{ tenantId: tenant.id, kind: "booking", fields: { name, contact, date, time, party, notes } }`. Model it on `EmberBooking.tsx`
      (honeypot field `company`, sending/sent/error states). It emails the owner;
      sample/preview tenants (`id` starts `sample-`) no-op with the success state.
    - **Contact form** → reuse `SiteContactForms` (`@/components/SiteContactForms`)
      with `booking={false} contact` (same endpoint), or a styled clone.
    - Gate both on `content.booking_enabled !== false` /
      `content.contact_form_enabled !== false`; drop the section + its nav link
      when off.
    - Phone/email are `tel:`/`mailto:` links; address has a "Get directions"
      button using `content.map_url`; every nav/footer link points to a real
      in-page anchor (`#menu`, `#book`, `#visit`, …) — never a dead `#`.
11. **Render from data so tenant edits show.** Tenants edit AND add/remove rows
    in the dashboard (Content & menu): hours, socials, ordering links, menu items,
    gallery, team. There is **no raw-JSON box** on the tenant side. So map over the
    arrays (`content.hours`, `content.socials`, `content.ordering_links`,
    `groupCatalog(catalog)`, `gallery`) — never hardcode them — and they update live.

---

## Architecture (how a design plugs in)

- **Field:** `SiteContent.design?: string` (in `lib/types.ts`). When set, it
  overrides the generic `style` system and takes over the whole page.
- **Registry:** `presets/restaurant/designs/index.tsx` →
  `RESTAURANT_DESIGNS = { ember: Ember, … }` + `getRestaurantDesign(key)`.
  (Each archetype that gets bespoke designs has its own registry folder, e.g.
  `presets/<archetype>/designs/`.)
- **Preset hook:** at the top of the archetype preset (e.g.
  `RestaurantSite.tsx`):
  ```tsx
  const Design = getRestaurantDesign(props.site.content.design);
  if (Design) return <Design {...props} />;
  ```
- **Each design file:** `presets/restaurant/designs/<Name>.tsx`, default-exports
  a component taking `PresetProps` ({ site, page, basePath, multiPage }). For now
  designs render a single page (ignore multiPage) unless we add sub-pages.
- **Shared helpers:** import from `../../shared` — `groupCatalog`,
  `siteRootStyle`, `tokensFor`, `cx`.

### Preview while building
Sample route accepts `?design=<key>`:
```
http://localhost:3000/samples/<foodBuildKey>?design=<key>
e.g. /samples/steakhouse?design=ember
```
Wired in `app/samples/[key]/[[...path]]/page.tsx` (reads `design` query →
`site.content.design`). Other overrides available there: `?style=`, `?img=`,
`?video=`, `?name=`.

### Going live (after approval)
Assign the design as the default for fitting build keys (so it shows in the
samples gallery and onboarding) instead of needing the `?design=` param.

---

## Build routine (per design)

1. **Study the reference** — WebFetch the URL for structure; if it 403s, work
   from screenshots / known style. Note: hero type, nav, section order, footer,
   palette, type.
2. **Build the component** in `presets/<archetype>/designs/<Name>.tsx` — faithful
   structure, single-venue, baked palette, `data-edit` + `data-edit-image`,
   real data, mobile-responsive, client component for any interactivity.
3. **Register** it in the archetype's `designs/index.tsx`.
4. **Typecheck + build:** `npx tsc --noEmit` (ignore stale `.next/types`),
   `npm run build`.
5. **Preview:** open `/samples/<key>?design=<key>` (dev server on :3000).
6. **Review loop (IMPORTANT):** I can't see my own rendered output here — the
   user screenshots the page and points out what's off; I fix; repeat until it
   matches. Always ask for **top (hero + intro) AND bottom (footer)** shots.
7. **Approve → push.** One design at a time. Don't push until the user OKs it.
8. After the sector's originals are approved, build the **2 variants each**.

---

## Reference queue

### Food, drink & restaurants (in progress)
Originals (6), then 12 variants → 18 total.

Our own design names (never ship the brand name): Gaucho→**Ember**,
Sticks'n'Sushi→**Drift**, The Ivy→**Laurel**, The Duck & Rice→**Lantern**,
Kobe→**Marble**, Bill's→**Daybreak**. All 6 are registered in
`presets/restaurant/designs/index.tsx` and featured on the **/samples "Popular
designs"** tab (`app/samples/page.tsx` → `POPULAR_DESIGNS`, each previewed under
a fitting build key for a real hero photo).

| # | Reference | Our name | Key | Build key (preview) | Status |
|---|-----------|----------|-----|--------------------|--------|
| 1 | Gaucho — `gauchorestaurants.com` (dark/gold, booking-first, navy info band, rope footer) | Ember | `ember` | `steakhouse` | built, in review |
| 2 | Sticks'n'Sushi — `sticksnsushi.com` (light, photo-led, alternating promo blocks) | Drift | `drift` | `sushi` | built, in review |
| 3 | The Ivy — `ivycollection.com` (elegant serif, persistent booking widget, seasonal cards) | Laurel | `laurel` | `fine_dining` | built, in review |
| 4 | The Duck & Rice — `theduckandrice.com` (dark, moody, modern-Asian gastropub) | Lantern | `lantern` | `bar` | built, in review |
| 5 | Kobe — `kobe-restaurant.co.uk` (steakhouse & lounge, warm dark) | Marble | `marble` | `bbq` | built, in review |
| 6 | Bill's — `bills-website.co.uk` (bright, all-day, "What's On" grid) | Daybreak | `daybreak` | `brunch_cafe` | built, in review |

Next for this sector: after review/approval, build the **2 variants per original**
(18 total), then move to Hair & beauty.

### Remaining sectors (ask the user for ~6 reference links each, in order)
1. Hair & beauty
2. Health & wellness
3. Fitness
4. Contractors & home
5. Professional services
6. Retail & shops
7. Pets
8. Events & creative
9. Education

When food is done, ask for the **Hair & beauty** links and repeat the routine.

---

## Notes / gotchas learned

- **I'm building blind** — no connected browser/preview for arbitrary URLs, so
  the screenshot-and-direct loop with the user is how we verify. Lean on it.
- **Dev server**: Next 16 sometimes daemonizes `npm run dev` (foreground task
  shows "stopped" but it keeps serving). If a change doesn't show, it's usually
  stale Turbopack cache — `rm -rf .next` and restart `npm run dev`.
- **`.next/types/validator.ts` tsc errors** are stale build artifacts, not real
  errors — filter them out when typechecking.
- **Don't reuse reference media or logos** (e.g. Gaucho's rope crest) — those are
  brand assets; approximate with CSS (e.g. a gold rounded border for a "rope"
  frame) and swap in the client's own.
- **Reference sites are chains** — strip per-location directories; keep the
  visual language + the sections that fit one venue.
