// ===== Fictional catalog =====
const CATEGORIES = ['Fashion','Electronics','Home & Living','Footwear','Beauty','Accessories'];
const CATEGORY_HUE = { 'Fashion':340, 'Electronics':220, 'Home & Living':30, 'Footwear':10, 'Beauty':330, 'Accessories':255 };

const PRODUCTS = [
  { id:1,  name:'Everyday Linen Shirt',        category:'Fashion',      price:1299, mrp:1799, rating:4.3, reviews:128, hue:200, badge:'Bestseller', inStock:true,
    desc:'Breathable pure-linen shirt, relaxed fit — built for humid afternoons and long days.' },
  { id:2,  name:'Relaxed Fit Chinos',          category:'Fashion',      price:1499, mrp:1999, rating:4.1, reviews:96,  hue:30,  badge:null, inStock:true,
    desc:'Soft cotton-twill chinos with a tapered relaxed fit and a hidden stretch waistband.' },
  { id:3,  name:'Wrap Midi Dress',             category:'Fashion',      price:1899, mrp:2499, rating:4.5, reviews:210, hue:340, badge:'New', inStock:true,
    desc:'A flattering wrap silhouette in a soft crepe fabric — day-to-evening ready.' },
  { id:4,  name:'Classic Denim Jacket',        category:'Fashion',      price:2299, mrp:2999, rating:4.4, reviews:154, hue:210, badge:null, inStock:false,
    desc:'Mid-wash denim jacket with a boxy cut and classic chest pockets.' },
  { id:5,  name:'Wireless Earbuds Pro',        category:'Electronics',  price:2499, mrp:3499, rating:4.2, reviews:540, hue:220, badge:'Bestseller', inStock:true,
    desc:'Active noise cancellation, 30-hour case battery, and a snug secure fit.' },
  { id:6,  name:'Smart Fitness Band',          category:'Electronics',  price:1799, mrp:2299, rating:4.0, reviews:320, hue:190, badge:null, inStock:true,
    desc:'Tracks steps, heart rate, and sleep. 10-day battery life, water resistant.' },
  { id:7,  name:'Portable Bluetooth Speaker',  category:'Electronics',  price:1599, mrp:2199, rating:4.3, reviews:275, hue:260, badge:null, inStock:true,
    desc:'Pocket-sized speaker with surprisingly deep bass and 12-hour playtime.' },
  { id:8,  name:'10000mAh Power Bank',         category:'Electronics',  price:999,  mrp:1399, rating:4.1, reviews:410, hue:40,  badge:null, inStock:true,
    desc:'Dual-port fast charging power bank, slim enough for a jacket pocket.' },
  { id:9,  name:'Ceramic Table Lamp',          category:'Home & Living',price:1299, mrp:1699, rating:4.4, reviews:88,  hue:25,  badge:null, inStock:true,
    desc:'Hand-finished ceramic base with a warm linen shade — a soft evening glow.' },
  { id:10, name:'Cotton Throw Blanket',        category:'Home & Living',price:899,  mrp:1199, rating:4.6, reviews:142, hue:15,  badge:'Bestseller', inStock:true,
    desc:'Woven cotton throw, generously sized, pre-washed for extra softness.' },
  { id:11, name:'Bamboo Cutting Board Set',    category:'Home & Living',price:699,  mrp:999,  rating:4.2, reviews:76,  hue:35,  badge:null, inStock:true,
    desc:'Set of 3 sustainably-sourced bamboo boards, gentle on knife edges.' },
  { id:12, name:'Scented Candle Trio',         category:'Home & Living',price:649,  mrp:899,  rating:4.5, reviews:190, hue:320, badge:'New', inStock:true,
    desc:'Three soy-wax candles — sandalwood, citrus, and rain — 35 hours burn each.' },
  { id:13, name:'Canvas Low-Top Sneakers',     category:'Footwear',     price:1799, mrp:2499, rating:4.3, reviews:302, hue:10,  badge:null, inStock:true,
    desc:'Everyday canvas sneakers with a cushioned insole and rubber sole.' },
  { id:14, name:'Everyday Leather Loafers',    category:'Footwear',     price:2199, mrp:2899, rating:4.1, reviews:118, hue:20,  badge:null, inStock:true,
    desc:'Genuine leather loafers, hand-stitched, break in comfortably within days.' },
  { id:15, name:'Trail Running Shoes',         category:'Footwear',     price:2799, mrp:3599, rating:4.4, reviews:265, hue:200, badge:'Sale', inStock:true,
    desc:'Grippy lugged outsole and breathable mesh upper for mixed terrain runs.' },
  { id:16, name:'Vitamin C Face Serum',        category:'Beauty',       price:549,  mrp:799,  rating:4.5, reviews:480, hue:330, badge:null, inStock:true,
    desc:'10% Vitamin C serum for brightening and evening out skin tone over time.' },
  { id:17, name:'Matte Lip Color Set',         category:'Beauty',       price:799,  mrp:1099, rating:4.3, reviews:220, hue:350, badge:null, inStock:true,
    desc:'Set of 4 long-wear matte lip shades, lightweight and non-drying formula.' },
  { id:18, name:'Argan Hair Oil',              category:'Beauty',       price:449,  mrp:649,  rating:4.2, reviews:165, hue:30,  badge:'Sale', inStock:false,
    desc:'Lightweight argan oil blend for frizz control and everyday shine.' },
  { id:19, name:'Minimalist Leather Wallet',   category:'Accessories',  price:899,  mrp:1299, rating:4.4, reviews:198, hue:25,  badge:null, inStock:true,
    desc:'Slim bifold wallet in full-grain leather with 6 card slots.' },
  { id:20, name:'Woven Tote Bag',              category:'Accessories', price:999,  mrp:1399, rating:4.1, reviews:87,  hue:150, badge:null, inStock:true,
    desc:'Sturdy woven tote with a reinforced base — everyday errands to weekend trips.' },
  { id:21, name:'Aviator Sunglasses',          category:'Accessories', price:1299, mrp:1799, rating:4.3, reviews:176, hue:250, badge:'New', inStock:true,
    desc:'UV400 protection with a classic teardrop frame in brushed metal.' },
];

