const letters="ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
let cart=JSON.parse(localStorage.getItem("realm_cart")||"[]");
const products=letters.map(L=>({id:L,name:"Resin Letter "+L,price:149,image:"images/"+L+".jpg",active:true}));

function render(){document.getElementById("products").innerHTML=products.map(p=>`<article class="product">
<img src="${p.image}" alt="${p.name}"><h3>${p.name}</h3><b>₹${p.price}</b>
<button onclick="add('${p.id}')">Add to Cart</button></article>`).join("");update()}
function add(id){let p=products.find(x=>x.id===id),e=cart.find(x=>x.id===id);e?e.qty++:cart.push({...p,qty:1});save()}
function removeItem(id){cart=cart.filter(x=>x.id!==id);save()}
function save(){localStorage.setItem("realm_cart",JSON.stringify(cart));update()}
function update(){document.getElementById("cartCount").textContent=cart.reduce((s,x)=>s+x.qty,0);
document.getElementById("cartItems").innerHTML=cart.length?cart.map(x=>`<div class="row"><img src="${x.image}"><span>${x.name}<br>₹${x.price} × ${x.qty}</span><button onclick="removeItem('${x.id}')">×</button></div>`).join(""):"Cart is empty.";
document.getElementById("total").textContent=cart.reduce((s,x)=>s+x.price*x.qty,0)}
function openCart(){document.getElementById("modal").style.display="flex";update()} function closeCart(){document.getElementById("modal").style.display="none"}
async function login(){const {error}=await supabase.auth.signInWithOAuth({provider:"google",options:{redirectTo:location.origin+"/index.html"}});if(error)alert(error.message)}
async function checkout(){if(!cart.length)return alert("Cart is empty.");const {data:{session}}=await supabase.auth.getSession();if(!session)return login();
localStorage.setItem("checkout_cart",JSON.stringify(cart));location.href="checkout.html"}
const sb=window.supabase.createClient(APP_CONFIG.SUPABASE_URL,APP_CONFIG.SUPABASE_PUBLISHABLE_KEY);
window.supabase=sb; render();