window.APP_CONFIG = {
  SUPABASE_URL: "https://ocfwevjhwatvcmargjyt.supabase.co",
  SUPABASE_PUBLISHABLE_KEY: "sb_publishable__erJ6kqvD9oCvnwMYNMlSg_jU_bOT-y",
  UPI_ID: "abbaswafa@fam",
  STORE_NAME: "RealmTheResin"
};

(function () {
  const valid = window.supabase &&
    window.APP_CONFIG.SUPABASE_URL &&
    window.APP_CONFIG.SUPABASE_PUBLISHABLE_KEY &&
    !window.APP_CONFIG.SUPABASE_URL.includes("YOUR_") &&
    !window.APP_CONFIG.SUPABASE_PUBLISHABLE_KEY.includes("YOUR_");

  window.supabaseClient = valid
    ? window.supabase.createClient(
        window.APP_CONFIG.SUPABASE_URL,
        window.APP_CONFIG.SUPABASE_PUBLISHABLE_KEY
      )
    : null;
})();