// ===== State =====
let cart = [];          // [{productId, qty}]
let wishlist = new Set();
let currentView = { type:'home' };
let activeCategory = 'all';
let searchQuery = '';
let filterCats = new Set();
let minPriceFilter = '';
let maxPriceFilter = '';
let minRatingFilter = 0;
let sortBy = 'popularity';

// ===== Persistence =====
function loadState(){
  try{
    const c = localStorage.getItem('kartify_cart');
    if(c) cart = JSON.parse(c);
    const w = localStorage.getItem('kartify_wishlist');
    if(w) wishlist = new Set(JSON.parse(w));
  }catch(e){ /* fresh start */ }
}
function saveCart(){ try{ localStorage.setItem('kartify_cart', JSON.stringify(cart)); }catch(e){} }
function saveWishlist(){ try{ localStorage.setItem('kartify_wishlist', JSON.stringify([...wishlist])); }catch(e){} }

// ===== Utilities =====
function escapeHtml(str){ return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
function formatINR(n){ return '\u20B9' + Math.round(n).toLocaleString('en-IN'); }
function discountPct(price,mrp){ return mrp>price ? Math.round((1-price/mrp)*100) : 0; }
function gradientFor(hue){ return `linear-gradient(135deg, hsl(${hue},60%,55%), hsl(${(hue+40)%360},55%,32%))`; }
function productById(id){ return PRODUCTS.find(p=>p.id===id); }
function renderStars(rating){
  const full = Math.round(rating);
  return '<span class="stars">' + '\u2605'.repeat(full) + '\u2606'.repeat(5-full) + '</span>';
}
function genOrderId(){ return 'KRT' + Date.now().toString().slice(-8) + Math.floor(Math.random()*90+10); }

// ===== Cart logic =====
function addToCart(id, qty){
  qty = qty || 1;
  const existing = cart.find(c=>c.productId===id);
  if(existing) existing.qty += qty;
  else cart.push({ productId:id, qty });
  saveCart();
  updateBadges();
  showToast('Cart me add ho gaya!');
}
function removeFromCart(id){
  cart = cart.filter(c=>c.productId!==id);
  saveCart();
  updateBadges();
  if(currentView.type==='cart') renderCartDrawer();
}
function updateCartQty(id, qty){
  const item = cart.find(c=>c.productId===id);
  if(!item) return;
  item.qty = qty;
  if(item.qty <= 0){ removeFromCart(id); return; }
  saveCart();
  updateBadges();
  renderCartDrawer();
}
function cartSubtotal(){
  return cart.reduce((sum,c)=>{ const p = productById(c.productId); return p ? sum + p.price*c.qty : sum; }, 0);
}
function cartCount(){ return cart.reduce((n,c)=>n+c.qty,0); }

function toggleWishlist(id){
  if(wishlist.has(id)) wishlist.delete(id); else wishlist.add(id);
  saveWishlist();
  updateBadges();
  refreshCurrentView();
}

function updateBadges(){
  const cb = document.getElementById('cartBadge');
  const wb = document.getElementById('wishlistBadge');
  const cc = cartCount();
  cb.textContent = cc;
  cb.classList.toggle('hidden', cc===0);
  wb.textContent = wishlist.size;
  wb.classList.toggle('hidden', wishlist.size===0);
}

// ===== Category strip =====
function renderCatStrip(){
  const el = document.getElementById('catStrip');
  const chips = ['all', ...CATEGORIES];
  el.innerHTML = chips.map(c=>`
    <button class="cat-chip ${activeCategory===c?'active':''}" data-cat="${escapeHtml(c)}">${c==='all'?'All':escapeHtml(c)}</button>
  `).join('');
  el.querySelectorAll('.cat-chip').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      activeCategory = btn.dataset.cat;
      filterCats.clear();
      if(activeCategory !== 'all') filterCats.add(activeCategory);
      showShop();
    });
  });
}

