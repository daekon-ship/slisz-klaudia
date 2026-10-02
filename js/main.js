/* ==========================================================================
   SLISZ KLAUDIA — V6 · editorial portfolio
   reveal-observer + finom parallax + mobilmenü · minden más a CSS-ben él
   ========================================================================== */
(() => {
  'use strict';

  const html = document.documentElement;

  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const motionOn = () => !reduce; /* az OS-beállítást tiszteljük, nincs külön kapcsoló */

  /* ---------- hero belépés ---------- */
  const hero = document.querySelector('.hero');
  if (hero) {
    requestAnimationFrame(() => requestAnimationFrame(() => hero.classList.add('is-in')));
  }

  /* ---------- reveal-observer ---------- */
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('is-in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: .12, rootMargin: '0px 0px -7% 0px' });
  document.querySelectorAll('.rv').forEach(el => io.observe(el));

  /* ---------- finom parallax a megjelölt kereteken ---------- */
  const frames = [...document.querySelectorAll('[data-plx]')];
  if (frames.length && motionOn() && matchMedia('(pointer:fine)').matches) {
    let ticking = false;
    const update = () => {
      ticking = false;
      const vh = innerHeight;
      for (const f of frames) {
        const amt = parseFloat(f.dataset.plx) || 30;
        const r = f.parentElement.getBoundingClientRect();
        if (r.bottom < -80 || r.top > vh + 80) continue;
        const progress = (r.top + r.height / 2 - vh / 2) / (vh / 2 + r.height / 2);
        f.style.transform = `translate3d(0, ${(-progress * amt).toFixed(1)}px, 0)`;
      }
    };
    addEventListener('scroll', () => {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    addEventListener('resize', () => { ticking = false; update(); }, { passive: true });
    update();
  }

  /* ---------- nav árnyék ---------- */
  const nav = document.getElementById('nav');
  let navTick = false;
  addEventListener('scroll', () => {
    if (navTick) return;
    navTick = true;
    requestAnimationFrame(() => {
      navTick = false;
      nav?.classList.toggle('is-scrolled', scrollY > 30);
    });
  }, { passive: true });

  /* ---------- mobilmenü ---------- */
  const burger = document.querySelector('.nav__burger');
  const menu = document.getElementById('menu');
  const setMenu = open => {
    document.body.classList.toggle('menu-open', open);
    burger?.setAttribute('aria-expanded', String(open));
    burger?.setAttribute('aria-label', open ? 'Menü bezárása' : 'Menü megnyitása');
    menu?.setAttribute('aria-hidden', String(!open));
  };
  burger?.addEventListener('click', () => setMenu(!document.body.classList.contains('menu-open')));
  menu?.addEventListener('click', e => { if (e.target.closest('a')) setMenu(false); });
  addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });
})();
