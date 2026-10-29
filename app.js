/* ==========================================================
   BOCADILLO A40 DE TÁNGER — Propuesta C «Puerta verde»
   La versión sencilla, sin librerías: fichas de bocadillos
   con su dibujo por capas, filtro y «qué lleva»; carta en
   pestañas; tira de fotos; vídeos; horario en directo y
   5 idiomas (datos.js + i18n.js).
   ========================================================== */
(() => {
'use strict';

const $  = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const STATIC = /[?&]static\b/.test(location.search);
const motion = !STATIC && !matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window;
document.documentElement.classList.toggle('no-motion', !motion);
const IMG = (f) => 'assets/img/' + f;
const { ING, BOC, MENU } = A40;
const loc = A40.L, T = A40.t;
const seeded = (s) => () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };

/* ---------- horario · martes a domingo 12–24, lunes cerrado ---------- */
const madrid = () => {
  const p = Object.fromEntries(new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Madrid', weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(new Date()).map((x) => [x.type, x.value]));
  return { d: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(p.weekday), m: +p.hour * 60 + +p.minute };
};
const paintLive = () => {
  const { d, m } = madrid();
  const open = d !== 1 && m >= 720;
  $$('[data-live]').forEach((el) => { el.classList.toggle('is-open', open); el.classList.toggle('is-closed', !open); $('[data-live-text]', el).textContent = T(open ? 'open' : d === 1 ? 'closedMon' : 'closedAm'); });
};
paintLive(); setInterval(paintLive, 30000); A40.on(paintLive);

const top = $('#top');
addEventListener('scroll', () => top.classList.toggle('is-scrolled', scrollY > 10), { passive: true });

/* ---------- aparición suave ---------- */
let io = null;
function reveal() {
  if (!motion) return;
  if (!io) io = new IntersectionObserver((ens) => ens.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); } }), { threshold: .12 });
  $$('[data-in]:not(.is-in)').forEach((el) => io.observe(el));
}

