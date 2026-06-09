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
      button using `content.map_url`.
11. **Render from data so tenant edits show.** Tenants edit AND add/remove rows
    in the dashboard (Content & menu): hours, socials, ordering links, menu items,
    gallery, team. There is **no raw-JSON box** on the tenant side. So map over the
    arrays (`content.hours`, `content.socials`, `content.ordering_links`,
    `groupCatalog(catalog)`, `gallery`) — never hardcode them — and they update live.
12. **MULTI-PAGE — links open real pages, never scroll.** The nav must navigate to
    real routes, NOT scroll to anchors on one long page. Switch on `props.page`
    (`home | menu | about | gallery | reservations | contact`) and render each as
    its own page; build every nav/footer link with `pageHref(basePath, page)` from
    `@/lib/site-pages` (so it works on samples and live tenant domains). See
    `Ember.tsx` for the exact shape: a shared `shell()` (sticky header + footer)
    wraps each page's body.
    - **home** = hero + short teasers (intro, a few menu highlights linking to
      `pageHref(basePath,"menu")`, a quick info band). NOT the full menu, booking
      form, or contact form.
    - **menu** = the full menu. **reservations** = the booking widget (its own
      page). **contact** = address + map/directions + the contact form.
      **about** / **gallery** when content exists.
    - The sticky header is transparent only over the home hero; pass `solid` (or
      equivalent) so it's solid on sub-pages, and give sub-pages a top banner / top
      padding so content clears the fixed header. The crest links home.
    - Register the design as the default for its build key in `sample-site.ts`
      `BUILD_DESIGN` (done centrally) so sub-page links keep the design with no
      `?design=` query.
13. **Make each design DISTINCT — never clone closely.** The whole point is variety.
    Each design must have a genuinely different **menu layout** (e.g. dotted-leader
    list vs photo cards vs tabbed sections vs centered single-column), **booking
    layout**, and **contact-page layout**. Match the reference's structure; never
    copy another design section-for-section. Ember is a *pattern* reference (how to
    wire pages/header/footer/data), NOT a layout to reproduce. If two designs look
    interchangeable, that is a bug.
    - Do not lean on the shared generic blocks as-is when they make every design
      look the same. The booking widget should be styled to the design (its own
      `<Name>Booking.tsx`). For the contact form, if you reuse
      `SiteContactForms`, wrap/skin it so it fits the design rather than shipping
      the identical white card everywhere; better, give visually distinct designs
      their own form styling.
    - Vary copy, headings and section names too — avoid the same stock labels
      ("Send a message", "What's cooking") across designs.
14. **No em dashes or en dashes — anywhere a user can see.** This includes data
    (hours like "Mon to Fri", "12:00 to 22:00"), blurbs, success/error strings, and
    button labels. Use commas, periods, "to", or a question mark. (Code comments may
    use them.) The user treats "—"/"–" as an AI tell.
15. **Never let the sticky header cut off content.** Every sub-page must start below
    the fixed header — give it a top banner or `pt-32 sm:pt-36`. Test the top of
    Menu, Reservations and Contact: the first heading/field must be fully visible.
16. **Every control must be legible.** No same-colour text on same-colour background
    (e.g. a dark-filled button with dark text). Filled buttons get contrasting text;
    outline buttons get a visible border. Check booking fields and ordering-link
    buttons on the design's actual background colour.
17. **Copy the IN-DEPTH STRUCTURE, not just the look.** Recreate every meaningful
    section the reference has and in the same order/density — do NOT flatten a rich
    page into a few generic blocks. In particular:
    - **Sliders / carousels** — if the reference has a hero slider, logo strip,
      review/testimonial carousel, or a "before & after" slider, build it as a small
      `"use client"` component (state + prev/next, swipe-friendly), fed by our data
      (gallery, a testimonials array, menu items). Don't replace a carousel with a
      static grid.
    - **Video hero** — if the reference's hero is a looping video, render
      `content.hero_video_url` as a muted autoplay loop with the image
      (`content.hero_image_url`) as poster/fallback. Support both; never hardcode a
      file. (See how `Hero` in `presets/shared.tsx` handles `video`.)
    - **Content blocks** — reproduce the reference's block types: stats/numbers
      bands, testimonials/reviews, FAQ accordions, "before & after", treatment/price
      lists, team/stylist grids, trust badges, press logos, intro story, CTA bands.
      Map them to our data (`catalog`, `team`, `gallery`, `content.*`) with graceful
      fallbacks; keep the same section rhythm as the screenshot.
    - Match the reference's COPY tone and headings (rewritten in our own words, no
      brand names), not placeholder lorem.

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