// ===== Product card =====
function productCardHTML(p){
  const disc = discountPct(p.price,p.mrp);
  return `
  <div class="p-card" data-id="${p.id}">
    <div class="p-image" style="background:${gradientFor(p.hue)}">
      ${p.badge ? `<span class="p-badge ${p.badge==='Sale'?'sale':''}">${escapeHtml(p.badge)}</span>` : ''}
      <button class="p-wishlist ${wishlist.has(p.id)?'active':''}" data-wish="${p.id}">${wishlist.has(p.id) ? '&#9829;' : '&#9825;'}</button>
      ${escapeHtml(p.name)}
    </div>
    <div class="p-body">
      <div class="p-cat">${escapeHtml(p.category)}</div>
      <div class="p-name">${escapeHtml(p.name)}</div>
      <div class="p-rating">${renderStars(p.rating)} ${p.rating} <span>(${p.reviews})</span></div>
      <div class="p-price-row">
        <span class="p-price">${formatINR(p.price)}</span>
        ${p.mrp>p.price ? `<span class="p-mrp">${formatINR(p.mrp)}</span><span class="p-discount">${disc}% off</span>` : ''}
      </div>
      <button class="p-add-btn" data-add="${p.id}" ${!p.inStock?'disabled':''}>${p.inStock ? 'Add to Cart' : 'Out of Stock'}</button>
    </div>
  </div>`;
}
function wireProductCards(container){
  container.querySelectorAll('.p-card').forEach(card=>{
    card.addEventListener('click', (e)=>{
      if(e.target.closest('[data-add]') || e.target.closest('[data-wish]')) return;
      showDetail(Number(card.dataset.id));
    });
  });
  container.querySelectorAll('[data-add]').forEach(btn=>{
    btn.addEventListener('click', (e)=>{
      e.stopPropagation();
      addToCart(Number(btn.dataset.add), 1);
    });
  });
  container.querySelectorAll('[data-wish]').forEach(btn=>{
    btn.addEventListener('click', (e)=>{
      e.stopPropagation();
      toggleWishlist(Number(btn.dataset.wish));
    });
  });
}

