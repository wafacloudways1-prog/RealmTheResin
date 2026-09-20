const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
let cart = JSON.parse(localStorage.getItem("realm_cart") || "[]");

const products = letters.map(L => ({
  id: L,
  name: "Resin Letter " + L,
  price: 149,
  image: "images/" + L + ".jpg",
  active: true
}));

function render() {
  const productsEl = document.getElementById("products");
  if (!productsEl) return;

  productsEl.innerHTML = products.map(p => `
    <article class="product">
      <img src="${p.image}" alt="${p.name}" loading="lazy"
           onerror="this.style.display='none'; this.nextElementSibling.insertAdjacentHTML('beforebegin','<div class=\\'image-error\\'>Image unavailable</div>')">
      <h3>${p.name}</h3>
      <b>₹${p.price}</b>
      <button type="button" onclick="add('${p.id}')">Add to Cart</button>
    </article>
  `).join("");

  update();
}

function add(id) {
  const p = products.find(x => x.id === id);
  if (!p) return;

  const existing = cart.find(x => x.id === id);
  if (existing) existing.qty++;
  else cart.push({...p, qty: 1});

  save();
  openCart();
}

function removeItem(id) {
  cart = cart.filter(x => x.id !== id);
  save();
}

function save() {
  localStorage.setItem("realm_cart", JSON.stringify(cart));
  update();
}

function update() {
  const count = document.getElementById("cartCount");
  const items = document.getElementById("cartItems");
  const total = document.getElementById("total");

  if (count) count.textContent = cart.reduce((s, x) => s + x.qty, 0);

  if (items) {
    items.innerHTML = cart.length
      ? cart.map(x => `
          <div class="row">
            <img src="${x.image}" alt="${x.name}">
            <span>${x.name}<br>₹${x.price} × ${x.qty}</span>
            <button type="button" onclick="removeItem('${x.id}')">×</button>
          </div>
        `).join("")
      : "Cart is empty.";
  }

  if (total) {
    total.textContent = cart.reduce((s, x) => s + x.price * x.qty, 0);
  }
}

function openCart() {
  const modal = document.getElementById("modal");
  if (modal) modal.style.display = "flex";
  update();
}

function closeCart() {
  const modal = document.getElementById("modal");
  if (modal) modal.style.display = "none";
}

function supabaseReady() {
  return !!(
    window.supabaseClient &&
    window.APP_CONFIG &&
    APP_CONFIG.SUPABASE_URL &&
    APP_CONFIG.SUPABASE_PUBLISHABLE_KEY &&
    !APP_CONFIG.SUPABASE_URL.includes("YOUR_") &&
    !APP_CONFIG.SUPABASE_PUBLISHABLE_KEY.includes("YOUR_")
  );
}

async function login() {
  if (!supabaseReady()) {
    alert("Google Login is not configured yet. Products and cart work now. We will connect Supabase/Google Login next.");
    return;
  }

  const { error } = await window.supabaseClient.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo: location.origin + "/index.html" }
  });

  if (error) alert(error.message);
}

async function checkout() {
  if (!cart.length) {
    alert("Cart is empty.");
    return;
  }

  if (!supabaseReady()) {
    alert("Cart is working. Google Login + checkout will be connected after Supabase setup.");
    return;
  }

  const { data: { session } } = await window.supabaseClient.auth.getSession();
  if (!session) return login();

  localStorage.setItem("checkout_cart", JSON.stringify(cart));
  location.href = "checkout.html";
}

window.add = add;
window.removeItem = removeItem;
window.openCart = openCart;
window.closeCart = closeCart;
window.login = login;
window.checkout = checkout;

document.addEventListener("DOMContentLoaded", render);
