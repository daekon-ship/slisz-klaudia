/* ==========================================================================
   SLISZ KLAUDIA — V4 · generatív vonalrajz motor + UI
   Művészeti réteg: metszet-vonalak (engrave), porszem-stipple, rózsa-görbe,
   fibonacci magfej, kitöltött szív-mag · hero/wow offscreen cache
   ========================================================================== */
(() => {
  'use strict';

  const html = document.documentElement;
  const body = document.body;
  const reduceQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* ---------- mozgás-állapot ---------- */
  if (reduceQuery.matches && !html.classList.contains('motion-off')) {
    html.classList.add('motion-keep');
  }
  const motionOn = () => !html.classList.contains('motion-off');

  /* ---------- segédek ---------- */
  const GOLD  = '#c9a35c';
  const GOLD2 = '#e9d3a1';
  const PAPER = '#f3efe9';
  const RED   = '#b8524a';
  const INK   = '#17101f';
  const goldA = a => `rgba(201,163,92,${a})`;
  const paperA = a => `rgba(243,239,233,${a})`;
  const inkA  = a => `rgba(23,16,31,${a})`;
  const redA  = a => `rgba(184,82,74,${a})`;
  const easeOut = t => 1 - Math.pow(1 - t, 3);
  const clamp01 = t => Math.max(0, Math.min(1, t));
  const rand = (a, b) => a + Math.random() * (b - a);
  const TAU = Math.PI * 2;

  function fitCanvas(cv) {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const r = cv.getBoundingClientRect();
    const w = Math.max(1, Math.round(r.width));
    const h = Math.max(1, Math.round(r.height));
    cv.width = w * dpr;
    cv.height = h * dpr;
    const ctx = cv.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return { ctx, w, h, dpr };
  }

  /* offscreen canvas ugyanazzal a dpr skálával */
  function makeOff(w, h, dpr) {
    const cv = document.createElement('canvas');
    cv.width = Math.max(1, Math.round(w * dpr));
    cv.height = Math.max(1, Math.round(h * dpr));
    const octx = cv.getContext('2d');
    octx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return { cv, octx };
  }

  /* ---------- alap geometria ---------- */
  const circle = (cx, cy, r, n = 110, a0 = 0, a1 = TAU) => {
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
        x: u*u*u*p0.x + 3*u*u*t*p1.x + 3*u*t*t*p2.x + t*t*t*p3.x,
        y: u*u*u*p0.y + 3*u*u*t*p1.y + 3*u*t*t*p2.y + t*t*t*p3.y
      });
    }
    return pts;
  };

  const heart = (cx, cy, s, n = 130) => {
    const pts = [];
    for (let i = 0; i <= n; i++) {
      const t = (i / n) * TAU;
      pts.push({
        x: cx + 16 * Math.pow(Math.sin(t), 3) * s,
        y: cy - (13*Math.cos(t) - 5*Math.cos(2*t) - 2*Math.cos(3*t) - Math.cos(4*t)) * s
      });
    }
    return pts;
  };

  const spiral = (cx, cy, s, turns = 3.4, n = 260) => {
    const pts = [];
    const b = Math.log(1.618) / TAU;
    for (let i = 0; i <= n; i++) {
      const th = (i / n) * turns * TAU;
      const r = s * Math.exp(b * th * 2.2);
      pts.push({ x: cx + Math.cos(th) * r, y: cy + Math.sin(th) * r });
    }
    return pts;
  };

  /* rózsa-görbe: valódi szirmok (k páros → 2k szirom) */
  const rose = (cx, cy, R, k, phase = 0, n = 280) => {
    const pts = [];
    for (let i = 0; i <= n; i++) {
      const th = (TAU * i) / n;
      const r = R * Math.cos(k * (th + phase));
      pts.push({ x: cx + r * Math.cos(th), y: cy + r * Math.sin(th) });
    }
    return pts;
  };

  /* fibonacci magfej — napraforgó-spirál (arany szög) */
  const fibDots = (cx, cy, R, n, rBase = 1.6) => {
    const ga = Math.PI * (3 - Math.sqrt(5));
    const pts = [];
    for (let i = 0; i < n; i++) {
      const r = R * Math.sqrt((i + .5) / n);
      const a = ga * i;
      pts.push({
        x: cx + r * Math.cos(a), y: cy + r * Math.sin(a),
        r: rBase * (1.15 - .55 * r / R),
        a: .3 + .55 * (r / R)
      });
    }
    return { stipple: true, pts, color: GOLD2 };
  };

  /* porszem-felhő */
  const stipple = (cx, cy, rIn, rOut, n, o = {}) => {
    const pts = [];
    for (let i = 0; i < n; i++) {
      const t = Math.pow(Math.random(), .75);
      const r = rIn + (rOut - rIn) * t;
      const a = rand(0, TAU);
      pts.push({
        x: cx + Math.cos(a) * r * rand(.94, 1.06),
        y: cy + Math.sin(a) * r * rand(.94, 1.06),
        r: rand(.4, o.rMax || 1.6),
        a: rand(o.aMin ?? .06, o.aMax ?? .45)
      });
    }
    return { stipple: true, pts, color: o.color || GOLD2 };
  };

  /* metszet: párhuzamos vonalak a görbe mentén (normál-irányú eltolás) */
  function engrave(pts, layers = 2, gap = 1.7, attrs = {}) {
    if (layers <= 1 || !pts || pts.length < 3) return [{ pts, ...attrs }];
    const mid = Math.floor((layers - 1) / 2);
    const out = [];
    for (let l = 0; l < layers; l++) {
      const d = (l - mid) * gap;
      const op = pts.map((p, i) => {
        const a = pts[Math.max(0, i - 1)], b = pts[Math.min(pts.length - 1, i + 1)];
        const dx = b.x - a.x, dy = b.y - a.y;
        const len = Math.hypot(dx, dy) || 1;
        return { x: p.x - (dy / len) * d, y: p.y + (dx / len) * d };
      });
      if (l === mid) out.push({ pts: op, ...attrs });
      else {
        const soft = { ...attrs };
        soft.w = (attrs.w || 1) * .5;
        soft.a = (attrs.a ?? .8) * .5;
        delete soft.glow;
        out.push({ pts: op, ...soft });
      }
    }
    return out;
  }

  const flowerOfLife = (cx, cy, r) => {
    const paths = engrave(circle(cx, cy, r, 140), 2, 1.8, { w: 1.05, a: .85, glow: 8 });
    for (let i = 0; i < 6; i++) {
      const a = (Math.PI / 3) * i - Math.PI / 2;
      paths.push({ pts: circle(cx + Math.cos(a) * r, cy + Math.sin(a) * r, r, 110), w: .75, a: .5 });
    }
    return paths;
  };

  /* ---------- progresszív rajzoló ---------- */
  function drawPaths(ctx, paths, t = 1) {
    const n = paths.length;
    ctx.save();
    paths.forEach((p, i) => {
      const local = clamp01(t * n - i);
      if (local <= 0) return;
      const lp = easeOut(local);

      if (p.stipple) {
        ctx.fillStyle = p.color || GOLD2;
        for (const d of p.pts) {
          ctx.globalAlpha = (d.a ?? p.a ?? 1) * lp;
          ctx.beginPath();
          ctx.arc(d.x, d.y, d.r || 1, 0, TAU);
          ctx.fill();
        }
        ctx.globalAlpha = 1;
        return;
      }

      if (p.fill) {
        if (!p.pts || p.pts.length < 2) return;
        ctx.beginPath();
        p.pts.forEach((pt, k) => (k ? ctx.lineTo(pt.x, pt.y) : ctx.moveTo(pt.x, pt.y)));
        ctx.closePath();
        ctx.fillStyle = p.color || GOLD;
        ctx.globalAlpha = (p.a ?? 1) * lp;
        if (p.glow) { ctx.shadowColor = p.glowColor || goldA(.85); ctx.shadowBlur = p.glow; }
        ctx.fill();
        ctx.shadowBlur = 0; ctx.globalAlpha = 1;
        return;
      }

      if (!p.pts || !p.pts.length) return;

      if (p.pts.length === 1) {
        ctx.beginPath();
        ctx.arc(p.pts[0].x, p.pts[0].y, p.r || 2.4, 0, TAU);
        ctx.fillStyle = p.color || GOLD;
        ctx.globalAlpha = (p.a ?? 1) * lp;
        if (p.glow) { ctx.shadowColor = p.glowColor || goldA(.85); ctx.shadowBlur = p.glow; }
        ctx.fill();
        ctx.shadowBlur = 0; ctx.globalAlpha = 1;
        return;
      }

      const upto = Math.min(p.pts.length, Math.max(2, Math.ceil(p.pts.length * lp)));
      ctx.beginPath();
      for (let k = 0; k < upto; k++) {
        const pt = p.pts[k];
        k ? ctx.lineTo(pt.x, pt.y) : ctx.moveTo(pt.x, pt.y);
      }
      ctx.strokeStyle = p.color || GOLD;
      ctx.globalAlpha = p.a ?? 1;
      ctx.lineWidth = p.w || 1;
      if (p.dash) ctx.setLineDash(p.dash);
      if (p.glow) { ctx.shadowColor = p.glowColor || goldA(.85); ctx.shadowBlur = p.glow; }
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
      ctx.arc(d.x, d.y, d.r, 0, TAU);
      ctx.fillStyle = d.c || GOLD2;
      ctx.fill();
    });
    ctx.globalAlpha = 1;
  }

  const dust = (w, h, n) => {
    const dots = [];
    for (let i = 0; i < n; i++) {
      dots.push({
        x: rand(0, w), y: rand(0, h),
        r: rand(.4, 1.5), a: rand(.08, .4),
        sp: rand(.0006, .002), ph: rand(0, TAU)
      });
    }
    return dots;
  };

  /* ============================================================
     HERO — fény-oltár: Élet virága + vörös szívmag + port
     ============================================================ */
  const heroCv = document.getElementById('heroArt');
  let heroScene = null, heroOff = null;

  function heroPaths(w, h) {
    const mob = w < 760;
    const cx = mob ? w * .5 : w * .70;
    const cy = mob ? h * .33 : h * .44;
    const R = Math.min(w, h) * (mob ? .31 : .27);
    const P = [];

    /* háttér-rózsa — nagy, halvány (kompozíciós alap) */
    P.push({ pts: rose(cx, cy, R * 2.02, 6, Math.PI / 6, 320), w: .8, a: .10 });

    /* Élet virága — metszet-vonalakkal */
    flowerOfLife(cx, cy, R).forEach(p => P.push(p));

    /* külső gyűrűk + beosztott órás-gyűrű */
    P.push({ pts: circle(cx, cy, R * 1.72, 160), w: .9, a: .45 });
    P.push({ pts: circle(cx, cy, R * 1.95, 160), w: .6, a: .22, dash: [2, 8] });
    for (let i = 0; i < 36; i++) {
      const a = (TAU / 36) * i;
      P.push({
        pts: [{ x: cx + Math.cos(a) * R * 1.72, y: cy + Math.sin(a) * R * 1.72 },
              { x: cx + Math.cos(a) * R * 1.80, y: cy + Math.sin(a) * R * 1.80 }],
        w: .7, a: .3
      });
    }

    /* VÖRÖS SZÍVMAG — az egyetlen telített pont az oldalon */
    const hs = R / 42;
    P.push({ fill: true, pts: heart(cx, cy, hs * .95, 110), color: redA(.92), glow: 22 });
    P.push({ pts: heart(cx, cy, hs * 1.28, 120), w: .9, a: .55, color: RED, glow: 10 });
    P.push({ pts: circle(cx, cy, R * .15, 80), w: .7, a: .6, color: GOLD2 });
    P.push({ pts: circle(cx, cy, R * .26, 80), w: .6, a: .3, dash: [2, 6] });

    /* arany por-felhő a virág körül */
    P.push(stipple(cx, cy, R * 1.02, R * 2.45, mob ? 150 : 260, { aMax: .4 }));

    /* sarok-fényhaló (bal fent) */
    if (!mob) {
      const hx = w * .10, hy = h * .17;
      [0, 1, 2].forEach(i =>
        P.push({ pts: circle(hx, hy, R * .5 * (1 - i * .18), 90, Math.PI * .8, Math.PI * 1.9), w: 1, a: .5 - i * .13, glow: 8, color: GOLD2 }));
    }

    /* spirál (bal alul, mobilon elhagyva) */
    if (!mob) {
      engrave(spiral(cx - R * 1.95, cy + R * 1.18, R * .045, 3.2, 220), 2, 1.3, { w: .9, a: .55 })
        .forEach(p => P.push(p));
    }

    return { paths: P, cx, cy, w, h, dots: dust(w, h, mob ? 18 : 34) };
  }

  function ensureHero(w, h, dpr) {
    if (!heroScene || heroScene.w !== w || heroScene.h !== h) {
      heroScene = heroPaths(w, h);
      heroOff = null;
    }
    if (!heroOff) {
      const { cv, octx } = makeOff(w, h, dpr);
      drawPaths(octx, heroScene.paths, 1);
      heroOff = cv;
    }
  }

  function paintHero(t = 1, now = 0, rot = 0) {
    if (!heroCv) return;
    const { ctx, w, h, dpr } = fitCanvas(heroCv);
    ensureHero(w, h, dpr);
    ctx.clearRect(0, 0, w, h);
    ctx.save();
    ctx.translate(heroScene.cx, heroScene.cy);
    ctx.rotate(rot);
    ctx.translate(-heroScene.cx, -heroScene.cy);
    if (t >= 1 && heroOff) ctx.drawImage(heroOff, 0, 0, w, h);
    else drawPaths(ctx, heroScene.paths, t);
    ctx.restore();
    drawDots(ctx, heroScene.dots, now);
  }

  /* ============================================================
     ŐSFORMÁK — tintavonal a papíron (arany + egy vörös akcent)
     ============================================================ */
  const motifBuilders = {
    halo(w, h) {
      const cx = w / 2, cy = h / 2, R = Math.min(w, h) * .33;
      const P = [];
      engrave(circle(cx, cy, R * .92, 120), 3, 1.9, { w: 1.15, a: .9, color: INK })
        .forEach(p => P.push(p));
      engrave(circle(cx, cy, R * .58, 100), 2, 1.6, { w: .9, a: .7, color: INK })
        .forEach(p => P.push(p));
      /* fény-sugarak — arany */
      for (let i = 0; i < 18; i++) {
        const a = (TAU / 18) * i + .14;
        P.push({
          pts: [{ x: cx + Math.cos(a) * R * 1.04, y: cy + Math.sin(a) * R * 1.04 },
                { x: cx + Math.cos(a) * R * (1.3 + (i % 3) * .07), y: cy + Math.sin(a) * R * (1.3 + (i % 3) * .07) }],
          w: .7, a: .5, color: GOLD
        });
      }
      P.push({ pts: circle(cx, cy, R * 1.38, 120), w: .6, a: .4, color: GOLD, dash: [2, 7] });
      P.push(stipple(cx, cy, 0, R * .5, 60, { aMax: .5, color: GOLD2, rMax: 1.4 }));
      P.push({ pts: [{ x: cx, y: cy }], r: 3.2, a: 1, glow: 16, color: GOLD2 });
      return P;
    },
    sprout(w, h) {
      const cx = w / 2, R = h * .255, cy = h * .74;
      const P = [];
      P.push(...engrave(cubic({ x: cx, y: cy }, { x: cx - R * .35, y: cy - R * 1.05 }, { x: cx + R * .55, y: cy - R * 1.6 }, { x: cx + R * .16, y: cy - R * 2.2 }, 90), 2, 1.7, { w: 1.3, a: .9, color: INK }));
      const y1 = cy - R * .95;
      P.push(...engrave(cubic({ x: cx - R * .05, y: y1 + R * .1 }, { x: cx - R * .55, y: y1 }, { x: cx - R * 1.05, y: y1 - R * .3 }, { x: cx - R * 1.25, y: y1 - R * .8 }, 60), 2, 1.5, { w: 1, a: .75, color: INK }));
      P.push(...engrave(cubic({ x: cx + R * .1, y: y1 }, { x: cx + R * .65, y: y1 - R * .15 }, { x: cx + R * 1.15, y: y1 - R * .45 }, { x: cx + R * 1.35, y: y1 - R * .95 }, 60), 2, 1.5, { w: 1, a: .75, color: INK }));
      const y2 = cy - R * 1.55;
      P.push({ pts: cubic({ x: cx + R * .1, y: y2 + R * .05 }, { x: cx - R * .3, y: y2 - R * .05 }, { x: cx - R * .6, y: y2 - R * .3 }, { x: cx - R * .72, y: y2 - R * .65 }, 50), w: .9, a: .6, color: INK });
      P.push({ pts: cubic({ x: cx + R * .14, y: y2 - R * .05 }, { x: cx + R * .5, y: y2 - R * .15 }, { x: cx + R * .8, y: y2 - R * .4 }, { x: cx + R * .95, y: y2 - R * .75 }, 50), w: .9, a: .6, color: INK });
      /* talaj + gyökér-csend */
      P.push({ pts: [{ x: cx - R * 1.5, y: cy }, { x: cx + R * 1.5, y: cy }], w: .7, a: .4, color: GOLD, dash: [1, 6] });
      /* rügy — arany, izzó */
      P.push({ fill: true, pts: circle(cx + R * .16, cy - R * 2.2, R * .1, 40), color: goldA(.9), glow: 14 });
      P.push(stipple(cx + R * .16, cy - R * 2.2, R * .12, R * .34, 26, { aMax: .45, color: GOLD2 }));
      return P;
    },
    heart(w, h) {
      const cx = w / 2, cy = h * .52, s = Math.min(w, h) / 46;
      const P = [];
      P.push(...engrave(heart(cx, cy, s, 140), 3, 2.1, { w: 1.35, a: .95, color: INK }));
      P.push({ pts: heart(cx, cy, s * .6, 110), w: .9, a: .8, color: RED });
      P.push(stipple(cx, cy - s * .35, 0, s * .78, 70, { aMax: .2, color: RED, rMax: 1.3 }));
      P.push({ pts: circle(cx, cy - s * 1.2, s * 2.3, 110), w: .6, a: .45, color: GOLD, dash: [2, 7] });
      return P;
    },
    spiral(w, h) {
      const cx = w / 2, cy = h / 2, R = Math.min(w, h) * .36;
      const P = [];
      P.push(...engrave(spiral(cx, cy, R * .045, 3.6, 300), 2, 1.6, { w: 1.15, a: .9, color: INK }));
      /* arany szemcsepontok a spirál mentén */
      P.push({ ...fibDots(cx, cy, R * .92, 44, 1.8), color: GOLD });
      for (let i = 0; i < 8; i++) {
        const a = (TAU / 8) * i;
        P.push({
          pts: [{ x: cx + Math.cos(a) * R * .3, y: cy + Math.sin(a) * R * .3 },
                { x: cx + Math.cos(a) * R, y: cy + Math.sin(a) * R }],
          w: .5, a: .2, color: INK
        });
      }
      P.push({ pts: circle(cx, cy, R, 120), w: .6, a: .35, color: GOLD, dash: [2, 7] });
      return P;
    }
  };

  const motifCanvas = cv => {
    const kind = cv.dataset.shape;
    const render = (t = 1) => {
      const { ctx, w, h } = fitCanvas(cv);
      const key = w + '|' + h;
      if (!cv._cache || cv._key !== key) {
        cv._cache = (motifBuilders[kind] || motifBuilders.halo)(w, h);
        cv._key = key;
      }
      ctx.clearRect(0, 0, w, h);
      drawPaths(ctx, cv._cache, t);
    };
    cv._render = render;
    const start = () => {
      if (cv._built) return;
      cv._built = true;
      if (!motionOn()) return render(1);
      const t0 = performance.now(), dur = 1900;
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
     WOW — rózsablond ablak: rózsa-görbe + bordák + vörös közép
     ============================================================ */
  const wowCv = document.getElementById('wowArt');
  let wowScene = null, wowOff = null, wowVisible = false, wowRAF = 0;

  function wowPaths(w, h) {
    const cx = w * (w < 760 ? .5 : .46), cy = h * .42, R = Math.min(w, h) * .40;
    const P = [];
    /* fő rózsa: 16 sziros k=8 görbe, metszet-vonalakkal */
    P.push(...engrave(rose(cx, cy, R * .98, 8, 0, 460), 2, 2.3, { w: 1.05, a: .85, glow: 10 }));
    /* belső rózsa k=4, 8 szirom, elforgatva */
    P.push({ pts: rose(cx, cy, R * .62, 4, Math.PI / 4, 340), w: .75, a: .5 });
    /* gyűrűk */
    P.push({ pts: circle(cx, cy, R * .80, 140), w: .9, a: .45 });
    P.push({ pts: circle(cx, cy, R * 1.16, 160), w: .7, a: .3, dash: [2, 9] });
    P.push({ pts: circle(cx, cy, R * 1.3, 160), w: .5, a: .18, dash: [1, 10] });
    /* bordák: 16 irány */
    for (let i = 0; i < 16; i++) {
      const a = (TAU / 16) * i + .1;
      P.push({
        pts: [{ x: cx + Math.cos(a) * R * .14, y: cy + Math.sin(a) * R * .14 },
              { x: cx + Math.cos(a) * R * .80, y: cy + Math.sin(a) * R * .80 }],
        w: .55, a: .28
      });
    }
    /* külső fogaskerék-tick */
    for (let i = 0; i < 48; i++) {
      const a = (TAU / 48) * i;
      P.push({
        pts: [{ x: cx + Math.cos(a) * R * .98, y: cy + Math.sin(a) * R * .98 },
              { x: cx + Math.cos(a) * R * 1.06, y: cy + Math.sin(a) * R * 1.06 }],
        w: .6, a: .3
      });
    }
    /* közép: vörös mag + arany izzás */
    P.push({ fill: true, pts: circle(cx, cy, R * .045, 40), color: redA(.95), glow: 22 });
    P.push({ pts: circle(cx, cy, R * .1, 60), w: .8, a: .7, color: GOLD2 });
    P.push(stipple(cx, cy, R * .06, R * .32, 130, { aMax: .5, color: GOLD2, rMax: 1.6 }));
    /* külső por */
    P.push(stipple(cx, cy, R * 1.05, R * 1.7, w < 760 ? 90 : 150, { aMax: .26 }));
    return { paths: P, cx, cy, w, h, dots: dust(w, h, w < 760 ? 16 : 30) };
  }

  function ensureWow(w, h, dpr) {
    if (!wowScene || wowScene.w !== w || wowScene.h !== h) {
      wowScene = wowPaths(w, h);
      wowOff = null;
    }
    if (!wowOff) {
      const { cv, octx } = makeOff(w, h, dpr);
      drawPaths(octx, wowScene.paths, 1);
      wowOff = cv;
    }
  }

  function paintWow(now = 0, rot = 0) {
    if (!wowCv) return;
    const { ctx, w, h, dpr } = fitCanvas(wowCv);
    ensureWow(w, h, dpr);
    ctx.clearRect(0, 0, w, h);
    ctx.save();
    ctx.translate(wowScene.cx, wowScene.cy);
    ctx.rotate(rot);
    ctx.translate(-wowScene.cx, -wowScene.cy);
    ctx.drawImage(wowOff, 0, 0, w, h);
    ctx.restore();
    drawDots(ctx, wowScene.dots, now);
  }

  /* ============================================================
     LOOP-ok + belépés
     ============================================================ */
  const lowPower = matchMedia('(pointer: coarse)').matches;
  let heroVisible = true, heroRAF = 0, heroLast = 0;

  function heroLoop(now) {
    heroRAF = 0;
    if (!heroVisible || !motionOn()) return;
    if (!lowPower || now - heroLast > 55) {
      paintHero(1, now, Math.sin(now * .00008) * .04);
      heroLast = now;
    }
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

  let wowLast = 0;
  function wowLoop(now) {
    wowRAF = 0;
    if (!wowVisible || !motionOn()) return;
    if (!lowPower || now - wowLast > 70) {
      paintWow(now, now * .00001);
      wowLast = now;
    }
    wowRAF = requestAnimationFrame(wowLoop);
  }

  if (wowCv) {
    new IntersectionObserver(es => {
      es.forEach(e => {
        wowVisible = e.isIntersecting;
        if (wowVisible && motionOn() && !wowRAF) wowRAF = requestAnimationFrame(wowLoop);
        if (!wowVisible && !lowPower) paintWow(0, 0);
      });
    }, { threshold: .05 }).observe(wowCv);
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

  const revealIO = new IntersectionObserver(es => {
    es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-in'); revealIO.unobserve(e.target); } });
  }, { threshold: .16, rootMargin: '0px 0px -6% 0px' });
  document.querySelectorAll('.rv, .rv-lines').forEach(el => revealIO.observe(el));

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
      heroScene = null; heroOff = null;
      wowScene = null; wowOff = null;
      document.querySelectorAll('.motif__art canvas').forEach(cv => { cv._cache = null; cv._key = null; });
      paintHero(1, 0, 0);
      if (wowVisible || !lowPower) paintWow(0, 0);
    }, 160);
  });

  /* ---------- boot ---------- */
  function boot() {
    splitTitle();
    paintHero(0, 0, 0);
    const ready = (document.fonts && document.fonts.ready) ? document.fonts.ready : Promise.resolve();
    ready.then(() => requestAnimationFrame(() => requestAnimationFrame(bootHero)));
  }

  if (document.readyState === 'loading') addEventListener('DOMContentLoaded', boot);
  else boot();
})();
