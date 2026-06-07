-- ============================================================================
-- Seed data: one tenant per launch preset.
-- Mirrors lib/mock-data.ts so the DB-backed site looks identical to the
-- local demo. Safe to re-run (deletes the three demo tenants first).
-- ============================================================================

delete from tenants where subdomain in ('nonna', 'swift', 'lumiere');

-- ---------------------------------------------------------------------------
-- 1) RESTAURANT — Nonna's Kitchen
-- ---------------------------------------------------------------------------
insert into tenants (id, business_name, preset, subdomain, published, plan, plan_status, meta_title, meta_description)
values ('11111111-1111-1111-1111-111111111111', 'Nonna''s Kitchen', 'restaurant', 'nonna', true, 'standard', 'active',
        'Nonna''s Kitchen — Italian Restaurant', 'Family-run Italian kitchen. Book a table or order direct.');

insert into themes (tenant_id, logo_url, primary_color, accent_color, font)
values ('11111111-1111-1111-1111-111111111111', null, '#7a2e2e', '#e3b04b', 'serif');

insert into site_content (tenant_id, content) values
('11111111-1111-1111-1111-111111111111', '{
  "tagline": "Honest Italian cooking, the way Nonna made it",
  "cuisine_type": "Italian",
  "about": "Three generations of family recipes, fresh pasta made daily, and a wine list that punches above its postcode.",
  "address": "14 Mercer Street, Manchester M1 2QP",
  "phone": "0161 555 0142",
  "hours": [{"day":"Tue–Thu","open":"12:00–22:00"},{"day":"Fri–Sat","open":"12:00–23:30"},{"day":"Sun","open":"12:00–21:00"},{"day":"Mon","open":"Closed"}],
  "reservation_url": "https://www.opentable.co.uk",
  "ordering_links": [
    {"label":"Order direct (no fees)","url":"#","commission_free":true},
    {"label":"Deliveroo","url":"#"},
    {"label":"Just Eat","url":"#"}
  ],
  "socials": [{"label":"Instagram","url":"#"}]
}'::jsonb);

insert into catalog_items (tenant_id, section, category, name, description, price, tags, sort_order) values
('11111111-1111-1111-1111-111111111111', 'Dinner', 'Starters', 'Burrata & Heritage Tomato', 'Puglian burrata, basil oil, sourdough', '£9.50', '{vegetarian}', 1),
('11111111-1111-1111-1111-111111111111', 'Dinner', 'Starters', 'Calamari Fritti', 'Lightly fried squid, lemon aioli', '£8.00', '{}', 2),
('11111111-1111-1111-1111-111111111111', 'Dinner', 'Pasta', 'Tagliatelle al Ragù', 'Slow-cooked beef & pork ragù, fresh tagliatelle', '£15.00', '{}', 3),
('11111111-1111-1111-1111-111111111111', 'Dinner', 'Pasta', 'Cacio e Pepe', 'Pecorino, black pepper, spaghetti', '£13.00', '{vegetarian}', 4),
('11111111-1111-1111-1111-111111111111', 'Dinner', 'Mains', 'Branzino', 'Whole sea bass, salsa verde, roast lemon', '£21.00', '{gluten-free}', 5),
('11111111-1111-1111-1111-111111111111', 'Dinner', 'Dessert', 'Tiramisù', 'The classic, made to order', '£7.50', '{vegetarian}', 6);

