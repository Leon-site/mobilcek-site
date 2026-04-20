const PRODUCTS = [
  {id:'tel1',cat:'telefonija',name:'Mobilček X12 Pro',price:899,oldPrice:1099,icon:'📱',tags:['5G','256 GB','AMOLED'],desc:'Zmogljiv pametni telefon za vsak dan.'},
  {id:'tel2',cat:'telefonija',name:'Mobilček Air Lite',price:499,oldPrice:629,icon:'📲',tags:['128 GB','OLED','Dual SIM'],desc:'Lahek telefon z odlično baterijo.'},
  {id:'tel3',cat:'telefonija',name:'Brezžične slušalke Sonic',price:129,oldPrice:169,icon:'🎧',tags:['ANC','Bluetooth 5.3'],desc:'Čist zvok in udobje za cel dan.'},
  {id:'tel4',cat:'telefonija',name:'Pametna ura Active',price:199,oldPrice:249,icon:'⌚',tags:['GPS','AMOLED'],desc:'Pametna ura za šport in vsakdan.'},

  {id:'pc1',cat:'racunalniki',name:'Gaming PC Nitro RTX',price:1899,oldPrice:2199,icon:'🖥️',tags:['RTX','32 GB RAM'],desc:'Gaming računalnik za zahtevne igre.'},
  {id:'pc2',cat:'racunalniki',name:'Prenosnik UltraBook 15',price:999,oldPrice:1199,icon:'💻',tags:['16 GB RAM','SSD'],desc:'Eleganten in hiter prenosnik za delo.'},
  {id:'pc3',cat:'racunalniki',name:'Monitor Vision 27"',price:279,oldPrice:329,icon:'🖲️',tags:['144 Hz','IPS'],desc:'Gladko gibanje in ostro sliko.'},
  {id:'pc4',cat:'racunalniki',name:'Mehanska tipkovnica Pro',price:109,oldPrice:139,icon:'⌨️',tags:['RGB','Hot-swap'],desc:'Natančen odziv in moden dizajn.'},

  {id:'home1',cat:'bela-tehnika',name:'Pralni stroj Fresh 9 kg',price:549,oldPrice:679,icon:'🧺',tags:['A razred','Inverter'],desc:'Tiho pranje in pametni programi.'},
  {id:'home2',cat:'bela-tehnika',name:'Hladilnik CoolMax XL',price:799,oldPrice:949,icon:'🧊',tags:['No Frost','XL'],desc:'Velik hladilnik za sodobni dom.'},
  {id:'home3',cat:'bela-tehnika',name:'Sesalnik Turbo Clean',price:189,oldPrice:239,icon:'🧹',tags:['Turbo','HEPA'],desc:'Močan sesalnik z odličnim filtrom.'},
  {id:'home4',cat:'bela-tehnika',name:'Kavni aparat Aroma',price:259,oldPrice:319,icon:'☕',tags:['15 bar','Latte'],desc:'Bogata kava in preprost nadzor.'}
];

const REVIEWS_KEY = 'mobilcek_reviews_v2';
const CART_KEY = 'mobilcek_cart_v2';
const COUPON_KEY = 'mobilcek_coupon_v2';
const MINIGAME_KEY = 'mobilcek_minigame_reward_v2';
const ADMIN_EMAIL = 'francekleon26@gmail.com';
const DEFAULT_REVIEWS = [
  {id:'r1',name:'Luka',email:'luka@example.com',rating:5,title:'Odlična izkušnja',text:'Stran je pregledna, naročilo hitro in vse je bilo jasno.',reply:'Hvala za zaupanje. Veseli nas, da je bilo vse hitro in pregledno.'},
  {id:'r2',name:'Maja',email:'maja@example.com',rating:4,title:'Lepa ponudba',text:'Všeč mi je črno-rdeč videz in enostavna košarica.',reply:''}
];