// ===== Home view =====
function showHome(){
  currentView = { type:'home' };
  activeCategory = 'all';
  filterCats.clear();
  renderCatStrip();
  const trending = [...PRODUCTS].sort((a,b)=> b.rating*b.reviews - a.rating*a.reviews).slice(0,6);
  const deals = [...PRODUCTS].sort((a,b)=> discountPct(b.price,b.mrp) - discountPct(a.price,a.mrp)).slice(0,6);
  const main = document.getElementById('mainContent');
  main.innerHTML = `
    <div class="hero">
      <div class="kicker">New season</div>
      <h1>Roz ka saman, behtar daam par.</h1>
      <p>Fashion, electronics, home decor aur bhi bahut kuch — ek hi jagah par.</p>
      <button class="hero-btn" id="heroShopBtn">Abhi shop karo</button>
    </div>
    <div class="section">
      <div class="section-head"><h2>Categories</h2></div>
      <div class="tile-row" id="catTiles"></div>
    </div>
    <div class="section">
      <div class="section-head"><h2>Trending Now</h2><button class="link-btn" id="seeAllTrending">Sab dekho &#8594;</button></div>
      <div class="product-grid" id="trendingGrid"></div>
    </div>
    <div class="section">
      <div class="section-head"><h2>Deals of the Day</h2><button class="link-btn" id="seeAllDeals">Sab dekho &#8594;</button></div>
      <div class="product-grid" id="dealsGrid"></div>
    </div>
  `;
  const tiles = document.getElementById('catTiles');
  tiles.innerHTML = CATEGORIES.map(c=>`
    <div class="cat-tile" data-cat="${escapeHtml(c)}">
      <span class="cat-tile-swatch" style="background:${gradientFor(CATEGORY_HUE[c])}"></span>
      <span class="cat-tile-name">${escapeHtml(c)}</span>
    </div>
  `).join('');
  tiles.querySelectorAll('.cat-tile').forEach(t=>{
    t.addEventListener('click', ()=>{
      activeCategory = t.dataset.cat;
      filterCats = new Set([t.dataset.cat]);
      showShop();
    });
  });
  document.getElementById('heroShopBtn').addEventListener('click', ()=>{ activeCategory='all'; filterCats.clear(); showShop(); });
  document.getElementById('seeAllTrending').addEventListener('click', ()=>{ activeCategory='all'; filterCats.clear(); sortBy='rating'; showShop(); });
  document.getElementById('seeAllDeals').addEventListener('click', ()=>{ activeCategory='all'; filterCats.clear(); sortBy='discount'; showShop(); });

  const trendGrid = document.getElementById('trendingGrid');
  trendGrid.innerHTML = trending.map(productCardHTML).join('');
  wireProductCards(trendGrid);
  const dealGrid = document.getElementById('dealsGrid');
  dealGrid.innerHTML = deals.map(productCardHTML).join('');
  wireProductCards(dealGrid);
  window.scrollTo(0,0);
}

// ===== Shop view (filters + sort) =====
function filteredSortedProducts(){
  const q = searchQuery.trim().toLowerCase();
  let list = PRODUCTS.filter(p=>{
    const matchesCat = filterCats.size===0 || filterCats.has(p.category);
    const matchesQuery = !q || p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
    const matchesMin = !minPriceFilter || p.price >= Number(minPriceFilter);
    const matchesMax = !maxPriceFilter || p.price <= Number(maxPriceFilter);
    const matchesRating = p.rating >= minRatingFilter;
    return matchesCat && matchesQuery && matchesMin && matchesMax && matchesRating;
  });
  if(sortBy==='price-low') list.sort((a,b)=>a.price-b.price);
  else if(sortBy==='price-high') list.sort((a,b)=>b.price-a.price);
  else if(sortBy==='rating') list.sort((a,b)=>b.rating-a.rating);
  else if(sortBy==='discount') list.sort((a,b)=> discountPct(b.price,b.mrp) - discountPct(a.price,a.mrp));
  else list.sort((a,b)=> (b.rating*b.reviews) - (a.rating*a.reviews));
  return list;
}