/* ---------- dibujo del bocadillo por capas ---------- */
const X0 = 20, X1 = 220, L = X1 - X0, OUT = '#1F2A24';
const H = { lechuga: 10, ensalada: 11, tomate: 9, cebolla: 7, cebmorada: 7, pimientos: 7, maiz: 6, aceitunas: 8, pollo: 13, ternera: 11, kefta: 14, salchicha: 13, gambas: 13, calamar: 11, sepia: 10, higado: 10, huevo: 10, remolacha: 7, zanahoria: 6 };
const row = (n, fn) => Array.from({ length: n }, (_, i) => fn(X0 + 4 + i * (L - 8) / n, (L - 8) / n)).join('');
const layer = (k, h, r) => {
  const c = ING[k].c;
  switch (k) {
    case 'lechuga': case 'ensalada': {
      let d = `M${X0 - 4} ${h * .5}`;
      for (let x = X0 + 6; x <= X1 + 4; x += 10) d += ` Q ${x - 5} ${-1 + r() * 3} ${x} ${h * .4}`;
      return `<path d="${d} L ${X1 + 4} ${h} L ${X0 - 4} ${h} Z" fill="#5DBB63" stroke="${OUT}" stroke-width="1.4" stroke-linejoin="round"/>` + (k === 'ensalada' ? row(7, (x) => `<rect x="${x + 6}" y="${h * .35}" width="7" height="${h * .45}" rx="2" fill="#D9483B"/>`) : '');
    }
    case 'tomate': return row(5, (x, w) => `<ellipse cx="${x + w / 2}" cy="${h / 2}" rx="${w / 2 - 1}" ry="${h / 2}" fill="${c}" stroke="${OUT}" stroke-width="1.3"/>`);
    case 'cebolla': case 'cebmorada': return row(9, (x, w) => `<ellipse cx="${x + w / 2}" cy="${h / 2}" rx="${w / 2}" ry="${h / 2 - .5}" fill="none" stroke="${k === 'cebolla' ? '#B9A6CC' : '#7A2E6C'}" stroke-width="2"/>`);
    case 'pimientos': return row(8, (x, w) => `<rect x="${x}" y="${r() * 2}" width="${w + 3}" height="${h - 2}" rx="${(h - 2) / 2}" fill="${r() > .5 ? '#D8432F' : '#3E9B4F'}" stroke="${OUT}" stroke-width="1.1"/>`);
    case 'maiz': return Array.from({ length: 34 }, () => `<circle cx="${X0 + 4 + r() * (L - 8)}" cy="${1.5 + r() * (h - 3)}" r="2" fill="${c}" stroke="${OUT}" stroke-width=".7"/>`).join('');
    case 'aceitunas': return row(10, (x, w) => `<circle cx="${x + w / 2}" cy="${h / 2}" r="${h / 2}" fill="${r() > .5 ? '#2E2B20' : '#6F7D2C'}" stroke="${OUT}" stroke-width="1"/><circle cx="${x + w / 2}" cy="${h / 2}" r="1.4" fill="#C8332B"/>`);
    case 'remolacha': return Array.from({ length: 22 }, () => { const x = X0 + 4 + r() * (L - 12), y = r() * (h - 5); return `<rect x="${x}" y="${y}" width="5" height="5" rx="1" fill="${c}" stroke="${OUT}" stroke-width=".7"/>`; }).join('');
    case 'zanahoria': return Array.from({ length: 30 }, () => { const x = X0 + 4 + r() * (L - 20), y = 1 + r() * (h - 2); return `<path d="M${x} ${y} l 12 ${(r() - .5) * 3}" stroke="${c}" stroke-width="2" stroke-linecap="round"/>`; }).join('');
    case 'huevo': return row(5, (x, w) => `<ellipse cx="${x + w / 2}" cy="${h / 2}" rx="${w / 2 - 1}" ry="${h / 2}" fill="#FFF8E6" stroke="${OUT}" stroke-width="1.2"/><ellipse cx="${x + w / 2}" cy="${h / 2 + .5}" rx="${w / 5}" ry="${h / 3}" fill="#F5B92E"/>`);
    case 'gambas': return row(6, (x, w) => { const rr = h * .42, cx = x + w / 2, cy = h * .55; return `<path d="M${cx - rr} ${cy} A ${rr} ${rr} 0 1 1 ${cx + rr * .2} ${cy + rr * .9}" fill="none" stroke="${OUT}" stroke-width="${h * .42 + 2}" stroke-linecap="round"/><path d="M${cx - rr} ${cy} A ${rr} ${rr} 0 1 1 ${cx + rr * .2} ${cy + rr * .9}" fill="none" stroke="${c}" stroke-width="${h * .42}" stroke-linecap="round"/>`; });
    case 'calamar': return row(8, (x, w) => `<ellipse cx="${x + w / 2}" cy="${h / 2}" rx="${w / 2 - 1}" ry="${h / 2 - 1.5}" fill="none" stroke="${OUT}" stroke-width="5"/><ellipse cx="${x + w / 2}" cy="${h / 2}" rx="${w / 2 - 1}" ry="${h / 2 - 1.5}" fill="none" stroke="${c}" stroke-width="3"/>`);
    case 'salchicha': return [[X0, 96], [X0 + 100, 100]].map(([x, w]) => `<rect x="${x}" y="0" width="${w}" height="${h}" rx="${h / 2}" fill="${c}" stroke="${OUT}" stroke-width="1.4"/>`).join('');
    case 'kefta': return row(4, (x, w) => `<rect x="${x}" y="0" width="${w - 3}" height="${h}" rx="${h / 2}" fill="${c}" stroke="${OUT}" stroke-width="1.4"/><circle cx="${x + w * .3}" cy="${h * .4}" r="1.2" fill="#7BC24E"/><circle cx="${x + w * .6}" cy="${h * .6}" r="1.2" fill="#7BC24E"/>`);
    default: return row(k === 'pollo' ? 6 : 5, (x, w) => `<rect x="${x}" y="${r() * 2}" width="${w + 2}" height="${h - 2}" rx="${k === 'sepia' ? 3 : 5}" fill="${c}" stroke="${OUT}" stroke-width="1.3"/>`);
  }
};
const sandwich = (b, seed) => {
  const r = seeded(seed + 7), keys = b.ings.filter((k) => k !== 'salsa');
  let y = 90, body = '';
  keys.forEach((k) => { const h = H[k]; y -= h * .78; body += `<g transform="translate(0 ${y.toFixed(1)})">${layer(k, h, r)}</g>`; });
  let zig = `M${X0 + 6} ${y + 1}`;
  for (let x = X0 + 16, up = true; x <= X1 - 6; x += 12, up = !up) zig += ` L ${x} ${y + (up ? -3 : 3)}`;
  const top = y - 4;
  return `<svg viewBox="0 0 240 120" aria-hidden="true">
    <ellipse cx="120" cy="113" rx="104" ry="5" fill="${OUT}" opacity=".12"/>
    <path d="M${X0 + 6} 90 H ${X1 - 6} Q ${X1 + 4} 90 ${X1} 98 Q ${X1 - 6} 108 ${X1 - 30} 108 H ${X0 + 30} Q ${X0 + 6} 108 ${X0} 98 Q ${X0 - 4} 90 ${X0 + 6} 90 Z" fill="#E2A458" stroke="${OUT}" stroke-width="1.6"/>
    ${body}
    <path d="${zig}" fill="none" stroke="${OUT}" stroke-width="5" stroke-linejoin="round" stroke-linecap="round"/><path d="${zig}" fill="none" stroke="#F2B36B" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>
    <g transform="translate(0 ${top.toFixed(1)})"><path d="M${X0 - 2} 0 Q ${X0 - 6} -22 ${X0 + 20} -32 Q 120 -50 ${X1 - 20} -32 Q ${X1 + 6} -22 ${X1 + 2} 0 Z" fill="#E2A458" stroke="${OUT}" stroke-width="1.6"/>
    ${[0, 1, 2, 3].map((i) => `<path d="M${X0 + 30 + i * 42} -20 q 14 -16 30 -9" fill="none" stroke="#FFD08A" stroke-width="4" stroke-linecap="round"/>`).join('')}</g>
  </svg>`;
};

