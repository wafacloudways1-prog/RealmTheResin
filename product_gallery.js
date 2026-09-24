/* RealmTheResin product gallery upgrade.
   Loaded AFTER app.js in index.html.
   Uses products.image_urls when available and falls back to image_url.
*/
(function(){
  const esc2 = v => String(v ?? '').replace(/[&<>"']/g, c => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  }[c]));
  const money2 = v => Number(v || 0).toFixed(2);

  let galleryIndex = {};
  let galleryProducts = [];

  function galleryImages(p){
    let arr = Array.isArray(p.image_urls) ? p.image_urls.filter(Boolean) : [];
    if(!arr.length && p.image_url) arr = [p.image_url];
    if(!arr.length && p.id) arr = [`images/${p.id}.jpg`];
    return arr;
  }

  function openProductGallery(id){
    const p = galleryProducts.find(x => x.id === id);
    if(!p) return;
    const imgs = galleryImages(p);
    galleryIndex[id] = galleryIndex[id] || 0;
    const i = Math.min(galleryIndex[id], Math.max(0, imgs.length-1));

    let m = document.getElementById('productGalleryModal');
    if(!m){
      m = document.createElement('div');
      m.id='productGalleryModal';
      m.className='modal';
      m.innerHTML=`
        <div class="cart product-gallery-modal">
          <button class="close" onclick="closeProductGallery()">×</button>
          <div id="pgImageWrap"></div>
          <div id="pgThumbs" class="pg-thumbs"></div>
          <h2 id="pgTitle"></h2>
          <p id="pgDescription" class="muted"></p>
          <div id="pgPrice"></div>
          <button id="pgAdd" class="primary full">Add to Cart</button>
        </div>`;
      document.body.appendChild(m);
    }

    $('pgTitle').textContent=p.name;
    $('pgDescription').textContent=p.description||'';
    $('pgPrice').innerHTML=p.discount>0
      ? `<span class="old-price">₹${money2(p.basePrice)}</span> <b>₹${money2(p.price)}</b>`
      : `<b>₹${money2(p.price)}</b>`;

    const renderGallery=()=>{
      const ii=galleryIndex[id]||0;
      $('pgImageWrap').innerHTML=`
        <div class="pg-main">
          <img src="${esc2(imgs[ii])}" alt="${esc2(p.name)}">
          ${imgs.length>1?`
            <button class="pg-prev" onclick="productGalleryMove('${esc2(id)}',-1)">‹</button>
            <button class="pg-next" onclick="productGalleryMove('${esc2(id)}',1)">›</button>`:''}
        </div>`;
      $('pgThumbs').innerHTML=imgs.length>1?imgs.map((src,n)=>
        `<button class="pg-thumb ${n===ii?'active':''}" onclick="productGallerySet('${esc2(id)}',${n})">
          <img src="${esc2(src)}" alt="">
        </button>`).join(''):'';
    };
    renderGallery();

    $('pgAdd').onclick=()=>{ if(window.add) window.add(id); closeProductGallery(); };
    m.style.display='flex';
  }

  function closeProductGallery(){
    const m=document.getElementById('productGalleryModal');
    if(m) m.style.display='none';
  }

  function productGalleryMove(id,delta){
    const p=galleryProducts.find(x=>x.id===id); if(!p)return;
    const imgs=galleryImages(p);
    let i=(galleryIndex[id]||0)+delta;
    if(i<0)i=imgs.length-1;
    if(i>=imgs.length)i=0;
    galleryIndex[id]=i;
    openProductGallery(id);
  }

  function productGallerySet(id,i){
    galleryIndex[id]=i;
    openProductGallery(id);
  }

  window.openProductGallery=openProductGallery;
  window.closeProductGallery=closeProductGallery;
  window.productGalleryMove=productGalleryMove;
  window.productGallerySet=productGallerySet;

  const originalLoadProducts = window.loadProducts;
  window.loadProducts = async function(){
    if(!window.supabaseClient) return;
    const {data,error}=await window.supabaseClient.from('products')
      .select('*').eq('active',true).order('created_at',{ascending:true}).order('id');
    if(!error && data){
      galleryProducts=data.map(p=>{
        const imgs=galleryImages(p);
        return {
          id:p.id,
          name:p.name,
          description:p.description||'',
          price:Number(p.price)-Number(p.discount||0),
          basePrice:Number(p.price),
          discount:Number(p.discount||0),
          image:imgs[0]||`images/${p.id}.jpg`,
          image_urls:imgs,
          active:p.active
        };
      });
      window.products=galleryProducts;
    }
  };

  window.renderProducts = function(){
    const e=document.getElementById('products');
    if(!e) return;
    e.innerHTML=galleryProducts.map(p=>`
      <article class="product product-card-gallery">
        <button class="product-image-button" type="button" onclick="openProductGallery('${esc2(p.id)}')">
          <img src="${esc2(p.image)}" alt="${esc2(p.name)}" loading="lazy">
          ${p.image_urls.length>1?`<span class="photo-count">📷 ${p.image_urls.length}</span>`:''}
        </button>
        <h3>${esc2(p.name)}</h3>
        <p class="product-description">${esc2(p.description||'')}</p>
        ${p.discount>0
          ? `<div><span class="old-price">₹${money2(p.basePrice)}</span> <b>₹${money2(p.price)}</b></div>`
          : `<b>₹${money2(p.price)}</b>`}
        <div class="product-card-actions">
          <button type="button" onclick="add('${esc2(p.id)}')">Add to Cart</button>
          <button type="button" class="ghost" onclick="openProductGallery('${esc2(p.id)}')">View photos</button>
        </div>
      </article>`).join('');
  };

  const style=document.createElement('style');
  style.textContent=`
    .product-image-button{position:relative;display:block;width:100%;padding:0;border:0;background:none;cursor:pointer}
    .product-image-button img{display:block;width:100%;aspect-ratio:1/1;object-fit:cover;border-radius:14px}
    .photo-count{position:absolute;right:10px;bottom:10px;padding:5px 8px;border-radius:999px;background:rgba(0,0,0,.65);color:#fff;font-size:.78rem}
    .product-description{min-height:2.5em;color:#666;font-size:.9rem}
    .product-card-actions{display:flex;gap:8px;flex-wrap:wrap;margin-top:10px}
    .product-card-actions button{flex:1}
    .product-gallery-modal{max-width:650px}
    .pg-main{position:relative}
    .pg-main img{display:block;width:100%;max-height:60vh;object-fit:contain;border-radius:14px;background:#fafafa}
    .pg-prev,.pg-next{position:absolute;top:50%;transform:translateY(-50%);border:0;border-radius:50%;width:40px;height:40px;background:rgba(0,0,0,.55);color:#fff;font-size:28px;cursor:pointer}
    .pg-prev{left:10px}.pg-next{right:10px}
    .pg-thumbs{display:flex;gap:8px;overflow:auto;padding:10px 0}
    .pg-thumb{border:2px solid transparent;padding:0;background:none;border-radius:8px;overflow:hidden;cursor:pointer;min-width:58px}
    .pg-thumb.active{border-color:#e35b9a}
    .pg-thumb img{display:block;width:58px;height:58px;object-fit:cover}
  `;
  document.head.appendChild(style);
})();