function showShop(){
  currentView = { type:'shop' };
  renderCatStrip();
  const main = document.getElementById('mainContent');
  main.innerHTML = `
    <div class="shop-layout">
      <aside class="filters">
        <div class="filter-group">
          <h4>Category</h4>
          ${CATEGORIES.map(c=>`
            <label class="filter-check">
              <input type="checkbox" data-filter-cat="${escapeHtml(c)}" ${filterCats.has(c)?'checked':''}>
              ${escapeHtml(c)}
            </label>
          `).join('')}
        </div>
        <div class="filter-group">
          <h4>Price</h4>
          <div class="price-inputs">
            <input type="number" id="minPrice" placeholder="Min" value="${minPriceFilter}">
            <span>&#8211;</span>
            <input type="number" id="maxPrice" placeholder="Max" value="${maxPriceFilter}">
          </div>
        </div>
        <div class="filter-group">
          <h4>Rating</h4>
          ${[4,3,0].map(r=>`
            <label class="filter-check">
              <input type="radio" name="ratingFilter" value="${r}" ${minRatingFilter===r?'checked':''}>
              ${r>0 ? r+'&#9733; aur upar' : 'Sabhi ratings'}
            </label>
          `).join('')}
        </div>
        <button class="clear-filters" id="clearFilters">Sab filters hatao</button>
      </aside>
      <div>
        <div class="shop-toolbar">
          <span class="result-count" id="shopResultCount"></span>
          <select class="sort-select" id="sortSelect">
            <option value="popularity">Popularity</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Rating: High to Low</option>
            <option value="discount">Discount: High to Low</option>
          </select>
        </div>
        <div class="product-grid" id="shopGrid"></div>
        <div class="empty-msg hidden" id="shopEmpty">Koi product nahi mila. Filters badal ke dekho.</div>
      </div>
    </div>
  `;
  document.getElementById('sortSelect').value = sortBy;
  renderShopGrid();

  document.querySelectorAll('[data-filter-cat]').forEach(cb=>{
    cb.addEventListener('change', ()=>{
      if(cb.checked) filterCats.add(cb.dataset.filterCat);
      else filterCats.delete(cb.dataset.filterCat);
      activeCategory = filterCats.size===1 ? [...filterCats][0] : 'all';
      renderCatStrip();
      renderShopGrid();
    });
  });
  document.getElementById('minPrice').addEventListener('input', (e)=>{ minPriceFilter = e.target.value; renderShopGrid(); });
  document.getElementById('maxPrice').addEventListener('input', (e)=>{ maxPriceFilter = e.target.value; renderShopGrid(); });
  document.querySelectorAll('[name="ratingFilter"]').forEach(r=>{
    r.addEventListener('change', (e)=>{ minRatingFilter = Number(e.target.value); renderShopGrid(); });
  });
  document.getElementById('sortSelect').addEventListener('change', (e)=>{ sortBy = e.target.value; renderShopGrid(); });
  document.getElementById('clearFilters').addEventListener('click', ()=>{
    filterCats.clear(); minPriceFilter=''; maxPriceFilter=''; minRatingFilter=0; activeCategory='all'; sortBy='popularity';
    showShop();
  });
  window.scrollTo(0,0);
}
function renderShopGrid(){
  const list = filteredSortedProducts();
  const grid = document.getElementById('shopGrid');
  const empty = document.getElementById('shopEmpty');
  const count = document.getElementById('shopResultCount');
  if(!grid) return;
  count.textContent = list.length + ' products mile';
  empty.classList.toggle('hidden', list.length!==0);
  grid.innerHTML = list.map(productCardHTML).join('');
  wireProductCards(grid);
}

