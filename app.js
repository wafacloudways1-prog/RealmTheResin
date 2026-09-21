const COUNTRY_LIST = [["AF", "Afghanistan"], ["AL", "Albania"], ["DZ", "Algeria"], ["AS", "American Samoa"], ["AD", "Andorra"], ["AO", "Angola"], ["AI", "Anguilla"], ["AQ", "Antarctica"], ["AG", "Antigua and Barbuda"], ["AR", "Argentina"], ["AM", "Armenia"], ["AW", "Aruba"], ["AU", "Australia"], ["AT", "Austria"], ["AZ", "Azerbaijan"], ["BS", "Bahamas"], ["BH", "Bahrain"], ["BD", "Bangladesh"], ["BB", "Barbados"], ["BY", "Belarus"], ["BE", "Belgium"], ["BZ", "Belize"], ["BJ", "Benin"], ["BM", "Bermuda"], ["BT", "Bhutan"], ["BO", "Bolivia, Plurinational State of"], ["BQ", "Bonaire, Sint Eustatius and Saba"], ["BA", "Bosnia and Herzegovina"], ["BW", "Botswana"], ["BV", "Bouvet Island"], ["BR", "Brazil"], ["IO", "British Indian Ocean Territory"], ["BN", "Brunei Darussalam"], ["BG", "Bulgaria"], ["BF", "Burkina Faso"], ["BI", "Burundi"], ["CV", "Cabo Verde"], ["KH", "Cambodia"], ["CM", "Cameroon"], ["CA", "Canada"], ["KY", "Cayman Islands"], ["CF", "Central African Republic"], ["TD", "Chad"], ["CL", "Chile"], ["CN", "China"], ["CX", "Christmas Island"], ["CC", "Cocos (Keeling) Islands"], ["CO", "Colombia"], ["KM", "Comoros"], ["CG", "Congo"], ["CD", "Congo, The Democratic Republic of the"], ["CK", "Cook Islands"], ["CR", "Costa Rica"], ["HR", "Croatia"], ["CU", "Cuba"], ["CW", "Curaçao"], ["CY", "Cyprus"], ["CZ", "Czechia"], ["CI", "Côte d'Ivoire"], ["DK", "Denmark"], ["DJ", "Djibouti"], ["DM", "Dominica"], ["DO", "Dominican Republic"], ["EC", "Ecuador"], ["EG", "Egypt"], ["SV", "El Salvador"], ["GQ", "Equatorial Guinea"], ["ER", "Eritrea"], ["EE", "Estonia"], ["SZ", "Eswatini"], ["ET", "Ethiopia"], ["FK", "Falkland Islands (Malvinas)"], ["FO", "Faroe Islands"], ["FJ", "Fiji"], ["FI", "Finland"], ["FR", "France"], ["GF", "French Guiana"], ["PF", "French Polynesia"], ["TF", "French Southern Territories"], ["GA", "Gabon"], ["GM", "Gambia"], ["GE", "Georgia"], ["DE", "Germany"], ["GH", "Ghana"], ["GI", "Gibraltar"], ["GR", "Greece"], ["GL", "Greenland"], ["GD", "Grenada"], ["GP", "Guadeloupe"], ["GU", "Guam"], ["GT", "Guatemala"], ["GG", "Guernsey"], ["GN", "Guinea"], ["GW", "Guinea-Bissau"], ["GY", "Guyana"], ["HT", "Haiti"], ["HM", "Heard Island and McDonald Islands"], ["VA", "Holy See (Vatican City State)"], ["HN", "Honduras"], ["HK", "Hong Kong"], ["HU", "Hungary"], ["IS", "Iceland"], ["IN", "India"], ["ID", "Indonesia"], ["IR", "Iran, Islamic Republic of"], ["IQ", "Iraq"], ["IE", "Ireland"], ["IM", "Isle of Man"], ["IL", "Israel"], ["IT", "Italy"], ["JM", "Jamaica"], ["JP", "Japan"], ["JE", "Jersey"], ["JO", "Jordan"], ["KZ", "Kazakhstan"], ["KE", "Kenya"], ["KI", "Kiribati"], ["KP", "Korea, Democratic People's Republic of"], ["KR", "Korea, Republic of"], ["KW", "Kuwait"], ["KG", "Kyrgyzstan"], ["LA", "Lao People's Democratic Republic"], ["LV", "Latvia"], ["LB", "Lebanon"], ["LS", "Lesotho"], ["LR", "Liberia"], ["LY", "Libya"], ["LI", "Liechtenstein"], ["LT", "Lithuania"], ["LU", "Luxembourg"], ["MO", "Macao"], ["MG", "Madagascar"], ["MW", "Malawi"], ["MY", "Malaysia"], ["MV", "Maldives"], ["ML", "Mali"], ["MT", "Malta"], ["MH", "Marshall Islands"], ["MQ", "Martinique"], ["MR", "Mauritania"], ["MU", "Mauritius"], ["YT", "Mayotte"], ["MX", "Mexico"], ["FM", "Micronesia, Federated States of"], ["MD", "Moldova, Republic of"], ["MC", "Monaco"], ["MN", "Mongolia"], ["ME", "Montenegro"], ["MS", "Montserrat"], ["MA", "Morocco"], ["MZ", "Mozambique"], ["MM", "Myanmar"], ["NA", "Namibia"], ["NR", "Nauru"], ["NP", "Nepal"], ["NL", "Netherlands"], ["NC", "New Caledonia"], ["NZ", "New Zealand"], ["NI", "Nicaragua"], ["NE", "Niger"], ["NG", "Nigeria"], ["NU", "Niue"], ["NF", "Norfolk Island"], ["MK", "North Macedonia"], ["MP", "Northern Mariana Islands"], ["NO", "Norway"], ["OM", "Oman"], ["PK", "Pakistan"], ["PW", "Palau"], ["PS", "Palestine, State of"], ["PA", "Panama"], ["PG", "Papua New Guinea"], ["PY", "Paraguay"], ["PE", "Peru"], ["PH", "Philippines"], ["PN", "Pitcairn"], ["PL", "Poland"], ["PT", "Portugal"], ["PR", "Puerto Rico"], ["QA", "Qatar"], ["RO", "Romania"], ["RU", "Russian Federation"], ["RW", "Rwanda"], ["RE", "Réunion"], ["BL", "Saint Barthélemy"], ["SH", "Saint Helena, Ascension and Tristan da Cunha"], ["KN", "Saint Kitts and Nevis"], ["LC", "Saint Lucia"], ["MF", "Saint Martin (French part)"], ["PM", "Saint Pierre and Miquelon"], ["VC", "Saint Vincent and the Grenadines"], ["WS", "Samoa"], ["SM", "San Marino"], ["ST", "Sao Tome and Principe"], ["SA", "Saudi Arabia"], ["SN", "Senegal"], ["RS", "Serbia"], ["SC", "Seychelles"], ["SL", "Sierra Leone"], ["SG", "Singapore"], ["SX", "Sint Maarten (Dutch part)"], ["SK", "Slovakia"], ["SI", "Slovenia"], ["SB", "Solomon Islands"], ["SO", "Somalia"], ["ZA", "South Africa"], ["GS", "South Georgia and the South Sandwich Islands"], ["SS", "South Sudan"], ["ES", "Spain"], ["LK", "Sri Lanka"], ["SD", "Sudan"], ["SR", "Suriname"], ["SJ", "Svalbard and Jan Mayen"], ["SE", "Sweden"], ["CH", "Switzerland"], ["SY", "Syrian Arab Republic"], ["TW", "Taiwan, Province of China"], ["TJ", "Tajikistan"], ["TZ", "Tanzania, United Republic of"], ["TH", "Thailand"], ["TL", "Timor-Leste"], ["TG", "Togo"], ["TK", "Tokelau"], ["TO", "Tonga"], ["TT", "Trinidad and Tobago"], ["TN", "Tunisia"], ["TM", "Turkmenistan"], ["TC", "Turks and Caicos Islands"], ["TV", "Tuvalu"], ["TR", "Türkiye"], ["UG", "Uganda"], ["UA", "Ukraine"], ["AE", "United Arab Emirates"], ["GB", "United Kingdom"], ["US", "United States"], ["UM", "United States Minor Outlying Islands"], ["UY", "Uruguay"], ["UZ", "Uzbekistan"], ["VU", "Vanuatu"], ["VE", "Venezuela, Bolivarian Republic of"], ["VN", "Viet Nam"], ["VG", "Virgin Islands, British"], ["VI", "Virgin Islands, U.S."], ["WF", "Wallis and Futuna"], ["EH", "Western Sahara"], ["YE", "Yemen"], ["ZM", "Zambia"], ["ZW", "Zimbabwe"], ["AX", "Åland Islands"]];
const PHONE_CODES = {
  IN:'+91', US:'+1', CA:'+1', GB:'+44', AE:'+971', AU:'+61', NZ:'+64', SG:'+65', SA:'+966',
  PK:'+92', BD:'+880', NP:'+977', LK:'+94', MY:'+60', ID:'+62', TH:'+66', PH:'+63', JP:'+81', KR:'+82',
  CN:'+86', HK:'+852', DE:'+49', FR:'+33', IT:'+39', ES:'+34', NL:'+31', BE:'+32', CH:'+41', AT:'+43',
  IE:'+353', PT:'+351', SE:'+46', NO:'+47', DK:'+45', FI:'+358', PL:'+48', CZ:'+420', GR:'+30', TR:'+90',
  RU:'+7', ZA:'+27', EG:'+20', NG:'+234', KE:'+254', GH:'+233', BR:'+55', MX:'+52', AR:'+54'
};
const INDIA_STATES = [
  'Andaman and Nicobar Islands','Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chandigarh','Chhattisgarh',
  'Dadra and Nagar Haveli and Daman and Diu','Delhi','Goa','Gujarat','Haryana','Himachal Pradesh','Jammu and Kashmir',
  'Jharkhand','Karnataka','Kerala','Ladakh','Lakshadweep','Madhya Pradesh','Maharashtra','Manipur','Meghalaya',
  'Mizoram','Nagaland','Odisha','Puducherry','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura',
  'Uttar Pradesh','Uttarakhand','West Bengal'
];

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
let cart = JSON.parse(localStorage.getItem('realm_cart') || '[]');
let products = letters.map(L => ({id:L,name:'Resin Letter '+L,price:149,image:'images/'+L+'.jpg',active:true,discount:0}));
let profileRequired = false;

