# RealmTheResin — Fixed Preview Build

This version fixes the main preview problem:

- A–Z products render without Supabase credentials.
- A–Z images are included locally in `images/`.
- Add to Cart works with localStorage.
- Cart count and totals work.
- Google Login and checkout show a clear setup message until Supabase is configured.
- Supabase SQL and Edge Functions are still included for the later production setup.
- Razorpay remains for the later payment-gateway setup.

## Cloudflare Pages

For a static HTML site:
- Production branch: `main`
- Build command: `exit 0`
- Build output directory: `/`

Cloudflare Pages serves the top-level `index.html` and the `images/` folder.

## Next production steps

1. Create Supabase project.
2. Run `supabase/schema.sql`.
3. Put the Supabase project URL and publishable key in `config.js`.
4. Configure Google OAuth in Supabase.
5. Deploy the Supabase Edge Functions.
6. Configure Razorpay secrets and payment verification.