// ===== Wishlist view =====
function showWishlistView(){
  currentView = { type:'wishlist' };
  renderCatStrip();
  const items = PRODUCTS.filter(p=>wishlist.has(p.id));
  const main = document.getElementById('mainContent');
  main.innerHTML = `
    <div class="section-head"><h2>Aapki Wishlist</h2></div>
    <div class="product-grid" id="wishGrid"></div>
    ${items.length===0 ? '<div class="empty-msg">Wishlist khaali hai — kisi product ka heart icon tap karo.</div>' : ''}
  `;
  const grid = document.getElementById('wishGrid');
  grid.innerHTML = items.map(productCardHTML).join('');
  wireProductCards(grid);
  window.scrollTo(0,0);
}

// ===== Product detail =====
function showDetail(id){
  const p = productById(id);
  if(!p) return;
  currentView = { type:'detail', id };
  let qty = 1;
  const related = PRODUCTS.filter(r=>r.category===p.category && r.id!==p.id).slice(0,4);
  const disc = discountPct(p.price,p.mrp);
  const main = document.getElementById('mainContent');
  main.innerHTML = `
    <button class="back-link" id="backBtn">&#8592; Wapas jao</button>
    <div class="detail-layout">
      <div class="detail-image" style="background:${gradientFor(p.hue)}">${escapeHtml(p.name)}</div>
      <div>
        <div class="detail-cat">${escapeHtml(p.category)}</div>
        <h1 class="detail-title">${escapeHtml(p.name)}</h1>
        <div class="detail-rating">${renderStars(p.rating)} ${p.rating} &middot; ${p.reviews} reviews</div>
        <div class="detail-price-row">
          <span class="detail-price">${formatINR(p.price)}</span>
          ${p.mrp>p.price ? `<span class="detail-mrp">${formatINR(p.mrp)}</span><span class="detail-discount">${disc}% off</span>` : ''}
        </div>
        <div class="detail-stock ${p.inStock?'in':'out'}">${p.inStock ? '&#10003; In Stock' : '&#10007; Out of Stock'}</div>
        <p class="detail-desc">${escapeHtml(p.desc)}</p>
        <div class="qty-row">
          <div class="qty-stepper">
            <button id="qtyMinus">&#8722;</button>
            <span id="qtyVal">1</span>
            <button id="qtyPlus">&#43;</button>
          </div>
        </div>
        <div class="detail-actions">
          <button class="btn btn-accent" id="addToCartBtn" ${!p.inStock?'disabled':''}>Add to Cart</button>
          <button class="btn btn-outline" id="buyNowBtn" ${!p.inStock?'disabled':''}>Buy Now</button>
        </div>
      </div>
    </div>
    ${related.length ? `
    <div class="section" style="margin-top:44px;">
      <div class="section-head"><h2>Aapko yeh bhi pasand aa sakta hai</h2></div>
      <div class="product-grid" id="relatedGrid"></div>
    </div>` : ''}
  `;
  document.getElementById('backBtn').addEventListener('click', ()=> history.back ? showShop() : showHome());
  document.getElementById('qtyMinus').addEventListener('click', ()=>{ qty = Math.max(1, qty-1); document.getElementById('qtyVal').textContent = qty; });
  document.getElementById('qtyPlus').addEventListener('click', ()=>{ qty = Math.min(10, qty+1); document.getElementById('qtyVal').textContent = qty; });
  document.getElementById('addToCartBtn').addEventListener('click', ()=> addToCart(p.id, qty));
  document.getElementById('buyNowBtn').addEventListener('click', ()=>{ addToCart(p.id, qty); openCartDrawer(); });
  if(related.length){
    const rg = document.getElementById('relatedGrid');
    rg.innerHTML = related.map(productCardHTML).join('');
    wireProductCards(rg);
  }
  window.scrollTo(0,0);
}