insert into gallery (tenant_id, image_url, caption, sort_order) values
('11111111-1111-1111-1111-111111111111', 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=900', 'Fresh pasta', 1),
('11111111-1111-1111-1111-111111111111', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=900', 'The dining room', 2);

-- ---------------------------------------------------------------------------
-- 2) TRADES — Swift Plumbing & Heating
-- ---------------------------------------------------------------------------
insert into tenants (id, business_name, preset, subdomain, published, plan, plan_status, meta_title, meta_description)
values ('22222222-2222-2222-2222-222222222222', 'Swift Plumbing & Heating', 'trades', 'swift', true, 'basic', 'active',
        'Swift Plumbing & Heating — Leeds', 'Gas Safe registered plumbers. Fast callouts, free quotes.');

insert into themes (tenant_id, logo_url, primary_color, accent_color, font)
values ('22222222-2222-2222-2222-222222222222', null, '#0f3d6b', '#f2a900', 'sans-serif');

insert into site_content (tenant_id, content) values
('22222222-2222-2222-2222-222222222222', '{
  "tagline": "Leeds'' trusted plumbers — fast, fair, Gas Safe",
  "about": "Family-run since 2009. No call-out fee, upfront pricing, and we tidy up after ourselves.",
  "phone": "0113 555 0198",
  "emergency_phone": "0113 555 0199",
  "address": "Leeds & surrounding areas",
  "service_areas": ["Leeds","Wakefield","Bradford","Harrogate","Pudsey"],
  "accreditations": ["Gas Safe Registered","CIPHE Member","Which? Trusted Trader"],
  "hours": [{"day":"Mon–Fri","open":"07:00–18:00"},{"day":"Sat","open":"08:00–14:00"},{"day":"24/7","open":"Emergency callouts"}],
  "cta_label": "Get a free quote",
  "cta_url": "#contact"
}'::jsonb);

insert into catalog_items (tenant_id, section, name, description, price, sort_order) values
('22222222-2222-2222-2222-222222222222', 'Services', 'Boiler Repair & Servicing', 'Annual servicing and same-day repairs on all major brands', 'from £90', 1),
('22222222-2222-2222-2222-222222222222', 'Services', 'Boiler Installation', 'Supply & fit with up to 10-year warranty', 'Free quote', 2),
('22222222-2222-2222-2222-222222222222', 'Services', 'Leaks & Burst Pipes', 'Rapid response, leak detection, repairs', 'from £75', 3),
('22222222-2222-2222-2222-222222222222', 'Services', 'Bathroom Installation', 'Full bathroom design and fit', 'Free quote', 4),
('22222222-2222-2222-2222-222222222222', 'Services', 'Power Flushing', 'Restore heating efficiency across your system', 'from £350', 5);

insert into gallery (tenant_id, image_url, caption, sort_order) values
('22222222-2222-2222-2222-222222222222', 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=900', 'New boiler install', 1),
('22222222-2222-2222-2222-222222222222', 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=900', 'Bathroom fit', 2);

-- ---------------------------------------------------------------------------
-- 3) SALON — Lumière Hair & Beauty
-- ---------------------------------------------------------------------------
insert into tenants (id, business_name, preset, subdomain, published, plan, plan_status, meta_title, meta_description)
values ('33333333-3333-3333-3333-333333333333', 'Lumière Hair & Beauty', 'salon', 'lumiere', true, 'premium', 'active',
        'Lumière Hair & Beauty — Bristol', 'Award-winning salon. Book online in seconds.');

insert into themes (tenant_id, logo_url, primary_color, accent_color, font)
values ('33333333-3333-3333-3333-333333333333', null, '#2d2a32', '#c98b9e', 'serif');

insert into site_content (tenant_id, content) values
('33333333-3333-3333-3333-333333333333', '{
  "tagline": "Where Bristol comes to glow",
  "about": "A calm, modern salon with a team obsessed by great hair and happy clients.",
  "address": "8 Park Street, Bristol BS1 5HX",
  "phone": "0117 555 0123",
  "hours": [{"day":"Tue–Fri","open":"09:00–19:00"},{"day":"Sat","open":"09:00–17:00"},{"day":"Sun–Mon","open":"Closed"}],
  "booking_url": "https://www.fresha.com",
  "socials": [{"label":"Instagram","url":"#"},{"label":"TikTok","url":"#"}],
  "cta_label": "Book online",
  "cta_url": "https://www.fresha.com"
}'::jsonb);

insert into catalog_items (tenant_id, section, category, name, description, price, sort_order) values
('33333333-3333-3333-3333-333333333333', 'Hair', 'Cut & Finish', 'Cut & Blow Dry', 'Consultation, cut and style', 'from £45', 1),
('33333333-3333-3333-3333-333333333333', 'Hair', 'Colour', 'Full Head Highlights', 'Foils, toner and finish', 'from £120', 2),
('33333333-3333-3333-3333-333333333333', 'Hair', 'Colour', 'Balayage', 'Hand-painted, lived-in colour', 'from £140', 3),
('33333333-3333-3333-3333-333333333333', 'Beauty', 'Brows & Lashes', 'Lash Lift & Tint', 'Lifted, tinted lashes lasting weeks', '£45', 4),
('33333333-3333-3333-3333-333333333333', 'Beauty', 'Skin', 'Express Facial', '30-minute glow-boosting facial', '£40', 5);

insert into team (tenant_id, name, role, credentials, sort_order) values
('33333333-3333-3333-3333-333333333333', 'Sofia Reyes', 'Founder & Senior Stylist', 'L''Oréal Colour Specialist', 1),
('33333333-3333-3333-3333-333333333333', 'Aisha Khan', 'Colour Director', 'Balayage Expert', 2),
('33333333-3333-3333-3333-333333333333', 'Mia Thompson', 'Beauty Therapist', 'CIDESCO Diploma', 3);

insert into gallery (tenant_id, image_url, caption, sort_order) values
('33333333-3333-3333-3333-333333333333', 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=900', 'The salon', 1),
('33333333-3333-3333-3333-333333333333', 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=900', 'Balayage result', 2);