/* ---------- fichas de bocadillos ---------- */
(() => {
  const cards = $('#cards'), filters = $('#filters');
  const CATS = ['all', 'carne', 'pollo', 'mar', 'veg'];
  let cat = 'all';
  const paintFilters = () => { filters.innerHTML = CATS.map((c) => `<button type="button" data-c="${c}" aria-pressed="${c === cat}">${T('f.' + c)}</button>`).join(''); };
  const paint = () => {
    const open = new Set($$('.card.is-open', cards).map((c) => c.dataset.id));
    cards.innerHTML = BOC.map((b, i) => {
      const ks = b.ings.filter((k) => k !== 'salsa').concat('salsa');
      return `<li class="card${open.has(b.id) ? ' is-open' : ''}" data-id="${b.id}" data-cat="${b.cat}"${motion ? ' data-in' : ''}>
        <button class="card__btn" type="button" aria-expanded="${open.has(b.id)}" aria-controls="det-${b.id}">
          <span class="card__pic">${sandwich(b, i * 31)}${b.board ? `<span class="card__board">${T('pizarra')}</span>` : ''}</span>
          <span class="card__top"><h3>${loc(b.n)}</h3><span class="card__p">${A40.eur(b.p)}</span></span>
          <ul class="card__ings">${ks.map((k) => `<li style="--c:${ING[k].c}"><i></i>${loc(ING[k].s || ING[k].n)}</li>`).join('')}</ul>
          <span class="card__more">${T('boc.more')}</span>
        </button>
        <div class="card__det" id="det-${b.id}"><div>
          <p>${loc(b.d)}</p>
          <ul>${ks.map((k) => `<li><b>${loc(ING[k].n)}</b> · ${loc(ING[k].note)}</li>`).join('')}${b.tip ? `<li class="tip">${loc(b.tip)}</li>` : ''}</ul>
        </div></div>
      </li>`;
    }).join('');
    filter();
    reveal();
  };
  const filter = () => $$('.card', cards).forEach((c) => c.classList.toggle('is-hidden', cat !== 'all' && !c.dataset.cat.split(' ').includes(cat)));
  filters.addEventListener('click', (e) => { const b = e.target.closest('button'); if (!b) return; cat = b.dataset.c; $$('button', filters).forEach((x) => x.setAttribute('aria-pressed', x === b)); filter(); });
  cards.addEventListener('click', (e) => {
    const b = e.target.closest('.card__btn'); if (!b) return;
    const c = b.closest('.card'), o = !c.classList.contains('is-open');
    c.classList.toggle('is-open', o); b.setAttribute('aria-expanded', o);
  });
  paintFilters(); paint();
  A40.on(() => { paintFilters(); paint(); });
})();

