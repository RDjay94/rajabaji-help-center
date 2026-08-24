/* =========================================================
   Rajabaji Help Center — SPA logic
   ========================================================= */
(function(){
  const C = window.RB_CONTENT;
  const app = document.getElementById('app');
  const state = { lang: localStorage.getItem('rb_lang') || 'bn', cat: 'all', q: '' };

  /* ---------- Icons ---------- */
  const ICONS = {
    'user-plus':'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M19 8v6M22 11h-6"/>',
    'wallet':'<path d="M19 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H5a2 2 0 0 1-2-2V5"/><path d="M3 5v14a2 2 0 0 0 2 2h14a1 1 0 0 0 1-1v-4"/><circle cx="16" cy="12" r="1"/>',
    'cash':'<rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/><path d="M6 12h.01M18 12h.01"/>',
    'key':'<circle cx="7.5" cy="15.5" r="4.5"/><path d="m10.5 12.5 8-8M17 6l2 2M15 8l2 2"/>',
    'play':'<circle cx="12" cy="12" r="10"/><path d="m10 8 6 4-6 4V8z" fill="currentColor" stroke="none"/>',
    'gift':'<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7"/><path d="M12 8S9.5 3 7 4.5 9 8 12 8zM12 8s2.5-5 5-3.5S15 8 12 8z"/>',
    'arrow':'<path d="M5 12h14M13 6l6 6-6 6"/>',
    'back':'<path d="M19 12H5M11 18l-6-6 6-6"/>',
    'play-sm':'<circle cx="12" cy="12" r="10"/><path d="m10 8 6 4-6 4V8z" fill="currentColor" stroke="none"/>',
    'clock':'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    'dl':'<path d="M12 3v11"/><path d="m7.5 9.5 4.5 4.5 4.5-4.5"/><path d="M5 20h14"/>',
    'tri':'<path d="M8 5v14l11-7z" fill="currentColor" stroke="none"/>',
    'chat':'<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>',
    'telegram':'<path d="M21.9 5.2 18.7 19c-.2.9-.8 1.1-1.6.7l-4.3-3.2-2.1 2c-.2.2-.4.4-.9.4l.3-4.4L18 6.6c.3-.3-.1-.5-.5-.2L7.2 13 3 11.7c-.9-.3-.9-.9.2-1.3l17.4-6.7c.8-.3 1.5.2 1.3 1.5z" fill="currentColor" stroke="none"/>',
    'facebook':'<path d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.25-1.5 1.55-1.5H17V3.6c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.1H7.6V13h2.7v8z" fill="currentColor" stroke="none"/>'
  };
  const svg = (n,s=2)=>`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${s}" stroke-linecap="round" stroke-linejoin="round">${ICONS[n]||''}</svg>`;

  const t = k => (C.ui[state.lang] && C.ui[state.lang][k]) || C.ui.en[k] || k;
  const BN_DIGITS = ['০','১','২','৩','৪','৫','৬','৭','৮','৯'];
  const num = n => state.lang==='bn' ? String(n).replace(/\d/g,d=>BN_DIGITS[d]) : String(n);
  const catName = id => { const c = C.categories.find(x=>x.id===id); return c ? c[state.lang] : id; };

  /* ---------- CTA helpers ---------- */
  const L = C.links;
  const ext = 'target="_blank" rel="noopener noreferrer"';
  function dlInner(sub){
    return `<span class="cta-btn__sheen"></span>
      <span class="cta-btn__ico">${svg('dl',2.4)}</span>
      <span class="cta-btn__txt"><b>${t('downloadApp')}</b>${sub?`<i>${t('downloadSub')}</i>`:''}</span>`;
  }
  function playInner(sub){
    return `<span class="cta-btn__sheen"></span>
      <span class="cta-btn__ico">${svg('tri',0)}</span>
      <span class="cta-btn__txt"><b>${t('playNow')}</b>${sub?`<i>${t('playSub')}</i>`:''}</span>`;
  }
  function ctaGifs(){
    return `<a class="cta-btn cta-btn--download" href="${L.download}" ${ext} aria-label="${t('downloadApp')}">${dlInner(true)}</a>
      <a class="cta-btn cta-btn--play" href="${L.play}" ${ext} aria-label="${t('playNow')}">${playInner(true)}</a>`;
  }
  function socialBtns(){
    return `<a class="social-btn chat" href="${L.liveChat}" ${ext}>${svg('chat',2)}<span>${t('liveChat')}</span></a>
      <a class="social-btn tg" href="${L.telegram}" ${ext}>${svg('telegram',2)}<span>${t('telegram')}</span></a>
      <a class="social-btn fb" href="${L.facebook}" ${ext}>${svg('facebook',2)}<span>${t('facebook')}</span></a>`;
  }
  function ctaBand(){
    return `<section class="cta-band reveal">
      <span class="cta-glow"></span>
      <h2>${t('ctaHeading')}</h2>
      <p>${t('ctaSub')}</p>
      <div class="cta-gifs">${ctaGifs()}</div>
      <div class="cta-socials"><span class="cta-follow">${t('followUs')}</span><div class="cta-social-row">${socialBtns()}</div></div>
    </section>`;
  }

  /* ---------- Router ---------- */
  function route(){
    const h = location.hash.replace(/^#\/?/,'');
    if(h.startsWith('g/')){ renderArticle(h.slice(2)); }
    else { renderHome(); }
    window.scrollTo({top:0,behavior:'auto'});
    observeReveal();
  }

  /* ---------- Home ---------- */
  function renderHome(){
    const list = C.tutorials.filter(tut=>{
      const okCat = state.cat==='all' || tut.category===state.cat;
      const hay = (tut.en.title+' '+tut.bn.title+' '+tut.en.summary+' '+tut.bn.summary).toLowerCase();
      const okQ = !state.q || hay.includes(state.q.toLowerCase());
      return okCat && okQ;
    });

    const chips = [{id:'all',label:t('filterAll')}]
      .concat(C.categories.map(c=>({id:c.id,label:c[state.lang]})))
      .map(c=>`<button class="chip ${state.cat===c.id?'active':''}" data-cat="${c.id}">${c.label}</button>`).join('');

    const cards = list.map((tut,i)=>{
      const d = tut[state.lang];
      return `<a class="card reveal" style="transition-delay:${i*60}ms" href="#/g/${tut.id}">
        <span class="glow"></span>
        <span class="ic">${svg(tut.icon)}</span>
        <h3>${d.title}</h3>
        <p>${d.summary}</p>
        <div class="meta">
          <span class="pill cat">${catName(tut.category)}</span>
          <span class="pill">${svg('clock',2)}<span style="margin-left:2px">${num(tut.duration)} ${t('min')}</span></span>
          <span class="pill">${num(tut.steps.length)} ${t('steps')}</span>
        </div>
        <span class="go">${t('watch')} ${svg('arrow',2.2)}</span>
      </a>`;
    }).join('') || `<p style="color:var(--muted)">${t('notFound')}</p>`;

    app.innerHTML = `<div class="view">
      <section class="hero wrap">
        <span class="kicker"><span class="dot"></span>${t('heroKicker')}</span>
        <h1>${heroTitleHTML()}</h1>
        <p>${t('heroSub')}</p>
        <div class="cta cta-hero-gifs">${ctaGifs()}</div>
        <a class="hero-browse" href="#guides">${t('heroCta')} ${svg('arrow',2.3)}</a>
      </section>
      <section class="wrap" id="guides">
        <div class="sec-head">
          <div><h2>${t('sectionTitle')}</h2><p>${t('sectionSub')}</p></div>
          <div class="filters">${chips}</div>
        </div>
        <div class="grid">${cards}</div>
        ${ctaBand()}
      </section>
    </div>`;

    app.querySelectorAll('.chip').forEach(ch=>ch.addEventListener('click',()=>{
      state.cat = ch.dataset.cat; renderHome(); observeReveal();
    }));
  }

  function heroTitleHTML(){
    // highlight last two words in green for both languages
    const s = t('heroTitle').trim().split(' ');
    if(s.length<3) return `<span class="hl">${t('heroTitle')}</span>`;
    const tail = s.splice(-2).join(' ');
    return `${s.join(' ')} <span class="hl">${tail}</span>`;
  }

  /* ---------- Article ---------- */
  function renderArticle(id){
    const tut = C.tutorials.find(x=>x.id===id);
    if(!tut){ app.innerHTML = `<div class="view wrap article"><p>${t('notFound')}</p><a class="btn btn-ghost" href="#/" style="margin-top:20px">${svg('back',2)} ${t('backToGuides')}</a></div>`; return; }
    const d = tut[state.lang];
    // tut.video is either one file for both languages, or {en,bn} language cuts
    const videoSrc = (typeof tut.video === 'string') ? tut.video
                   : (tut.video[state.lang] || tut.video.en);
    const firstImg = tut.steps[0].img;
    const coverBg = `assets/img/steps/${tut.id}/_raw/${firstImg}`;   // clean, un-annotated frame
    const coverFallback = `assets/img/steps/${tut.id}/${firstImg}`;

    const steps = tut.steps.map((st,i)=>{
      const s = st[state.lang];
      return `<div class="step reveal">
        <div class="num">${num(i+1)}</div>
        <div class="body">
          <div class="shot"><img loading="lazy" src="assets/img/steps/${tut.id}/${st.img}" alt="${t('stepLabel')} ${i+1}"></div>
          <div class="txt"><h3>${s.title}</h3><p>${s.desc}</p></div>
        </div>
      </div>`;
    }).join('');

    const related = C.tutorials.filter(x=>x.id!==tut.id && x.category===tut.category).slice(0,3);
    const relatedHTML = related.length ? `<section class="related wrap">
        <h2>${t('relatedTitle')}</h2>
        <div class="grid">${related.map(r=>{const rd=r[state.lang];return `<a class="card" href="#/g/${r.id}">
          <span class="glow"></span><span class="ic">${svg(r.icon)}</span>
          <h3>${rd.title}</h3><p>${rd.summary}</p>
          <span class="go">${t('watch')} ${svg('arrow',2.2)}</span></a>`;}).join('')}</div>
      </section>` : '';

    app.innerHTML = `<div class="view wrap article">
      <a class="back" href="#/">${svg('back',2)} ${t('backToGuides')}</a>
      <div class="art-head">
        <span class="ic">${svg(tut.icon)}</span>
        <div>
          <div class="cat">${catName(tut.category)}</div>
          <h1>${d.title}</h1>
          <p class="intro">${d.intro}</p>
        </div>
      </div>

      <div class="video-card">
        <video id="tutVideo" controls preload="metadata" playsinline poster="${coverFallback}">
          <source src="${videoSrc}" type="video/mp4">
        </video>
        <button class="video-cover" id="videoCover" type="button" aria-label="${t('watchNow')}">
          <img class="cover-bg" src="${coverBg}" onerror="this.onerror=null;this.src='${coverFallback}'" alt="">
          <span class="cover-scrim"></span>
          <span class="cover-inner">
            <span class="cover-kicker">${svg('play-sm',2)} ${t('videoTag')}</span>
            <span class="cover-title">${d.title}</span>
            <span class="cover-play"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.5v13a1 1 0 0 0 1.5.86l11-6.5a1 1 0 0 0 0-1.72l-11-6.5A1 1 0 0 0 8 5.5z"/></svg></span>
            <span class="cover-sub">${num(tut.duration)} ${t('min')} &middot; ${t('watchNow')}</span>
          </span>
        </button>
      </div>
      <p class="video-note">${svg('play-sm',2)} ${t('videoNote')}</p>

      <div class="steps-head"><h2>${t('stepsTitle')}</h2></div>
      <div class="steps">${steps}</div>

      ${ctaBand()}
      ${relatedHTML}
    </div>`;

    // custom thumbnail → play
    const cover = document.getElementById('videoCover');
    const vid = document.getElementById('tutVideo');
    if (cover && vid) {
      cover.addEventListener('click', () => {
        cover.classList.add('hide');
        vid.play().catch(()=>{});
        setTimeout(() => { cover.style.display = 'none'; }, 450);
      });
    }
  }

  /* ---------- Reveal on scroll ---------- */
  let io;
  function observeReveal(){
    if(io) io.disconnect();
    io = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
    },{threshold:.12, rootMargin:'0px 0px -40px 0px'});
    document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
  }

  /* ---------- Persistent chrome (footer + floating rail) ---------- */
  function renderChrome(){
    const fs = document.getElementById('footerSocial');
    if (fs) fs.innerHTML = `<div class="footer-cta">${ctaGifs()}</div>
      <div class="footer-social">${socialBtns()}</div>`;
    const rail = document.getElementById('socialRail');
    if (rail) rail.innerHTML = `
      <a class="rail-btn chat" href="${L.liveChat}" ${ext} title="${t('liveChat')}" aria-label="${t('liveChat')}">${svg('chat',2)}</a>
      <a class="rail-btn tg" href="${L.telegram}" ${ext} title="${t('telegram')}" aria-label="${t('telegram')}">${svg('telegram',2)}</a>
      <a class="rail-btn fb" href="${L.facebook}" ${ext} title="${t('facebook')}" aria-label="${t('facebook')}">${svg('facebook',2)}</a>`;
    const np = document.getElementById('navPlay');
    if (np){ np.href = L.play; np.setAttribute('aria-label', t('playNow')); np.innerHTML = playInner(false); }
  }

  /* ---------- Language ---------- */
  function applyLang(){
    document.documentElement.setAttribute('lang', state.lang==='bn'?'bn':'en');
    document.documentElement.setAttribute('data-lang', state.lang);
    const lt = document.getElementById('langToggle');
    lt.setAttribute('data-lang', state.lang);
    lt.querySelectorAll('button').forEach(b=>b.classList.toggle('active', b.dataset.l===state.lang));
    document.getElementById('brandTag').textContent = t('brandTag');
    document.getElementById('footerNote').textContent = t('footerNote');
    document.getElementById('searchInput').placeholder = t('searchPlaceholder');
    document.title = state.lang==='bn' ? 'রাজাবাজি হেল্প সেন্টার' : 'Rajabaji Help Center';
    renderChrome();
  }
  function setLang(l){
    state.lang = l; localStorage.setItem('rb_lang', l);
    applyLang(); route();
  }
  document.getElementById('langToggle').addEventListener('click',e=>{
    const b = e.target.closest('button'); if(b) setLang(b.dataset.l);
  });

  /* ---------- Search ---------- */
  const si = document.getElementById('searchInput');
  si.addEventListener('input',()=>{
    state.q = si.value;
    if(!location.hash || location.hash==='#/' || !location.hash.includes('g/')){ renderHome(); observeReveal(); }
    else { location.hash = '#/'; }
  });

  /* ---------- Nav / scroll fx ---------- */
  const nav = document.getElementById('nav');
  const progress = document.getElementById('progress');
  const toTop = document.getElementById('toTop');
  window.addEventListener('scroll',()=>{
    const st = window.scrollY;
    const h = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = (h>0? (st/h*100):0)+'%';
    nav.classList.toggle('scrolled', st>10);
    toTop.classList.toggle('show', st>600);
  },{passive:true});
  toTop.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
  document.getElementById('brandBtn').addEventListener('click',()=>{ location.hash='#/'; });

  /* ---------- Music ---------- */
  const audio = document.getElementById('ambient');
  const musicBtn = document.getElementById('musicBtn');
  audio.volume = 0.35;
  musicBtn.addEventListener('click',()=>{
    if(audio.paused){ audio.play().then(()=>musicBtn.classList.add('playing')).catch(()=>{}); }
    else { audio.pause(); musicBtn.classList.remove('playing'); }
  });

  /* ---------- Boot ---------- */
  window.addEventListener('hashchange', route);
  applyLang();
  route();
})();