// ===== Cart drawer =====
function openCartDrawer(){
  document.getElementById('cartOverlay').classList.remove('hidden');
  renderCartDrawer();
}
function closeCartDrawer(){ document.getElementById('cartOverlay').classList.add('hidden'); }
function renderCartDrawer(){
  const drawer = document.getElementById('cartDrawer');
  const items = cart.map(c=>({ ...c, product: productById(c.productId) })).filter(c=>c.product);
  const subtotal = cartSubtotal();
  drawer.innerHTML = `
    <div class="drawer-header"><h2>Aapka Cart (${cartCount()})</h2><button class="close-btn" id="closeCartBtn">&#10005;</button></div>
    ${items.length===0 ? '<div class="empty-msg">Cart khaali hai.</div>' : items.map(c=>`
      <div class="cart-item">
        <div class="cart-item-img" style="background:${gradientFor(c.product.hue)}"></div>
        <div class="cart-item-info">
          <div class="cart-item-name">${escapeHtml(c.product.name)}</div>
          <div class="cart-item-price">${formatINR(c.product.price)}</div>
          <div class="cart-item-row">
            <div class="cart-item-qty">
              <button data-dec="${c.productId}">&#8722;</button>
              <span>${c.qty}</span>
              <button data-inc="${c.productId}">&#43;</button>
            </div>
            <button class="remove-btn" data-remove="${c.productId}">Hatao</button>
          </div>
        </div>
      </div>
    `).join('')}
    ${items.length ? `
    <div class="cart-summary">
      <div class="summary-row"><span>Subtotal</span><span>${formatINR(subtotal)}</span></div>
      <div class="summary-row"><span>Shipping</span><span>${subtotal>=999 ? 'FREE' : formatINR(49)}</span></div>
      <div class="summary-row total"><span>Total</span><span>${formatINR(subtotal + (subtotal>=999?0:49))}</span></div>
      <button class="btn btn-accent btn-block" id="checkoutBtn" style="margin-top:14px;">Checkout par jao</button>
    </div>` : ''}
  `;
  document.getElementById('closeCartBtn').addEventListener('click', closeCartDrawer);
  drawer.querySelectorAll('[data-inc]').forEach(b=> b.addEventListener('click', ()=>{
    const item = cart.find(c=>c.productId===Number(b.dataset.inc)); updateCartQty(item.productId, item.qty+1);
  }));
  drawer.querySelectorAll('[data-dec]').forEach(b=> b.addEventListener('click', ()=>{
    const item = cart.find(c=>c.productId===Number(b.dataset.dec)); updateCartQty(item.productId, item.qty-1);
  }));
  drawer.querySelectorAll('[data-remove]').forEach(b=> b.addEventListener('click', ()=> removeFromCart(Number(b.dataset.remove))));
  const checkoutBtn = document.getElementById('checkoutBtn');
  if(checkoutBtn) checkoutBtn.addEventListener('click', ()=>{ closeCartDrawer(); showCheckout(); });
}

