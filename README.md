# RealmTheResin – custom Supabase + UPI flow

This build includes:
- Google login before the store is shown
- First-login delivery profile
- Country selection, calling code, India state list, and optional India PIN lookup
- Home / Products / Orders / Cart hamburger menu
- Exact-amount UPI QR to `abbaswafa@fam`
- Customer submits UTR after payment
- Admin manually verifies payment before order becomes confirmed
- GitHub-only admin login + Supabase `admin` role check
- Admin order status, delivery date, price, discount, and active-product editing

## 1. Run the database SQL
Open Supabase → SQL Editor → New query.
Paste the full contents of `supabase/schema.sql` and press Run.

## 2. Configure Google login
Supabase → Authentication → Providers → Google → enable it and add your Google OAuth Client ID/Secret.
Set your Site URL / Redirect URL to your live website URL.

## 3. Configure GitHub login for admin
Supabase → Authentication → Providers → GitHub → enable it and add the GitHub OAuth app credentials.
Use the Supabase callback URL shown on the GitHub provider page as the OAuth app callback URL.

Then visit `/admin.html`, press Continue with GitHub, and sign in with the GitHub account you want to use for admin.
If the page says the account is not authorized, copy the UUID shown there.
In Supabase SQL Editor run:

```sql
update public.profiles
set role = 'admin'
where id = 'PASTE_YOUR_GITHUB_USER_UUID_HERE';
```

Refresh `admin.html`. Only a GitHub-authenticated account with role `admin` passes both the page check and database RLS policies.

## 4. Payment flow
The checkout generates an exact-amount UPI QR for the configured UPI ID. The customer submits the transaction reference after payment. The order becomes `pending_verification`. In the admin panel, verify the payment in your UPI app before pressing Approve payment.

Important: the QR does not automatically verify payment. Approval remains manual by design.

## 5. Deploy
Replace the files in the existing Git repository, commit, push to `main`, then wait for Cloudflare to redeploy.