function euro(v){ return new Intl.NumberFormat('sl-SI',{style:'currency',currency:'EUR'}).format(v); }
function qs(sel,parent=document){ return parent.querySelector(sel); }
function qsa(sel,parent=document){ return [...parent.querySelectorAll(sel)]; }
function getCart(){ return JSON.parse(localStorage.getItem(CART_KEY) || '[]'); }
function saveCart(cart){ localStorage.setItem(CART_KEY, JSON.stringify(cart)); updateCartBadges(); }
function addToCart(id){
  const cart = getCart();
  const found = cart.find(i=>i.id===id);
  if(found) found.qty += 1; else cart.push({id, qty:1});
  saveCart(cart); toast('Izdelek je dodan v košarico.', 'success');
}
function removeFromCart(id){ saveCart(getCart().filter(i=>i.id!==id)); renderCartPage(); }
function changeQty(id,delta){
  const cart = getCart();
  const item = cart.find(i=>i.id===id);
  if(!item) return;
  item.qty += delta;
  if(item.qty <= 0) return removeFromCart(id);
  saveCart(cart); renderCartPage();
}
function getCoupon(){ return JSON.parse(localStorage.getItem(COUPON_KEY) || 'null'); }
function setCoupon(coupon){ localStorage.setItem(COUPON_KEY, JSON.stringify(coupon)); }
function getGameReward(){ return JSON.parse(localStorage.getItem(MINIGAME_KEY) || 'null'); }
function setGameReward(data){ localStorage.setItem(MINIGAME_KEY, JSON.stringify(data)); }
function productById(id){ return PRODUCTS.find(p=>p.id===id); }
function cartTotals(){
  const cart = getCart();
  const subtotal = cart.reduce((s,i)=>{
    const p = productById(i.id); return s + (p ? p.price * i.qty : 0);
  },0);
  const coupon = getCoupon();
  let discount = 0;
  if(coupon?.code === 'MOBILČEK2026') discount = subtotal * 0.25;
  if(coupon?.code === 'BONUS10') discount = Math.max(discount, subtotal * 0.10);
  return {subtotal, discount, total: Math.max(0, subtotal - discount)};
}
function updateCartBadges(){
  const count = getCart().reduce((s,i)=>s+i.qty,0);
  qsa('[data-cart-count]').forEach(el=>el.textContent = count);
}
function toast(text,type='success'){
  const wrap = document.createElement('div');
  wrap.className = `notice ${type}`;
  wrap.textContent = text;
  wrap.style.position = 'fixed';
  wrap.style.right = '16px'; wrap.style.bottom = '16px'; wrap.style.zIndex = '1000';
  wrap.style.maxWidth = '320px';
  document.body.appendChild(wrap);
  setTimeout(()=>wrap.remove(), 2600);
}
function initReviews(){
  if(!localStorage.getItem(REVIEWS_KEY)) localStorage.setItem(REVIEWS_KEY, JSON.stringify(DEFAULT_REVIEWS));
}
function getReviews(){ initReviews(); return JSON.parse(localStorage.getItem(REVIEWS_KEY) || '[]'); }
function saveReviews(reviews){ localStorage.setItem(REVIEWS_KEY, JSON.stringify(reviews)); }
function stars(n){ return '★'.repeat(n) + '☆'.repeat(5-n); }
function productCard(p){
  return `<article class="product-card">
    <div class="product-image">${p.icon}</div>
    <div class="product-meta">
      <div>
        <div class="product-title">${p.name}</div>
        <div class="muted">${p.desc}</div>
      </div>
    </div>
    <div class="badges">${p.tags.map(t=>`<span class="badge">${t}</span>`).join('')}</div>
    <div class="product-meta">
      <div>
        <div class="old-price">${euro(p.oldPrice)}</div>
        <div class="price">${euro(p.price)}</div>
      </div>
      <div class="badge">Popust</div>
    </div>
    <div class="product-actions top-space">
      <button class="btn btn-secondary" onclick="addToCart('${p.id}')">Dodaj</button>
      <button class="btn btn-primary" onclick="location.href='cart.html'">Kupi</button>
    </div>
  </article>`;
}
function renderProductGrid(selector, cat){
  const el = qs(selector); if(!el) return;
  const items = cat ? PRODUCTS.filter(p=>p.cat===cat) : PRODUCTS;
  el.innerHTML = items.map(productCard).join('');
}
function renderCartPage(){
  const itemsWrap = qs('#cartItems');
  const summary = qs('#cartSummary');
  if(!itemsWrap || !summary) return;
  const cart = getCart();
  if(!cart.length){
    itemsWrap.innerHTML = `<div class="empty-state">Košarica je trenutno prazna.</div>`;
  } else {
    itemsWrap.innerHTML = cart.map(i=>{
      const p = productById(i.id);
      return `<div class="cart-item">
        <div class="cart-thumb">${p.icon}</div>
        <div>
          <div class="product-title">${p.name}</div>
          <div class="muted">${euro(p.price)} / kos</div>
          <div class="top-space qty-row">
            <button onclick="changeQty('${i.id}',-1)">−</button>
            <span>${i.qty}</span>
            <button onclick="changeQty('${i.id}',1)">+</button>
          </div>
        </div>
        <div style="text-align:right;display:grid;gap:8px;justify-items:end;">
          <div class="price">${euro(p.price*i.qty)}</div>
          <button class="btn btn-secondary" onclick="removeFromCart('${i.id}')">Odstrani</button>
        </div>
      </div>`;
    }).join('');
  }
  const totals = cartTotals();
  const coupon = getCoupon();
  summary.innerHTML = `
    <div class="cart-panel">
      <h3>Povzetek naročila</h3>
      <div class="small">Vnesi kodo za popust ali opravi testno naročilo.</div>
      <form id="couponForm" class="inline-form top-space">
        <input class="field" id="couponInput" placeholder="Vnesi kodo" value="${coupon?.code || ''}">
        <button class="btn btn-primary" type="submit">Potrdi</button>
      </form>
      <div class="top-space" style="display:grid;gap:10px;">
        <div style="display:flex;justify-content:space-between;"><span class="muted">Vmesni seštevek</span><strong>${euro(totals.subtotal)}</strong></div>
        <div style="display:flex;justify-content:space-between;"><span class="muted">Popust</span><strong>− ${euro(totals.discount)}</strong></div>
        <div style="display:flex;justify-content:space-between;font-size:1.15rem;"><span>Skupaj</span><strong>${euro(totals.total)}</strong></div>
      </div>
      <div class="notice warn top-space">Aktivna koda: ${coupon?.code || 'ni uporabljena'}</div>
      <button class="btn btn-primary" style="width:100%;margin-top:8px;" onclick="checkoutDemo()">Zaključi testno naročilo</button>
      <div class="small top-space">To je statična demonstracija. Za pravo plačilo potrebuješ backend ali ponudnika plačil.</div>
    </div>`;
  qs('#couponForm')?.addEventListener('submit', e=>{
    e.preventDefault();
    const code = qs('#couponInput').value.trim().toUpperCase();
    if(code === 'MOBILČEK2026' || code === 'BONUS10') {
      setCoupon({code}); toast(`Koda ${code} je aktivirana.`, 'success'); renderCartPage();
    } else {
      toast('Ta koda ni veljavna.', 'error');
    }
  });
}
function checkoutDemo(){
  if(!getCart().length) return toast('Košarica je prazna.', 'error');
  saveCart([]); setCoupon(null);
  toast('Testno naročilo je uspešno zaključeno.', 'success');
  renderCartPage();
}
function handleSearch(){
  const val = qs('#siteSearch')?.value?.trim().toLowerCase();
  if(!val) return;
  const found = PRODUCTS.find(p => p.name.toLowerCase().includes(val) || p.desc.toLowerCase().includes(val) || p.tags.join(' ').toLowerCase().includes(val));
  if(found) location.href = `${found.cat}.html#${found.id}`;
  else toast('Ni zadetkov za ta izraz.', 'error');
}
function renderReviews(){
  const list = qs('#reviewList'); if(!list) return;
  const reviews = getReviews();
  list.innerHTML = reviews.map(r=>`<article class="review-card">
    <div class="review-top">
      <div>
        <div class="product-title">${r.title}</div>
        <div class="small">${r.name} • ${r.email}</div>
      </div>
      <div class="stars">${stars(r.rating)}</div>
    </div>
    <p class="muted">${r.text}</p>
    ${r.reply ? `<div class="reply"><strong>Odgovor trgovine:</strong><div class="small top-space">${r.reply}</div></div>` : ''}
  </article>`).join('');
}
function bindReviewForm(){
  qs('#reviewForm')?.addEventListener('submit', e=>{
    e.preventDefault();
    const data = {
      id: 'r'+Date.now(),
      name: qs('#reviewName').value.trim(),
      email: qs('#reviewEmail').value.trim(),
      rating: Number(qs('#reviewRating').value),
      title: qs('#reviewTitle').value.trim(),
      text: qs('#reviewText').value.trim(),
      reply: ''
    };
    if(!data.name || !data.email || !data.title || !data.text) return toast('Izpolni vsa polja.', 'error');
    const reviews = getReviews();
    reviews.unshift(data); saveReviews(reviews); e.target.reset(); renderReviews(); toast('Recenzija je oddana.', 'success');
  });
}
function bindAdminPanel(){
  qs('#adminLoginForm')?.addEventListener('submit', e=>{
    e.preventDefault();
    const email = qs('#adminEmail').value.trim().toLowerCase();
    if(email !== ADMIN_EMAIL) return toast('Ta email nima admin dostopa.', 'error');
    qs('#adminArea').hidden = false;
    qs('#adminGate').hidden = true;
    renderAdminReplies();
    toast('Admin način je aktiviran.', 'success');
  });
}
function renderAdminReplies(){
  const wrap = qs('#adminReplies'); if(!wrap) return;
  const reviews = getReviews();
  wrap.innerHTML = reviews.map(r=>`<div class="admin-gate">
    <div class="product-title">${r.title}</div>
    <div class="small">${r.name} • ${r.email} • ${stars(r.rating)}</div>
    <div class="muted">${r.text}</div>
    <textarea id="reply-${r.id}" placeholder="Vnesi odgovor">${r.reply || ''}</textarea>
    <button class="btn btn-primary" onclick="saveReply('${r.id}')">Shrani odgovor</button>
  </div>`).join('');
}
function saveReply(id){
  const reviews = getReviews();
  const review = reviews.find(r=>r.id===id); if(!review) return;
  review.reply = qs(`#reply-${id}`).value.trim();
  saveReviews(reviews); renderReviews(); renderAdminReplies(); toast('Odgovor je shranjen.', 'success');
}
function bindMinigame(){
  const result = qs('#gameResult');
  const reward = getGameReward();
  if(reward && result) result.innerHTML = `<div class="notice success">Že imaš bonus kodo: <strong>${reward.code}</strong></div>`;
  qsa('.choice-btn').forEach(btn=>btn.addEventListener('click', ()=>{
    const good = btn.dataset.good === '1';
    if(good){
      setGameReward({code:'BONUS10'});
      result.innerHTML = `<div class="notice success">Bravo. Dobil si bonus kodo <strong>BONUS10</strong> za 10 % popusta.</div>`;
      toast('Osvojil si BONUS10.', 'success');
    } else {
      result.innerHTML = `<div class="notice error">Tokrat ni uspelo. Poskusi ponovno po osvežitvi strani.</div>`;
      toast('Napačna izbira.', 'error');
    }
  }));
}
function initCommon(){
  updateCartBadges();
  qs('#searchBtn')?.addEventListener('click', handleSearch);
  qs('#siteSearch')?.addEventListener('keydown', e=>{ if(e.key==='Enter') handleSearch(); });
  renderProductGrid('#featuredProducts');
  renderProductGrid('#phoneProducts','telefonija');
  renderProductGrid('#pcProducts','racunalniki');
  renderProductGrid('#whiteProducts','bela-tehnika');
  renderCartPage();
  initReviews(); renderReviews(); bindReviewForm(); bindAdminPanel(); bindMinigame();
}
document.addEventListener('DOMContentLoaded', initCommon);
