/* ============================================================
   SLISZ KLAUDIA — interakciók
   Reveal / parallax / nav / progress / magnetic — teljesítménytudatosan
   ============================================================ */
(() => {
  'use strict';

  /* Mozgás-kezelés: OS preferencia + felhasználói toggle (perzisztens).
     A "Windows ablakanimáció kikapcsolva" állapot (MinAnimate=0) ugyanúgy
     prefers-reduced-motion: reduce-t ad — ezért lehet minden animációt bekapcsolni. */
  const root = document.documentElement;
  const osReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const userMotionOff = root.classList.contains('motion-off'); // head-ben állítva localStorage-ból
  const motionEnabled = !userMotionOff;                        // alap: BE, kivéve explicit off
  if (motionEnabled && osReduced) root.classList.add('motion-keep');
  const prefersReduced = !motionEnabled;
  const finePointer = window.matchMedia('(pointer: fine)').matches;

  // Toggle gomb (footer)
  const motionBtn = document.querySelector('[data-motion-toggle]');
  if (motionBtn) {
    const setBtn = () => {
      const off = root.classList.contains('motion-off');
      motionBtn.textContent = off ? 'Mozgás: ki' : 'Mozgás: be';
      motionBtn.setAttribute('aria-pressed', String(!off));
    };
    setBtn();
    motionBtn.addEventListener('click', () => {
      root.classList.toggle('motion-off');
      const off = root.classList.contains('motion-off');
      try { localStorage.setItem('sk-motion', off ? 'off' : 'on'); } catch (e) {}
      setBtn();
      if (!off) location.reload(); // bekapcsoláskor tiszta animációs állapot
    });
  }

  /* ---------- 0. Hero: karakter-szintű szóreveal ---------- */
  const splitWords = document.querySelectorAll('[data-split]');
  if (splitWords.length && !prefersReduced) {
    splitWords.forEach((w) => {
      const text = w.textContent;
      w.textContent = '';
      [...text].forEach((ch) => {
        if (ch === ' ') {
          const sp = document.createElement('span');
          sp.className = 'ch ch--space';
          sp.innerHTML = '&nbsp;';
          w.appendChild(sp);
        } else {
          const s = document.createElement('span');
          s.className = 'ch';
          s.textContent = ch;
          w.appendChild(s);
        }
      });
      // staggelt késleltetés karakterenként, szavankénti bázissal
      const base = [...document.querySelectorAll('[data-split]')].indexOf(w) * 0.12;
      [...w.children].forEach((c, i) => { c.style.transitionDelay = `${(base + i * 0.035).toFixed(3)}s`; });
    });
  }

  /* ---------- 0b. Hero por-részecskék (canvas) ---------- */
  const dustCanvas = document.querySelector('.hero__dust');
  if (dustCanvas && !prefersReduced) {
    const ctx = dustCanvas.getContext('2d');
    let w = 0, h = 0, dpr = Math.min(window.devicePixelRatio || 1, 2), particles = [];
    const COUNT = window.innerWidth < 700 ? 26 : 55;
    const resize = () => {
      w = dustCanvas.clientWidth; h = dustCanvas.clientHeight;
      dustCanvas.width = w * dpr; dustCanvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize, { passive: true });
    for (let i = 0; i < COUNT; i++) {
      particles.push({
        x: Math.random() * (w || 800), y: Math.random() * (h || 600),
        r: Math.random() * 1.7 + .5,
        vx: (Math.random() - .5) * .16, vy: -(Math.random() * .22 + .06),
        a: Math.random() * .5 + .15, tw: Math.random() * Math.PI * 2
      });
    }
    let dustVisible = true;
    const dustIo = new IntersectionObserver(([e]) => { dustVisible = e.isIntersecting; }, { threshold: 0 });
    dustIo.observe(dustCanvas);
    (function tick(t) {
      requestAnimationFrame(tick);
      if (!dustVisible) return;
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.x += p.vx; p.y += p.vy; p.tw += .02;
        if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w; }
        if (p.x < -10) p.x = w + 10; else if (p.x > w + 10) p.x = -10;
        const alpha = p.a * (0.6 + 0.4 * Math.sin(p.tw));
        ctx.beginPath();
        ctx.fillStyle = `rgba(233,211,163,${alpha.toFixed(3)})`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
    })(0);
  }

  /* ---------- 0c. Cursor fény ---------- */
  const glow = document.querySelector('.cursor-glow');
  if (glow && finePointer && !prefersReduced) {
    let gx = 0, gy = 0, tx = 0, ty = 0, raf = null;
    const follow = () => {
      gx += (tx - gx) * 0.12; gy += (ty - gy) * 0.12;
      glow.style.transform = `translate(${gx}px, ${gy}px)`;
      if (Math.abs(tx - gx) > .3 || Math.abs(ty - gy) > .3) raf = requestAnimationFrame(follow);
      else raf = null;
    };
    window.addEventListener('pointermove', (e) => {
      tx = e.clientX; ty = e.clientY;
      glow.classList.add('is-on');
      if (!raf) raf = requestAnimationFrame(follow);
    }, { passive: true });
    document.addEventListener('mouseleave', () => glow.classList.remove('is-on'));
  }

  /* ---------- 1. Reveal (scroll) ---------- */
  const revealables = document.querySelectorAll('.rv, .rv--img, [data-rv-lines]');
  if ('IntersectionObserver' in window && !prefersReduced) {
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      }
    }, { threshold: 0.18, rootMargin: '0px 0px -6% 0px' });
    revealables.forEach((el) => io.observe(el));
  } else {
    revealables.forEach((el) => el.classList.add('is-in'));
  }

  /* ---------- 2. Hero belépő ---------- */
  const hero = document.getElementById('hero');
  if (hero) requestAnimationFrame(() => hero.classList.add('is-in'));

  /* ---------- 3. Nav: scrolled állapot + aktív link ---------- */
  const nav = document.getElementById('nav');
  const progress = document.querySelector('.progress');
  const totop = document.querySelector('.totop');

  const navLinks = [...document.querySelectorAll('.nav__link')];
  const sections = navLinks
    .map((a) => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);

  const sectionIo = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      navLinks.forEach((a) =>
        a.classList.toggle('is-active', a.getAttribute('href') === `#${e.target.id}`)
      );
    }
  }, { rootMargin: '-40% 0px -55% 0px' });
  sections.forEach((s) => sectionIo.observe(s));

  /* ---------- 4. Scroll tick: progress, nav, totop, parallax ---------- */
  const parallaxEls = [...document.querySelectorAll('[data-parallax]')]
    .map((host) => ({ host, el: host.querySelector('.hero__bg, .wow__bg'), f: parseFloat(host.dataset.parallax) || 0.2 }))
    .filter((p) => p.el);

  const wow = document.querySelector('.wow');
  const wowBg = wow ? wow.querySelector('.wow__bg') : null;
  const ghost = document.querySelector('.wow__ghost');

  let ticking = false;
  let lastParallax = -1;

  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      const vh = window.innerHeight;
      const max = document.documentElement.scrollHeight - vh;

      nav.classList.toggle('is-scrolled', y > 24);
      totop.classList.toggle('is-show', y > vh * 0.9);

      if (progress) {
        const p = max > 0 ? Math.min(y / max, 1) : 0;
        progress.style.transform = `scaleX(${p})`;
      }

      // Parallax csak desktopon, finom egérrel és csökkentett mozgás nélkül
      const allowParallax = !prefersReduced && finePointer && window.innerWidth > 900;
      if (allowParallax) {
        let changed = false;
        for (const p of parallaxEls) {
          const rect = p.host.getBoundingClientRect();
          if (rect.bottom > 0 && rect.top < vh) {
            const offset = Math.round(-rect.top * p.f);
            if (p.el._px !== offset) { p.el._px = offset; changed = true; }
            p.el.style.setProperty('--parallax', `${offset}px`);
          }
        }
        // WOW: scroll-alapú zoom + ghost elsiklás (középtől indulva)
        if (wow && wowBg) {
          const r = wow.getBoundingClientRect();
          if (r.bottom > 0 && r.top < vh) {
            const mid = r.top + r.height / 2 - vh / 2;      // 0 = közép
            const prog = Math.max(-1, Math.min(1, mid / vh));
            const scale = (1.14 + prog * 0.1).toFixed(3);   // 1.04 ↔ 1.24
            if (wowBg._ws !== scale) { wowBg._ws = scale; wowBg.style.setProperty('--wowscale', scale); }
            if (ghost) {
              const gm = Math.round(prog * -140);
              if (ghost._gm !== gm) { ghost._gm = gm; ghost.style.setProperty('--ghostmove', gm + 'px'); }
            }
          }
        }
        lastParallax = changed ? 1 : lastParallax;
      }
      ticking = false;
    });
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  onScroll();

  /* ---------- 5. Mobil menü ---------- */
  const burger = document.querySelector('.nav__burger');
  const panel = document.getElementById('mobilmenu');
  const setMenu = (open) => {
    nav.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Menü bezárása' : 'Menü megnyitása');
    panel.setAttribute('aria-hidden', String(!open));
    document.body.style.overflow = open ? 'hidden' : '';
  };
  if (burger && panel) {
    burger.addEventListener('click', () => setMenu(!nav.classList.contains('is-open')));
    panel.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setMenu(false)));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) setMenu(false);
    });
  }

  /* ---------- 6. Back to top ---------- */
  if (totop) {
    totop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' });
    });
  }

  /* ---------- 7. Magnetic gombok (csak finom pointer) ---------- */
  if (finePointer && !prefersReduced) {
    document.querySelectorAll('.btn').forEach((btn) => {
      const strength = 18;
      btn.addEventListener('pointermove', (e) => {
        const r = btn.getBoundingClientRect();
        const x = ((e.clientX - r.left) / r.width - 0.5) * strength;
        const y = ((e.clientY - r.top) / r.height - 0.5) * strength;
        btn.style.transform = `translate(${x}px, ${y}px)`;
      });
      btn.addEventListener('pointerleave', () => { btn.style.transform = ''; });
    });
  }

  /* ---------- 8. Anchor nav: fixált fejléc kompenzáció ---------- */
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 64;
      window.scrollTo({ top, behavior: prefersReduced ? 'auto' : 'smooth' });
      history.replaceState(null, '', a.getAttribute('href'));
    });
  });
})();
