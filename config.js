window.APP_CONFIG = {
  SUPABASE_URL: "https://ocfwevjhwatvcmargjyt.supabase.co",
  SUPABASE_PUBLISHABLE_KEY: "sb_publishable__erJ6kqvD9oCvnwMYNMlSg_jU_bOT-y",
  RAZORPAY_KEY_ID: "YOUR_RAZORPAY_KEY_ID"
};
// Optional client: only create it when real Supabase values have been supplied.
(function () {
  const valid =
    window.supabase &&
    window.APP_CONFIG.SUPABASE_URL &&
    window.APP_CONFIG.SUPABASE_PUBLISHABLE_KEY &&
    !window.APP_CONFIG.SUPABASE_URL.includes("YOUR_") &&
    !window.APP_CONFIG.SUPABASE_PUBLISHABLE_KEY.includes("YOUR_");

  if (valid) {
    window.supabaseClient = window.supabase.createClient(
      window.APP_CONFIG.SUPABASE_URL,
      window.APP_CONFIG.SUPABASE_PUBLISHABLE_KEY
    );
  } else {
    window.supabaseClient = null;
  }
})();
