const PRODUCTS = [
  {id:'tel1',cat:'telefonija',name:'Apple iPhone 17 128 GB',price:979,oldPrice:1099,image:'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-compare-iphone-17-202509?.v=M0dlUVBobHVpY1h1dmlaR3RZekpENGh0eTVTNkN2NWpWZVAwbzMwQlBCTkxxZU5scXpES1hnUm96ckN1R2pZN215d1FhSDJ0bkR0ZGZtUjZJNmFveFo2eWNJSlJFRDM1UWQ2eUozZ1l5ZDA&fmt=png-alpha&hei=512&wid=400',tags:['Apple','128 GB','OLED'],desc:'Aktualni iPhone z elegantnim dizajnom in hitrim delovanjem.'},
  {id:'tel2',cat:'telefonija',name:'Samsung Galaxy S24 128 GB',price:899,oldPrice:999,image:'https://images.samsung.com/ie/smartphones/galaxy-s24/images/galaxy-s24-highlights-kv.jpg?imbypass=true',tags:['Samsung','128 GB','Galaxy AI'],desc:'Kompakten premijski telefon z zmogljivo kamero in AI funkcijami.'},
  {id:'tel3',cat:'telefonija',name:'Google Pixel 9 128 GB',price:799,oldPrice:899,icon:'📱',tags:['Google','128 GB','AI kamera'],desc:'Čist Android, dobra kamera in sodoben AI pristop.'},
  {id:'tel4',cat:'telefonija',name:'Xiaomi 14T 256 GB',price:383,oldPrice:449,icon:'📲',tags:['Xiaomi','256 GB','Leica'],desc:'Ugodnejši flagship z veliko prostora in hitrim polnjenjem.'},

  {id:'pc1',cat:'racunalniki',name:'ASUS TUF Gaming A15',price:764,oldPrice:899,icon:'💻',tags:['Gaming','RTX 3050','16 GB RAM'],desc:'Gaming prenosnik za igre, ustvarjanje in hitrejše delo.'},
  {id:'pc2',cat:'racunalniki',name:'Lenovo IdeaPad Slim 3 15',price:769.99,oldPrice:849.99,icon:'🧠',tags:['Copilot+ PC','16 GB RAM','1 TB SSD'],desc:'Tanjši sodoben prenosnik za produktivnost in vsakdan.'},
  {id:'pc3',cat:'racunalniki',name:'Gaming monitor 27” 144 Hz',price:279,oldPrice:329,icon:'🖥️',tags:['27 inch','144 Hz','IPS'],desc:'Prijeten gaming monitor z gladkim prikazom slike.'},
  {id:'pc4',cat:'racunalniki',name:'Mehanska tipkovnica RGB',price:109,oldPrice:139,icon:'⌨️',tags:['RGB','Hot-swap'],desc:'Natančna tipkovnica za gaming in pisanje.'},

  {id:'home1',cat:'bela-tehnika',name:'Bosch Series 6 pralni stroj 10 kg',price:699.99,oldPrice:799.99,image:'https://www.euronics.ee/UserFiles/Products/Images/430920-649239.avif',tags:['Bosch','10 kg','1400 rpm'],desc:'Kakovosten pralni stroj z i-DOS sistemom in hitrim programom.'},
  {id:'home2',cat:'bela-tehnika',name:'LG pralni stroj 9 kg',price:429.99,oldPrice:479.99,icon:'🧺',tags:['LG','9 kg','A razred'],desc:'Praktičen stroj za vsakdanjo uporabo in manjše prostore.'},
  {id:'home3',cat:'bela-tehnika',name:'Bosch hladilnik kombinirani',price:799,oldPrice:949,icon:'🧊',tags:['No Frost','XL'],desc:'Prostoren hladilnik za sodoben dom.'},
  {id:'home4',cat:'bela-tehnika',name:'Kavni aparat Aroma',price:259,oldPrice:319,icon:'☕',tags:['15 bar','Latte'],desc:'Za dober espresso in hitro pripravo domače kave.'}
];