1. **Study the reference — from the real screenshots.** Full-page captures live in
   `public/samples/` (food) and `public/samples/<sector>/` (e.g. `hair&beauty/`).
   They are tall PNGs, so slice them and READ each band IN ORDER before coding:
   ```bash
   # crop into ~2100px bands, scaled to 1400 wide, into /tmp/slices/<name>/
   ffmpeg -loglevel error -y -i SHOT.png -vf "crop=W:2100:0:Y,scale=1400:-1" out.png
   ```
   Follow the STRUCTURE closely (hero type, nav, section order, layouts, palette,
   type, footer). Swap ALL media/text for the tenant's; the screenshot is layout
   reference only, never its photos/logo/brand copy. Adapt chains to a single venue.
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

Plus 5 newer screenshot-faithful designs (kept alongside the first 6 → 11 total):
Sticks'n'Sushi→**Tide** (`tide`, build `japanese`), The Ivy→**Botanica** (`botanica`,
build `brasserie`), The Duck & Rice→**Lacquer** (`lacquer`, build `chinese`), Kobe→
**Cinder** (`cinder`, build `cocktail_bar`), Bill's→**Meadow** (`meadow`, build `cafe`).
All 11 are in `RESTAURANT_DESIGNS`, the `BUILD_DESIGN` map and the Popular tab.

### A NEW SECTOR / archetype (how Hair & beauty plugs in)
Each archetype gets its OWN designs registry + preset hook (mirrors restaurants):
- **Hair & beauty = the `bookings` archetype → `presets/salon/SalonSite.tsx`.**
- Registry: `presets/salon/designs/index.tsx` → `SALON_DESIGNS` + `getSalonDesign(key)`.
- Hook (already added) at the top of `SalonSite.tsx`:
  `const Design = getSalonDesign(props.site.content.design); if (Design) return <Design {...props} />;`
- Salon data model differs from restaurants: catalog = **treatments / services**
  (use `groupCatalog`), `site.team` = **stylists** (name/role/photo, edited in the
  dashboard, no inline data-edit key), booking link = `content.booking_url`. Pages:
  home / **services** (not "menu") / about / gallery / reservations / contact.
- Register new keys centrally in `SALON_DESIGNS` and add them to `BUILD_DESIGN`
  (sample-site) for salon build keys (e.g. `hair_salon`, `barber`, `nail_salon`,
  `spa`, `beauty_salon`) + the Popular tab.
- **GOTCHA — bespoke preset routing:** `getPresetComponent` (presets/index.tsx)
  routes some keys to bespoke presets, NOT the archetype: `BEAUTY` keys
  (makeup_artist, lash_brow, nail_salon, beauty_salon, aesthetics_clinic,
  cosmetic_clinic, tanning, waxing, photographer, videographer) → `BeautySite`;
  `FITNESS` keys (gym, yoga_studio, crossfit, …) → `FitnessSite`. EVERY preset a
  key can route to needs the design hook at the top, or the `BUILD_DESIGN`
  mapping is silently ignored (the bug that left makeup_artist on the generic
  "Signature services" layout). BeautySite, FitnessSite and SalonSite all call
  `getSalonDesign` now; when adding a new sector, verify the hook exists in
  whichever preset its keys actually hit.

### Hair & beauty (in progress) — screenshots in `public/samples/hair&beauty/`
| # | Reference | Our name | Key | Status |
|---|-----------|----------|-----|--------|
| 1 | Blue Tit London (creative hair salon) | Indigo | `indigo` | building |
| 2 | Salt Salon (minimal modern salon) | Halo | `halo` | building |
| 3 | VA Salon (bold salon) | Verve | `verve` | building |
| 4 | Salon House (refined salon) | Atelier | `atelier` | building |
| 5 | New Cross Hair (barber / hair) | Fade | `fade` | building |
| 6 | Beauty Club London (beauty / aesthetics clinic) | Lumiere | `lumiere` | building |

Extras held for later/variants: `regissalons.co.uk`, `booksy` (booking platform).

### Remaining sectors (ask the user for reference links/screenshots, in order)
1. ~~Hair & beauty~~ (in progress)
2. Health & wellness
3. Fitness
4. Contractors & home
5. Professional services
6. Retail & shops
7. Pets
8. Events & creative
9. Education

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