/* ---------- carta en pestañas ---------- */
(() => {
  const tabs = $('#tabs');
  let cur = 0;
  const paintTabs = () => { tabs.innerHTML = MENU.map((m, i) => `<button type="button" role="tab" id="tab-${m.id}" aria-selected="${i === cur}" aria-controls="panel" tabindex="${i === cur ? 0 : -1}" data-i="${i}">${loc(m.n)}</button>`).join(''); };
  const show = (i) => {
    cur = i;
    const m = MENU[i];
    $$('button', tabs).forEach((b, k) => { b.setAttribute('aria-selected', k === i); b.tabIndex = k === i ? 0 : -1; });
    $('#panel').setAttribute('aria-labelledby', 'tab-' + m.id);
    $('#panelSub').textContent = loc(m.sub);
    $('#panelList').innerHTML = m.items.map((it) => `<li><b>${loc(it.n)}${it.nuevo ? `<span class="tag tag--new">${T('nuevo')}</span>` : ''}${it.board ? `<span class="tag tag--board">${T('pizarra')}</span>` : ''}</b><span class="pr">${A40.eur(it.p)}</span>${it.d ? `<p>${loc(it.d)}</p>` : ''}</li>`).join('');
  };
  tabs.addEventListener('click', (e) => { const b = e.target.closest('button'); if (b) show(+b.dataset.i); });
  tabs.addEventListener('keydown', (e) => {
    const k = { ArrowRight: 1, ArrowLeft: -1 }[e.key]; if (!k) return;
    const n = (cur + (A40.rtl ? -k : k) + MENU.length) % MENU.length;
    show(n); $$('button', tabs)[n].focus();
  });
  paintTabs(); show(0);
  A40.on(() => { paintTabs(); show(cur); });
  $('#openCarta').addEventListener('click', () => openLB(IMG('carta-impresa.jpg'), T('carta.printCap')));
})();

/* ---------- tira de fotos ---------- */
(() => {
  const strip = $('#strip'), F = A40.SITE.fotos;
  strip.innerHTML = F.map(([f], i) => `<li><button type="button" data-i="${i}"><span class="ph"><img src="${IMG(f)}" alt="" loading="lazy"></span><span class="cap"></span></button></li>`).join('');
  const caps = () => $$('li', strip).forEach((li, i) => { const t = loc(F[i][1]); $('.cap', li).textContent = t; $('img', li).alt = t; });
  caps(); A40.on(caps);
  strip.addEventListener('click', (e) => { const b = e.target.closest('button'); if (b) openLB(IMG(F[+b.dataset.i][0]), loc(F[+b.dataset.i][1])); });
  const step = () => ($('li', strip).offsetWidth + 14) * 2;
  $('#fPrev').addEventListener('click', () => strip.scrollBy({ left: -step(), behavior: motion ? 'smooth' : 'auto' }));
  $('#fNext').addEventListener('click', () => strip.scrollBy({ left: step(), behavior: motion ? 'smooth' : 'auto' }));
})();

/* ---------- vídeos ---------- */
(() => {
  if (STATIC || !('IntersectionObserver' in window)) return;
  const io = new IntersectionObserver((ens) => ens.forEach((en) => {
    const v = en.target;
    if (en.isIntersecting) { if (!v.src) v.src = v.dataset.src; const p = v.play(); if (p) p.catch(() => {}); } else v.pause();
  }), { threshold: .35 });
  $$('.vid video').forEach((v) => io.observe(v));
})();

if (motion) { $$('.head, .carta__card, .ops__row blockquote, .donde__info, .donde__map, .vid').forEach((el) => el.setAttribute('data-in', '')); reveal(); }

/* ---------- lightbox ---------- */
function openLB(src, cap) {
  const lb = $('#lb');
  $('#lbImg').src = src; $('#lbImg').alt = cap; $('#lbCap').textContent = cap;
  lb.hidden = false; $('.lb__x', lb).focus();
}
const closeLB = () => { $('#lb').hidden = true; };
$('#lb').addEventListener('click', (e) => { if (e.target.id === 'lb' || e.target.closest('.lb__x')) closeLB(); });
addEventListener('keydown', (e) => { if (e.key === 'Escape' && !$('#lb').hidden) closeLB(); });

A40.start();
})();