const REVIEWS_KEY = 'mobilcek_reviews_v2';
const CART_KEY = 'mobilcek_cart_v2';
const COUPON_KEY = 'mobilcek_coupon_v2';
const MINIGAME_KEY = 'mobilcek_minigame_reward_v2';
const MINIGAME_SESSION_KEY = 'mobilcek_minigame_session_v3';
const MINIGAME_QUESTIONS = [
  {q:'Katera koda na tej strani ti da 25 % popusta v košarici?', options:['BONUS10','MOBILČEK2026','RTX5090NOW'], answer:1},
  {q:'Koliko stane prijavnina za dobrodelno nagradno igro?', options:['1 €','5 €','10 €'], answer:0},
  {q:'Katera glavna nagrada je izpostavljena na strani?', options:['PlayStation 5','iPhone 16 Pro','RTX 5090'], answer:2},
  {q:'V kateri kategoriji najdeš prenosnike in monitorje?', options:['Računalniki','Telefonija','Bela tehnika'], answer:0},
  {q:'Kje lahko oddaš svojo oceno trgovine?', options:['Na strani Recenzije','Samo v košarici','Samo po emailu'], answer:0},
  {q:'Za kaj so namenjena zbrana sredstva iz prijavnine?', options:['Za dobrodelne namene','Za poštnino','Za skrite stroške'], answer:0},
  {q:'Katera dodatna koda se odklene v mini igri?', options:['BONUS10','GAME50','SERVIS20'], answer:0},
  {q:'Katera kategorija vsebuje pralne stroje in hladilnike?', options:['Telefonija','Bela tehnika','Računalniki'], answer:1}
];
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
function getGameSession(){ return JSON.parse(localStorage.getItem(MINIGAME_SESSION_KEY) || '{"streak":0,"lastIndexes":[]}'); }
function setGameSession(data){ localStorage.setItem(MINIGAME_SESSION_KEY, JSON.stringify(data)); }
function pickQuestion(){
  const session = getGameSession();
  const used = new Set(session.lastIndexes || []);
  let pool = MINIGAME_QUESTIONS.map((q,index)=>({q,index})).filter(item=>!used.has(item.index));
  if(!pool.length){
    session.lastIndexes = [];
    setGameSession(session);
    pool = MINIGAME_QUESTIONS.map((q,index)=>({q,index}));
  }
  const picked = pool[Math.floor(Math.random()*pool.length)];
  session.lastIndexes = [...(session.lastIndexes || []), picked.index].slice(-5);
  setGameSession(session);
  return picked.q;
}
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
  const visual = p.image
    ? `<div class="product-image product-image-photo"><img src="${p.image}" alt="${p.name}" loading="lazy" referrerpolicy="no-referrer"></div>`
    : `<div class="product-image">${p.icon || '🛍️'}</div>`;
  return `<article class="product-card" id="${p.id}">
    ${visual}
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
      <div class="badge">Akcija</div>
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
      <button class="btn btn-primary" style="width:100%;margin-top:8px;" onclick="togglePaymentPreview()">Nadaljuj na plačilo</button>
      <div id="paymentPreview" class="payment-preview" hidden>
        <div class="small">Plačilni korak je prikazan kot demo. Uporabnik lahko nadaljuje do pregleda plačila, končnega nakupa pa ne more zaključiti.</div>
        <div class="payment-methods">
          <div class="payment-method"><span>Kartično plačilo</span><strong>Demo</strong></div>
          <div class="payment-method"><span>PayPal</span><strong>Demo</strong></div>
          <div class="payment-method"><span>Nakazilo</span><strong>Demo</strong></div>
        </div>
        <button class="btn btn-secondary disabled-checkout" style="width:100%;" disabled>Oddaj naročilo — onemogočeno v demo načinu</button>
      </div>
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
function togglePaymentPreview(){
  const preview = qs('#paymentPreview');
  if(!preview) return;
  if(!getCart().length) return toast('Košarica je prazna.', 'error');
  preview.hidden = !preview.hidden;
  if(!preview.hidden) toast('Prikazan je demo plačilni korak.', 'success');
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
  const wrap = qs('#questionGame');
  const result = qs('#gameResult');
  const streakEl = qs('#gameStreak');
  const nextBtn = qs('#nextQuestionBtn');
  const reward = getGameReward();
  const simpleChoices = qsa('.choice-btn');

  if(simpleChoices.length && result){
    if(reward) result.innerHTML = `<div class="notice success">Že imaš bonus kodo: <strong>${reward.code}</strong></div>`;
    simpleChoices.forEach(btn=>btn.addEventListener('click', ()=>{
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

  if(!wrap) return;

  const questionText = qs('#gameQuestion');
  const optionsWrap = qs('#gameOptions');
  const meta = qs('#gameQuestionMeta');

  function refreshStreak(){
    const session = getGameSession();
    if(streakEl) streakEl.textContent = session.streak || 0;
  }

  function renderQuestion(){
    const question = pickQuestion();
    wrap.dataset.answer = String(question.answer);
    if(questionText) questionText.textContent = question.q;
    if(meta) meta.textContent = 'Doseži 3 pravilne odgovore zapored in prejmi BONUS10.';
    optionsWrap.innerHTML = question.options.map((opt,index)=>`<button class="question-option" type="button" data-index="${index}">${opt}</button>`).join('');
    qsa('.question-option', optionsWrap).forEach(btn=>btn.addEventListener('click', ()=>{
      const selected = Number(btn.dataset.index);
      const session = getGameSession();
      const correct = selected === Number(wrap.dataset.answer);
      if(correct){
        const newSession = {...session, streak:(session.streak || 0) + 1};
        setGameSession(newSession);
        refreshStreak();
        if(newSession.streak >= 3){
          setGameReward({code:'BONUS10'});
          result.innerHTML = `<div class="notice success">Odlično. Zbral si 3 pravilne odgovore in odklenil kodo <strong>BONUS10</strong>.</div>`;
          meta.textContent = 'Koda BONUS10 je pripravljena za uporabo v košarici.';
          toast('Bonus koda BONUS10 je odklenjena.', 'success');
        } else {
          result.innerHTML = `<div class="notice success">Pravilno. Nadaljuj na naslednje vprašanje.</div>`;
          meta.textContent = `Še ${3 - newSession.streak} pravilnih odgovorov do nagrade.`;
        }
      } else {
        setGameSession({...session, streak:0});
        refreshStreak();
        result.innerHTML = `<div class="notice error">To ni pravilen odgovor. Niz se je ponastavil, vprašanja pa se bodo nadaljevala naprej.</div>`;
        meta.textContent = 'Poskusi znova in ponovno zgradi niz 3 pravilnih odgovorov.';
      }
    }));
  }

  nextBtn?.addEventListener('click', renderQuestion);
  refreshStreak();
  if(reward && result){
    result.innerHTML = `<div class="notice success">Že imaš bonus kodo: <strong>${reward.code}</strong>. Lahko še vedno igraš naprej.</div>`;
  }
  renderQuestion();
}

const QUOTES = [
  'Dobra ponudba ni glasna. Je jasna, poštena in hitra.',
  'Najboljša trgovina je tista, kjer uporabnik takoj ve, kaj klikniti.',
  'Preprost nakup je pogosto najbolj profesionalen nakup.',
  'Servis ni samo popravilo. Je občutek zaupanja.',
  'Lep UI naredi prvi vtis, poštene informacije pa zadržijo stranko.',
  'Košarica mora biti jasna, ne zapletena.',
  'Majhna izboljšava uporabniške izkušnje pogosto naredi največjo razliko.'
];

function rotateQuote(){
  const quote = QUOTES[Math.floor(Math.random() * QUOTES.length)];
  qsa('#quoteText, #quoteTextHome').forEach(el => { if(el) el.textContent = quote; });
}
function bindNewsletter(){
  qs('#newsletterForm')?.addEventListener('submit', e=>{
    e.preventDefault();
    const email = qs('#newsletterEmail')?.value?.trim();
    if(!email) return toast('Vpiši e-mail naslov.', 'error');
    toast('Prijava na e-novice je shranjena v demo načinu.', 'success');
    e.target.reset();
  });
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
  initReviews(); renderReviews(); bindReviewForm(); bindAdminPanel(); bindMinigame(); bindNewsletter(); rotateQuote(); setInterval(rotateQuote, 60000);
}
document.addEventListener('DOMContentLoaded', initCommon);
