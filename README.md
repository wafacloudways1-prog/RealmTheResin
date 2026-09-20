# RealmTheResin FULL
Includes A-Z resin images, Google login, customer orders, admin order management,
Supabase database/RLS and Razorpay server-side order creation + signature verification.

IMPORTANT: replace values in config.js with your Supabase URL/publishable key and Razorpay public key.
Put Razorpay secret and Supabase secret key ONLY in Supabase Edge Function secrets.

Deployment:
1. Create Supabase project.
2. Run supabase/schema.sql in SQL Editor.
3. Enable Google provider and configure OAuth redirect URLs.
4. Set Edge Function secrets:
   RAZORPAY_KEY_ID
   RAZORPAY_KEY_SECRET
   SUPABASE_SECRET_KEY
5. Deploy the three Edge Functions.
6. Put your Supabase URL/publishable key/Razorpay public key in config.js.
7. First Google-login yourself, then run the admin SQL line in schema.sql with your email.
8. Upload this folder to GitHub and deploy it on Cloudflare Pages. Build command: exit 0. Output directory: /.