function esc(v){return String(v ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function supabaseReady(){return !!window.supabaseClient;}
function $(id){return document.getElementById(id);}

async function loadProducts(){
  if(!supabaseReady()) return;
  const {data,error}=await supabaseClient.from('products').select('*').eq('active',true).order('id');
  if(!error && data?.length){
    products=data.map(p=>({id:p.id,name:p.name,price:Number(p.price)-Number(p.discount||0),basePrice:Number(p.price),discount:Number(p.discount||0),image:p.image_url||`images/${p.id}.jpg`,active:p.active}));
  }
}

function renderProducts(){
  const e=$('products'); if(!e) return;
  e.innerHTML=products.map(p=>`<article class="product">
    <img src="${esc(p.image)}" alt="${esc(p.name)}" loading="lazy">
    <h3>${esc(p.name)}</h3>
    ${p.discount>0?`<div><span class="old-price">₹${p.basePrice}</span> <b>₹${p.price}</b></div>`:`<b>₹${p.price}</b>`}
    <button type="button" onclick="add('${esc(p.id)}')">Add to Cart</button>
  </article>`).join('');
}

function add(id){const p=products.find(x=>x.id===id);if(!p)return;const x=cart.find(x=>x.id===id);if(x)x.qty++;else cart.push({...p,qty:1});saveCart();openCart();}
function removeItem(id){cart=cart.filter(x=>x.id!==id);saveCart();}
function saveCart(){localStorage.setItem('realm_cart',JSON.stringify(cart));updateCart();}
function updateCart(){
  if($('cartCount')) $('cartCount').textContent=cart.reduce((s,x)=>s+x.qty,0);
  if($('cartItems')) $('cartItems').innerHTML=cart.length?cart.map(x=>`<div class="row"><img src="${esc(x.image)}"><span>${esc(x.name)}<br>₹${x.price} × ${x.qty}</span><button onclick="removeItem('${esc(x.id)}')">×</button></div>`).join(''):'<p class="muted">Your cart is empty.</p>';
  if($('total')) $('total').textContent=cart.reduce((s,x)=>s+x.price*x.qty,0);
}
function openCart(){$('modal').style.display='flex';updateCart();}
function closeCart(){$('modal').style.display='none';}
function toggleMenu(){$('mobileMenu').classList.toggle('show');}
function closeMenu(){$('mobileMenu').classList.remove('show');}

async function login(){
  if(!supabaseReady()) return $('authMessage').textContent='Supabase is not configured yet.';
  const {error}=await supabaseClient.auth.signInWithOAuth({provider:'google',options:{redirectTo:location.origin+'/index.html'}});
  if(error) $('authMessage').textContent=error.message;
}

async function logout(){
  if(supabaseReady()) await supabaseClient.auth.signOut();
  localStorage.removeItem('checkout_cart');
  closeProfile(true);
  showAuthGate();
}

function showAuthGate(){
  $('authGate').classList.remove('hidden');
  $('storeApp').classList.add('hidden');
}
function showStore(){
  $('authGate').classList.add('hidden');
  $('storeApp').classList.remove('hidden');
}

function profileComplete(p){return !!(p && p.full_name && p.phone && p.address && p.city && p.state && p.pin && p.country_code);}

async function refreshAuth(){
  if(!supabaseReady()){showAuthGate();return;}
  const {data:{session}}=await supabaseClient.auth.getSession();
  if(!session){showAuthGate();return;}
  showStore();
  await loadProducts();
  renderProducts(); updateCart();
  const {data:p}=await supabaseClient.from('profiles').select('*').eq('id',session.user.id).maybeSingle();
  if(!profileComplete(p)){profileRequired=true;openProfile(p||{},true);}else{profileRequired=false;}
}

function countryOptions(selected='IN'){
  return COUNTRY_LIST.map(([code,name])=>`<option value="${code}" ${code===selected?'selected':''}>${esc(name)}</option>`).join('');
}
function stateField(p){
  if((p.country_code||'IN')==='IN'){
    return `<label>State / Union Territory<select id="p_state" required>${INDIA_STATES.map(s=>`<option value="${esc(s)}" ${p.state===s?'selected':''}>${esc(s)}</option>`).join('')}</select></label>`;
  }
  return `<label>State / Region<input id="p_state" required value="${esc(p.state||'')}"></label>`;
}
function profileFields(p={}){
  const c=p.country_code||'IN'; const phoneCode=p.phone_country_code||PHONE_CODES[c]||'+91';
  const localPhone=(p.phone||'').replace(phoneCode,'').trim();
  return `
    <label>Full name<input id="p_name" required autocomplete="name" value="${esc(p.full_name||'')}"></label>
    <label>Country<select id="p_country" onchange="countryChanged()">${countryOptions(c)}</select></label>
    <label>Calling code<input id="p_phone_code" required value="${esc(phoneCode)}" inputmode="tel"></label>
    <label>Phone number<input id="p_phone" required inputmode="tel" autocomplete="tel-national" value="${esc(localPhone)}"></label>
    <div id="stateFieldWrap">${stateField(p)}</div>
    <label>City / District<input id="p_city" required value="${esc(p.city||'')}"></label>
    <label>PIN / ZIP code<input id="p_pin" required inputmode="numeric" value="${esc(p.pin||'')}" onblur="lookupPin()"></label>
    <label class="wide">Full delivery address<textarea id="p_address" required autocomplete="street-address">${esc(p.address||'')}</textarea></label>
    <p id="pinHint" class="muted wide small"></p>`;
}
function countryChanged(){
  const code=$('p_country').value;
  $('p_phone_code').value=PHONE_CODES[code]||$('p_phone_code').value||'+';
  const oldState=$('p_state')?.value||'';
  $('stateFieldWrap').innerHTML=stateField({country_code:code,state:oldState});
}
async function lookupPin(){
  if($('p_country')?.value!=='IN') return;
  const pin=$('p_pin').value.trim(); if(!/^\d{6}$/.test(pin)) return;
  $('pinHint').textContent='Looking up PIN code…';
  try{
    const r=await fetch(`https://api.postalpincode.in/pincode/${encodeURIComponent(pin)}`);
    const j=await r.json(); const po=j?.[0]?.PostOffice?.[0];
    if(po){$('p_city').value=po.District||po.Block||$('p_city').value; if($('p_state')?.tagName==='SELECT') $('p_state').value=po.State||$('p_state').value; $('pinHint').textContent=`Found: ${po.Name}, ${po.District}, ${po.State}`;}
    else $('pinHint').textContent='PIN not found. You can still enter your city/state manually.';
  }catch{ $('pinHint').textContent='PIN lookup unavailable. You can enter your city/state manually.'; }
}

async function openProfile(p,required=false){
  if(!p&&supabaseReady()){
    const {data:{session}}=await supabaseClient.auth.getSession(); if(!session)return login();
    const r=await supabaseClient.from('profiles').select('*').eq('id',session.user.id).maybeSingle(); p=r.data||{};
  }
  profileRequired=required||profileRequired;
  $('profileTitle').textContent=profileRequired?'Complete your details':'Your details';
  $('profileClose').classList.toggle('hidden',profileRequired);
  $('profileForm').innerHTML=profileFields(p||{});
  $('profileModal').style.display='flex';
}
function closeProfile(force=false){if(profileRequired&&!force)return;$('profileModal').style.display='none';}

async function saveProfile(e){
  e.preventDefault(); if(!supabaseReady()) return;
  const {data:{session}}=await supabaseClient.auth.getSession(); if(!session)return login();
  const country=$('p_country').value, phoneCode=$('p_phone_code').value.trim(), localPhone=$('p_phone').value.trim();
  const payload={
    id:session.user.id,
    full_name:$('p_name').value.trim(),
    email:session.user.email,
    phone:`${phoneCode}${localPhone}`,
    phone_country_code:phoneCode,
    address:$('p_address').value.trim(),
    city:$('p_city').value.trim(),
    state:$('p_state').value.trim(),
    pin:$('p_pin').value.trim(),
    country_code:country
  };
  const {error}=await supabaseClient.from('profiles').upsert(payload,{onConflict:'id'});
  if(error)return alert(error.message);
  profileRequired=false; closeProfile(true); alert('Details saved successfully 💗');
}

async function checkout(){
  if(!cart.length)return alert('Your cart is empty.');
  if(!supabaseReady())return alert('Supabase is not configured.');
  const {data:{session}}=await supabaseClient.auth.getSession(); if(!session)return showAuthGate();
  const {data:p}=await supabaseClient.from('profiles').select('*').eq('id',session.user.id).maybeSingle();
  if(!profileComplete(p)){profileRequired=true;await openProfile(p||{},true);return;}
  localStorage.setItem('checkout_cart',JSON.stringify(cart)); location.href='checkout.html';
}

window.add=add;window.removeItem=removeItem;window.openCart=openCart;window.closeCart=closeCart;window.login=login;window.checkout=checkout;window.openProfile=openProfile;window.closeProfile=closeProfile;window.saveProfile=saveProfile;window.logout=logout;window.countryChanged=countryChanged;window.lookupPin=lookupPin;window.toggleMenu=toggleMenu;window.closeMenu=closeMenu;

document.addEventListener('DOMContentLoaded',async()=>{
  renderProducts();updateCart();
  if(supabaseReady()) supabaseClient.auth.onAuthStateChange(()=>setTimeout(refreshAuth,0));
  await refreshAuth();
});
