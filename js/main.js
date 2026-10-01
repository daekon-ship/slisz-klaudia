/* ==========================================================================
   SLISZ KLAUDIA — V3 · generatív vonalrajz motor + UI
   ========================================================================== */
(() => {
  'use strict';

  const html = document.documentElement;
  const body = document.body;
  const reduceQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* ---------- mozgás-állapot ----------
     Alap: BE. Windows MinAnimate-kvirk ellen: OS reduce esetén is engedélyezünk,
     hacsak a felhasználó a footer kapcsolóval explicitly nem tiltotta. */
  if (reduceQuery.matches && !html.classList.contains('motion-off')) {
    html.classList.add('motion-keep');
  }
  const motionOn = () =>
    !html.classList.contains('motion-off');

  /* ---------- segédek ---------- */
  const GOLD = '#c9a35c';
  const GOLD2 = '#e9d3a1';
  const PAPER = '#f3efe9';
  const goldA = a => `rgba(201,163,92,${a})`;
  const paperA = a => `rgba(243,239,233,${a})`;
  const easeOut = t => 1 - Math.pow(1 - t, 3);
  const clamp01 = t => Math.max(0, Math.min(1, t));
  const rand = (a, b) => a + Math.random() * (b - a);

  function fitCanvas(cv) {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const r = cv.getBoundingClientRect();
    const w = Math.max(1, Math.round(r.width));
    const h = Math.max(1, Math.round(r.height));
    cv.width = w * dpr;
    cv.height = h * dpr;
    const ctx = cv.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return { ctx, w, h };
  }

  /* ---------- geometria-generátorok ---------- */
  const circle = (cx, cy, r, n = 110, a0 = 0, a1 = Math.PI * 2) => {
    const pts = [];
    for (let i = 0; i <= n; i++) {
      const a = a0 + (a1 - a0) * (i / n);
      pts.push({ x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r });
    }
    return pts;
  };

  const cubic = (p0, p1, p2, p3, n = 70) => {
    const pts = [];
    for (let i = 0; i <= n; i++) {
      const t = i / n, u = 1 - t;
      pts.push({
        x: u * u * u * p0.x + 3 * u * u * t * p1.x + 3 * u * t * t * p2.x + t * t * t * p3.x,
        y: u * u * u * p0.y + 3 * u * u * t * p1.y + 3 * u * t * t * p2.y + t * t * t * p3.y
      });
    }
    return pts;
  };

  const heart = (cx, cy, s, n = 130) => {
    const pts = [];
    for (let i = 0; i <= n; i++) {
      const t = (i / n) * Math.PI * 2;
      pts.push({
        x: cx + 16 * Math.pow(Math.sin(t), 3) * s,
        y: cy - (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) * s
      });
    }
    return pts;
  };

  const spiral = (cx, cy, s, turns = 3.4, n = 260) => {
    const pts = [];
    const b = Math.log(1.618) / (Math.PI * 2); // arany növekedés
    for (let i = 0; i <= n; i++) {
      const th = (i / n) * turns * Math.PI * 2;
      const r = s * Math.exp(b * th * 2.2);
      pts.push({ x: cx + Math.cos(th) * r, y: cy + Math.sin(th) * r });
    }
    return pts;
  };

  // Élet virága: középső kör + 6 szomszéd + külső gyűrű
  const flowerOfLife = (cx, cy, r) => {
    const paths = [{ pts: circle(cx, cy, r), w: 1.1, a: .8 }];
    for (let i = 0; i < 6; i++) {
      const a = (Math.PI / 3) * i - Math.PI / 2;
      paths.push({ pts: circle(cx + Math.cos(a) * r, cy + Math.sin(a) * r, r), w: .8, a: .55 });
    }
    return paths;
  };

  /* ---------- progresszív rajzoló ---------- */
  function drawPaths(ctx, paths, t, rotate = 0) {
    const n = paths.length;
    ctx.save();
    if (rotate) ctx.rotate(rotate);
    paths.forEach((p, i) => {
      const local = clamp01(t * n - i);
      if (local <= 0 || !p.pts || !p.pts.length) return;
      // egyetlen pont = kitöltött porszem
      if (p.pts.length === 1) {
        ctx.beginPath();
        ctx.arc(p.pts[0].x, p.pts[0].y, p.r || 2.4, 0, Math.PI * 2);
        ctx.fillStyle = p.color || GOLD;
        ctx.globalAlpha = p.a ?? 1;
        if (p.glow) { ctx.shadowColor = goldA(.85); ctx.shadowBlur = p.glow; }
        ctx.fill();
        ctx.shadowBlur = 0; ctx.globalAlpha = 1;
        return;
      }
      const upto = Math.min(p.pts.length, Math.max(2, Math.ceil(p.pts.length * easeOut(local))));
      ctx.beginPath();
      for (let k = 0; k < upto; k++) {
        const pt = p.pts[k];
        k ? ctx.lineTo(pt.x, pt.y) : ctx.moveTo(pt.x, pt.y);
      }
      ctx.strokeStyle = p.color || GOLD;
      ctx.globalAlpha = p.a ?? 1;
      ctx.lineWidth = p.w || 1;
      if (p.dash) ctx.setLineDash(p.dash);
      if (p.glow) { ctx.shadowColor = goldA(.85); ctx.shadowBlur = p.glow; }
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;
    });
    ctx.restore();
  }

  function drawDots(ctx, dots, now = 0) {
    dots.forEach(d => {
      const tw = now ? .55 + .45 * Math.sin(now * d.sp + d.ph) : 1;
      ctx.globalAlpha = d.a * tw;
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
      ctx.fillStyle = d.c || GOLD2;
      ctx.fill();
    });
    ctx.globalAlpha = 1;
  }

  /* ============================================================
     HERO — nagy generatív kompozíció
     ============================================================ */
  const heroCv = document.getElementById('heroArt');

  function heroPaths(w, h) {
    const mob = w < 760;
    const cx = mob ? w * .5 : w * .72;
    const cy = mob ? h * .42 : h * .46;
    const R = Math.min(w, h) * (mob ? .30 : .27);
    const P = [];

    // halvány sugár-irányok
    for (let i = 0; i < 14; i++) {
      const a = (Math.PI * 2 / 14) * i + .18;
      P.push({
        pts: [{ x: cx + Math.cos(a) * R * 1.15, y: cy + Math.sin(a) * R * 1.15 },
              { x: cx + Math.cos(a) * R * 1.75, y: cy + Math.sin(a) * R * 1.75 }],
        w: .6, a: .14
      });
    }
    // szaggatott pálya-gyűrűk
    P.push({ pts: circle(cx, cy, R * 1.58, 150), w: .7, a: .3, dash: [2, 7] });
    P.push({ pts: circle(cx, cy, R * 1.86, 150), w: .6, a: .18, dash: [1, 10] });
    // Élet virága — a fő motívum
    flowerOfLife(cx, cy, R).forEach(p => P.push(p));
    // belső arany mag
    P.push({ pts: circle(cx, cy, R * .22, 80), w: 1.3, a: .9, glow: 16 });
    // fény-haló ívek (bal felül)
    const hx = cx - R * 1.7, hy = cy - R * 1.25, hr = R * .55;
    [0, 1, 2].forEach(i =>
      P.push({ pts: circle(hx, hy, hr * (1 - i * .17), 90, Math.PI * .85, Math.PI * 1.95), w: 1.1, a: .55 - i * .13, glow: 8 }));
    // szív (jobb alul)
    const s = R / 22;
    P.push({ pts: heart(cx + R * 1.62, cy + R * 1.28, s, 120), w: 1.1, a: .8, glow: 10 });
    P.push({ pts: circle(cx + R * 1.62, cy + R * 1.28, R * .34, 80), w: .6, a: .25, dash: [2, 6] });
    // spirál (bal alul)
    P.push({ pts: spiral(cx - R * 1.75, cy + R * 1.1, R * .05), w: .9, a: .5 });

    return { paths: P, cx, cy, dots: heroDots(w, h, cx, cy, R) };
  }

  function heroDots(w, h, cx, cy, R) {
    const dots = [];
    const n = w < 760 ? 20 : 34;
    for (let i = 0; i < n; i++) {
      const a = rand(0, Math.PI * 2);
      const rr = rand(R * 1.1, Math.min(w, h) * .62);
      dots.push({
        x: cx + Math.cos(a) * rr, y: cy + Math.sin(a) * rr,
        r: rand(.5, 1.7), a: rand(.12, .5), sp: rand(.0006, .002), ph: rand(0, 6.28)
      });
    }
    return dots;
  }

  let heroScene = null;
  function paintHero(t = 1, now = 0, rot = 0) {
    if (!heroCv) return;
    const { ctx, w, h } = fitCanvas(heroCv);
    if (!heroScene || heroScene.w !== w || heroScene.h !== h) {
      const sc = heroPaths(w, h); sc.w = w; sc.h = h; heroScene = sc;
    }
    ctx.clearRect(0, 0, w, h);
    ctx.save();
    ctx.translate(heroScene.cx, heroScene.cy);
    ctx.rotate(rot);
    ctx.translate(-heroScene.cx, -heroScene.cy);
    drawPaths(ctx, heroScene.paths, t);
    ctx.restore();
    drawDots(ctx, heroScene.dots, now);
  }

  /* ============================================================
     MOTÍVUM-KÁRTYÁK
     ============================================================ */
  const shapeBuilders = {
    halo(w, h) {
      const cx = w / 2, cy = h / 2, R = Math.min(w, h) * .33;
      const P = [];
      for (let i = 0; i < 5; i++)
        P.push({ pts: circle(cx, cy, R * (1 - i * .155), 110), w: 1.2 - i * .15, a: .85 - i * .12, glow: 10 });
      P.push({ pts: circle(cx, cy, R * 1.35, 120), w: .6, a: .25, dash: [2, 7] });
      P.push({ pts: [{ x: cx, y: cy }], r: 3.4, a: 1, glow: 18, color: GOLD2 });
      return P;
    },
    sprout(w, h) {
      const cx = w / 2, R = Math.min(w, h) * .30, cy = h * .7;
      const P = [];
      // szár: enyhe S-görbe
      P.push({ pts: cubic({ x: cx, y: cy }, { x: cx - R * .35, y: cy - R * 1.05 }, { x: cx + R * .55, y: cy - R * 1.6 }, { x: cx + R * .16, y: cy - R * 2.2 }, 90), w: 1.3, a: .9, glow: 8 });
      // alsó levélpár: íves, felfelé nyíló szárak
      const y1 = cy - R * .95;
      P.push({ pts: cubic({ x: cx - R * .05, y: y1 + R * .1 }, { x: cx - R * .55, y: y1 }, { x: cx - R * 1.05, y: y1 - R * .3 }, { x: cx - R * 1.25, y: y1 - R * .8 }, 60), w: 1, a: .75 });
      P.push({ pts: cubic({ x: cx + R * .1, y: y1 }, { x: cx + R * .65, y: y1 - R * .15 }, { x: cx + R * 1.15, y: y1 - R * .45 }, { x: cx + R * 1.35, y: y1 - R * .95 }, 60), w: 1, a: .75 });
      // felső levélpár: kisebb
      const y2 = cy - R * 1.55;
      P.push({ pts: cubic({ x: cx + R * .1, y: y2 + R * .05 }, { x: cx - R * .3, y: y2 - R * .05 }, { x: cx - R * .6, y: y2 - R * .3 }, { x: cx - R * .72, y: y2 - R * .65 }, 50), w: .9, a: .6 });
      P.push({ pts: cubic({ x: cx + R * .14, y: y2 - R * .05 }, { x: cx + R * .5, y: y2 - R * .15 }, { x: cx + R * .8, y: y2 - R * .4 }, { x: cx + R * .95, y: y2 - R * .75 }, 50), w: .9, a: .6 });
      // talaj + rügy
      P.push({ pts: [{ x: cx - R * 1.35, y: cy }, { x: cx + R * 1.35, y: cy }], w: .7, a: .3, dash: [1, 6] });
      P.push({ pts: circle(cx + R * .16, cy - R * 2.2, R * .09, 40), w: 1, a: .85, glow: 12, color: GOLD2 });
      return P;
    },
    heart(w, h) {
      const cx = w / 2, cy = h * .52, s = Math.min(w, h) / 46;
      return [
        { pts: heart(cx, cy, s, 140), w: 1.4, a: .95, glow: 14 },
        { pts: heart(cx, cy, s * .68, 120), w: .8, a: .4 },
        { pts: circle(cx, cy - s * 1.2, s * 2.4, 110), w: .6, a: .22, dash: [2, 7] }
      ];
    },
    spiral(w, h) {
      const cx = w / 2, cy = h / 2, R = Math.min(w, h) * .36;
      const P = [{ pts: spiral(cx, cy, R * .045, 3.6, 300), w: 1.2, a: .85, glow: 10 }];
      for (let i = 0; i < 8; i++) {
        const a = (Math.PI * 2 / 8) * i;
        P.push({ pts: [{ x: cx + Math.cos(a) * R * .3, y: cy + Math.sin(a) * R * .3 }, { x: cx + Math.cos(a) * R, y: cy + Math.sin(a) * R }], w: .5, a: .16 });
      }
      P.push({ pts: circle(cx, cy, R, 120), w: .6, a: .22 });
      return P;
    },
    flower(w, h) {
      const cx = w / 2, cy = h / 2, R = Math.min(w, h) * .27;
      const P = flowerOfLife(cx, cy, R);
      P.push({ pts: circle(cx, cy, R * 1.72, 130), w: .8, a: .5 });
      P.push({ pts: circle(cx, cy, R * 1.86, 130), w: .6, a: .2, dash: [1, 8] });
      return P;
    }
  };

  const motifCanvas = cv => {
    const kind = cv.dataset.shape;
    let started = false;
    const render = (t = 1) => {
      const { ctx, w, h } = fitCanvas(cv);
      ctx.clearRect(0, 0, w, h);
      drawPaths(ctx, (shapeBuilders[kind] || shapeBuilders.halo)(w, h), t);
    };
    const start = () => {
      if (started) return; started = true;
      if (!motionOn()) return render(1);
      const t0 = performance.now(), dur = 1700;
      const step = now => {
        const t = clamp01((now - t0) / dur);
        render(t);
        if (t < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    new IntersectionObserver((es, o) => {
      es.forEach(e => { if (e.isIntersecting) { start(); o.unobserve(cv); } });
    }, { threshold: .3 }).observe(cv);
  };
  document.querySelectorAll('.motif__art canvas').forEach(motifCanvas);

  /* ============================================================
     ALKOTÁSOK — nagy váltó-vászon
     ============================================================ */
  const worksCv = document.getElementById('worksCanvas');
  const worksCap = document.getElementById('worksCaption');
  const worksItems = [...document.querySelectorAll('.works__item')];
  let worksAnim = null;

  function paintWork(kind, t = 1) {
    if (!worksCv) return;
    const { ctx, w, h } = fitCanvas(worksCv);
    ctx.clearRect(0, 0, w, h);
    const R = Math.min(w, h) * .3, cx = w / 2, cy = h / 2;
    const paths = (shapeBuilders[kind] || shapeBuilders.halo)(w, h);
    // keret-gyűrű minden mű köré
    paths.push({ pts: circle(cx, cy, R * 1.62, 140), w: .6, a: .18, dash: [2, 9] });
    drawPaths(ctx, paths, t);
  }

  function setWork(item) {
    if (!item || item.classList.contains('is-active')) return;
    worksItems.forEach(i => i.classList.remove('is-active'));
    item.classList.add('is-active');
    if (worksCap) {
      worksCap.textContent = '';
      worksCap.append(item.dataset.title, ' ');
      const note = document.createElement('b');
      note.textContent = item.dataset.note || '';
      worksCap.append(note);
    }
    if (!motionOn()) return paintWork(item.dataset.shape, 1);
    const t0 = performance.now(), dur = 1500, kind = item.dataset.shape;
    cancelAnimationFrame(worksAnim);
    const step = now => {
      const t = clamp01((now - t0) / dur);
      paintWork(kind, t);
      if (t < 1) worksAnim = requestAnimationFrame(step);
    };
    worksAnim = requestAnimationFrame(step);
  }

  worksItems.forEach(item => {
    item.setAttribute('tabindex', '0');
    item.setAttribute('role', 'button');
    item.addEventListener('click', () => setWork(item));
    item.addEventListener('mouseenter', () => { if (matchMedia('(pointer:fine)').matches) setWork(item); });
    item.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setWork(item); }
    });
  });

  /* ============================================================
     WOW — minden betöltéskor újra "születő" arany-bloom
     ============================================================ */
  const wowCv = document.getElementById('wowArt');
  let wowScene = null, wowVisible = false, wowRAF = 0;

  function buildBloom(w, h) {
    const cx = w * (w < 760 ? .5 : .44), cy = h * .44, R = Math.min(w, h) * .44;
    const paths = [];
    // 4 tökéletes gyűrű
    [1, .62, .38, .16].forEach((k, i) =>
      paths.push({ pts: circle(cx, cy, R * k, 130), w: i ? .7 : 1.1, a: i ? .3 : .55 }));
    // ~70 véletlen ív — a " kezdeti káosz"
    const n = w < 760 ? 46 : 78;
    for (let i = 0; i < n; i++) {
      const rr = R * (0.18 + Math.pow(Math.random(), 1.6) * .95);
      const a0 = rand(0, Math.PI * 2), span = rand(.15, 1.5);
      paths.push({
        pts: circle(cx, cy, rr, 40, a0, a0 + span),
        w: rand(.4, 1.8), a: rand(.06, .4),
        color: Math.random() < .8 ? GOLD : PAPER
      });
    }
    // finom sugár-tick-ek
    for (let i = 0; i < 24; i++) {
      const a = (Math.PI * 2 / 24) * i + rand(-.06, .06);
      paths.push({
        pts: [{ x: cx + Math.cos(a) * R * .8, y: cy + Math.sin(a) * R * .8 },
              { x: cx + Math.cos(a) * R * (0.95 + rand(0, .18)), y: cy + Math.sin(a) * R * (0.95 + rand(0, .18)) }],
        w: .5, a: rand(.1, .3)
      });
    }
    // porszemek
    const dots = [];
    for (let i = 0; i < 40; i++) {
      const a = rand(0, Math.PI * 2), rr = R * rand(.2, 1.25);
      dots.push({ x: cx + Math.cos(a) * rr, y: cy + Math.sin(a) * rr, r: rand(.4, 1.5), a: rand(.15, .55), sp: rand(.0008, .002), ph: rand(0, 6.28) });
    }
    return { paths, dots, cx, cy, w, h };
  }

  function paintWow(now = 0, rot = 0) {
    if (!wowCv) return;
    const { ctx, w, h } = fitCanvas(wowCv);
    if (!wowScene || wowScene.w !== w || wowScene.h !== h) wowScene = buildBloom(w, h);
    ctx.clearRect(0, 0, w, h);
    ctx.save();
    ctx.translate(wowScene.cx, wowScene.cy);
    ctx.rotate(rot);
    ctx.translate(-wowScene.cx, -wowScene.cy);
    drawPaths(ctx, wowScene.paths, 1);
    ctx.restore();
    drawDots(ctx, wowScene.dots, now);
  }

  function wowLoop(now) {
    wowRAF = 0;
    if (!wowVisible || !motionOn()) return;
    paintWow(now, now * .000012);
    wowRAF = requestAnimationFrame(wowLoop);
  }

  if (wowCv) {
    new IntersectionObserver(es => {
      es.forEach(e => {
        wowVisible = e.isIntersecting;
        if (wowVisible && motionOn() && !wowRAF) wowRAF = requestAnimationFrame(wowLoop);
        if (!wowVisible) paintWow(0, 0);
      });
    }, { threshold: .05 }).observe(wowCv);
  }

  /* ============================================================
     HERO loop + belépés
     ============================================================ */
  let heroVisible = true, heroRAF = 0;
  function heroLoop(now) {
    heroRAF = 0;
    if (!heroVisible || !motionOn()) return;
    paintHero(1, now, Math.sin(now * .00008) * .05);
    heroRAF = requestAnimationFrame(heroLoop);
  }

  function bootHero() {
    if (!motionOn()) { paintHero(1, 0, 0); }
    else {
      const t0 = performance.now(), dur = 2400;
      const step = now => {
        const t = clamp01((now - t0) / dur);
        paintHero(t, now, 0);
        if (t < 1) requestAnimationFrame(step);
        else { heroVisible = true; if (!heroRAF) heroRAF = requestAnimationFrame(heroLoop); }
      };
      requestAnimationFrame(step);
    }
    document.querySelector('.hero')?.classList.add('is-in');
  }

  if (heroCv) {
    new IntersectionObserver(es => {
      es.forEach(e => { heroVisible = e.isIntersecting; });
    }, { threshold: 0 }).observe(heroCv);
  }

  /* ============================================================
     UI: nav / menü / reveal / progress / totop / cursor
     ============================================================ */
  const nav = document.getElementById('nav');
  const progress = document.querySelector('.progress');
  const totop = document.querySelector('.totop');
  const burger = document.querySelector('.nav__burger');
  const panel = document.getElementById('mobilmenu');

  let scrollScheduled = false;
  function onScroll() {
    scrollScheduled = false;
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - innerHeight;
    if (progress) progress.style.width = (max > 0 ? (y / max) * 100 : 0) + '%';
    nav?.classList.toggle('is-scrolled', y > 40);
    totop?.classList.toggle('is-visible', y > 800);
  }
  addEventListener('scroll', () => {
    if (!scrollScheduled) { scrollScheduled = true; requestAnimationFrame(onScroll); }
  }, { passive: true });
  onScroll();

  totop?.addEventListener('click', () => scrollTo({ top: 0, behavior: motionOn() ? 'smooth' : 'auto' }));

  function closeMenu() {
    body.classList.remove('menu-open');
    burger?.setAttribute('aria-expanded', 'false');
    panel?.setAttribute('aria-hidden', 'true');
  }
  burger?.addEventListener('click', () => {
    const open = body.classList.toggle('menu-open');
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Menü bezárása' : 'Menü megnyitása');
    panel?.setAttribute('aria-hidden', String(!open));
  });
  panel?.addEventListener('click', e => { if (e.target.closest('a')) closeMenu(); });
  addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });

  // reveal
  const revealIO = new IntersectionObserver(es => {
    es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-in'); revealIO.unobserve(e.target); } });
  }, { threshold: .16, rootMargin: '0px 0px -6% 0px' });
  document.querySelectorAll('.rv, .rv-lines').forEach(el => revealIO.observe(el));

  // aktív nav-link
  const linkMap = new Map();
  document.querySelectorAll('.nav__link').forEach(a => {
    const sec = document.querySelector(a.getAttribute('href'));
    if (sec) linkMap.set(sec, a);
  });
  const secIO = new IntersectionObserver(es => {
    es.forEach(e => {
      const link = linkMap.get(e.target);
      if (link && e.isIntersecting) {
        document.querySelectorAll('.nav__link.is-active').forEach(x => x.classList.remove('is-active'));
        link.classList.add('is-active');
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  linkMap.forEach((_, sec) => secIO.observe(sec));

  // cursor glow (csak asztali pointer)
  const glow = document.querySelector('.cursor-glow');
  if (glow && matchMedia('(pointer:fine)').matches) {
    let gx = -300, gy = -300, tx = gx, ty = gy, glowRAF = 0;
    addEventListener('pointermove', e => {
      tx = e.clientX; ty = e.clientY;
      glow.classList.add('is-on');
      if (!glowRAF) glowRAF = requestAnimationFrame(glowLoop);
    }, { passive: true });
    function glowLoop() {
      glowRAF = 0;
      gx += (tx - gx) * .12; gy += (ty - gy) * .12;
      glow.style.transform = `translate3d(${gx}px,${gy}px,0)`;
      if (Math.abs(tx - gx) > .4 || Math.abs(ty - gy) > .4) glowRAF = requestAnimationFrame(glowLoop);
    }
  }

  /* ---------- hero cím karakter-split ---------- */
  function splitTitle() {
    document.querySelectorAll('.hero__title .line').forEach(line => {
      const text = line.textContent;
      line.textContent = '';
      [...text].forEach(c => {
        const s = document.createElement('span');
        if (/\s/.test(c)) { s.className = 'ch ch--space'; s.setAttribute('aria-hidden', 'true'); }
        else { s.className = 'ch'; s.textContent = c; }
        line.append(s);
      });
      [...line.children].forEach((s, i) => s.style.setProperty('--i', i));
      if (/\S/.test(text)) line.setAttribute('aria-label', text.trim());
    });
  }

  /* ---------- mozgás-kapcsoló ---------- */
  document.querySelectorAll('[data-motion-toggle]').forEach(btn => {
    const sync = () => {
      const on = motionOn();
      btn.textContent = on ? 'Mozgás: be' : 'Mozgás: ki';
      btn.setAttribute('aria-pressed', String(on));
    };
    sync();
    btn.addEventListener('click', () => {
      const on = motionOn();
      try { localStorage.setItem('sk-motion', on ? 'on' : 'off'); } catch (e) { /* noop */ }
      location.reload();
    });
  });

  /* ---------- resize ---------- */
  let rsT = 0;
  addEventListener('resize', () => {
    clearTimeout(rsT);
    rsT = setTimeout(() => {
      heroScene = null; wowScene = null;
      paintHero(1, 0, 0);
      paintWow(0, 0);
      const active = document.querySelector('.works__item.is-active');
      if (active) paintWork(active.dataset.shape, 1);
    }, 160);
  });

  /* ---------- boot ---------- */
  function boot() {
    splitTitle();
    paintHero(0, 0, 0);
    const active = document.querySelector('.works__item.is-active');
    if (active) {
      if (worksCap) {
        worksCap.textContent = '';
        worksCap.append(active.dataset.title, ' ');
        const note = document.createElement('b');
        note.textContent = active.dataset.note || '';
        worksCap.append(note);
      }
      paintWork(active.dataset.shape, 1);
    }
    const ready = (document.fonts && document.fonts.ready) ? document.fonts.ready : Promise.resolve();
    ready.then(() => requestAnimationFrame(() => requestAnimationFrame(bootHero)));
  }

  if (document.readyState === 'loading') addEventListener('DOMContentLoaded', boot);
  else boot();
})();