// ===== Checkout =====
function showCheckout(){
  if(cart.length===0){ showToast('Cart khaali hai.'); showHome(); return; }
  currentView = { type:'checkout' };
  renderCatStrip();
  const items = cart.map(c=>({ ...c, product: productById(c.productId) })).filter(c=>c.product);
  const subtotal = cartSubtotal();
  const shipping = subtotal>=999 ? 0 : 49;
  const main = document.getElementById('mainContent');
  main.innerHTML = `
    <button class="back-link" id="backToCartBtn">&#8592; Cart par wapas</button>
    <div class="checkout-layout">
      <div class="checkout-form">
        <h2>Shipping details</h2>
        <label class="form-label">Poora naam</label>
        <input class="form-field" id="ck_name" placeholder="Aapka naam">
        <label class="form-label">Phone number</label>
        <input class="form-field" id="ck_phone" placeholder="10-digit mobile number">
        <label class="form-label">Address</label>
        <input class="form-field" id="ck_address" placeholder="House no, street, area">
        <div class="form-row">
          <div class="form-col">
            <label class="form-label">City</label>
            <input class="form-field" id="ck_city" placeholder="City">
          </div>
          <div class="form-col">
            <label class="form-label">Pincode</label>
            <input class="form-field" id="ck_pincode" placeholder="6-digit pincode">
          </div>
        </div>
        <p class="error-text hidden" id="ck_error"></p>
        <button class="btn btn-accent btn-block" id="placeOrderBtn" style="margin-top:18px;">Order place karo</button>
      </div>
      <div class="order-summary">
        <h2>Order Summary</h2>
        ${items.map(c=>`
          <div class="mini-item"><span>${escapeHtml(c.product.name)} &times; ${c.qty}</span><span>${formatINR(c.product.price*c.qty)}</span></div>
        `).join('')}
        <div class="summary-row" style="margin-top:12px;"><span>Subtotal</span><span>${formatINR(subtotal)}</span></div>
        <div class="summary-row"><span>Shipping</span><span>${shipping===0?'FREE':formatINR(shipping)}</span></div>
        <div class="summary-row total"><span>Total</span><span>${formatINR(subtotal+shipping)}</span></div>
      </div>
    </div>
  `;
  document.getElementById('backToCartBtn').addEventListener('click', openCartDrawer);
  document.getElementById('placeOrderBtn').addEventListener('click', ()=> placeOrder(subtotal+shipping));
  window.scrollTo(0,0);
}
function placeOrder(total){
  const name = document.getElementById('ck_name').value.trim();
  const phone = document.getElementById('ck_phone').value.trim();
  const address = document.getElementById('ck_address').value.trim();
  const city = document.getElementById('ck_city').value.trim();
  const pincode = document.getElementById('ck_pincode').value.trim();
  const errorEl = document.getElementById('ck_error');
  if(!name || !address || !city || !/^\d{10}$/.test(phone) || !/^\d{6}$/.test(pincode)){
    errorEl.textContent = 'Sabhi fields sahi se bharein — phone 10 digit aur pincode 6 digit ka hona chahiye.';
    errorEl.classList.remove('hidden');
    return;
  }
  const order = { id: genOrderId(), total, itemCount: cartCount(), date: new Date().toISOString() };
  try{
    const raw = localStorage.getItem('kartify_orders');
    const list = raw ? JSON.parse(raw) : [];
    list.unshift(order);
    localStorage.setItem('kartify_orders', JSON.stringify(list));
  }catch(e){}
  cart = [];
  saveCart();
  updateBadges();
  showConfirmation(order);
}
function showConfirmation(order){
  currentView = { type:'confirm' };
  renderCatStrip();
  const main = document.getElementById('mainContent');
  main.innerHTML = `
    <div class="confirm-box">
      <div class="confirm-icon">&#10003;</div>
      <h1>Order confirm ho gaya!</h1>
      <p>Aapka order place ho gaya hai aur jaldi process hoga.</p>
      <div class="order-id-box">Order ID: ${order.id}</div>
      <p>${order.itemCount} items &middot; ${formatINR(order.total)}</p>
      <button class="btn btn-accent" id="continueShoppingBtn" style="margin-top:20px;">Shopping continue karo</button>
    </div>
  `;
  document.getElementById('continueShoppingBtn').addEventListener('click', showHome);
  window.scrollTo(0,0);
}

// ===== Toast =====
let toastTimer = null;
function showToast(msg){
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.remove('hidden');
  if(toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(()=> el.classList.add('hidden'), 2200);
}

function refreshCurrentView(){
  if(currentView.type==='home') showHome();
  else if(currentView.type==='shop') renderShopGrid();
  else if(currentView.type==='wishlist') showWishlistView();
  else if(currentView.type==='detail') showDetail(currentView.id);
}

// ===== Global listeners =====
document.getElementById('logoBtn').addEventListener('click', showHome);
document.getElementById('cartBtn').addEventListener('click', openCartDrawer);
document.getElementById('wishlistBtn').addEventListener('click', showWishlistView);
document.getElementById('cartOverlay').addEventListener('click', (e)=>{ if(e.target.id==='cartOverlay') closeCartDrawer(); });
document.getElementById('searchInput').addEventListener('input', (e)=>{
  searchQuery = e.target.value;
  activeCategory = 'all';
  filterCats.clear();
  showShop();
});
document.getElementById('menuBtn').addEventListener('click', ()=>{
  document.getElementById('catStrip').scrollIntoView({behavior:'smooth'});
});

// ===== Init =====
loadState();
updateBadges();
showHome();
