# SLISZ KLAUDIA — Projektállapot

## Current goal
Prémium bemutató látványterv. **v6.0 — TELJES VIZUÁLIS ÚJRATERV: editorial művészeti portfólió (2026-10-02)**

User utasítás: „A JELENLEGI OLDALT NE FOLTOZGASD. TERVEZD ÚJRA TELJESEN VIZUÁLISAN."
— galéria-szintű portfólió, az alkotások a főszereplők, ivory/grafit/bronz, nagy tipó.
Megvalósítva (teljes újraírás: index.html, css/style.css, js/main.js):
- HERO: klaudia-hero teljes bal félan, editorial tipó jobbra (Fraunces 340, 132px),
  kép-maszkos belépés + sor-felhúzás, lassú parallax (data-plx)
- ALKOTÁSOK: monumentális széles (klaudia-hero) → statement → wide arany virág →
  statement → pár (Élet virága + Szív, elcsúsztatva) → statement → monument önarckép
- RÓLAM: mandala részlet-zoom (about__detail, scale 1.65) + 4 sor valós szöveg
- KAPCSOLAT: grafit lezárás „Beszéljünk." + egy mondat; nincs hamarosan-placeholder
- FOOTER: full-bleed grafit, Slisz Klaudia · © 2026
- JS: ~90 sor (reveal, parallax, nav, mobilmenü); mozgás-kapcsoló ELTÁVOLÍTVA
  (prefers-reduced-motion tisztelt)
- OG-kép újragenerálva (make_og_image.ps1): ivory + fotó + editorial tipó
- QA EXECUTED PASS: overflow 0 @360/390/430/768/1440; konzol 0; 7/7 img;
  0 „hamarosan/bemutató/generatív" szó; mobilmenü él; desktop címsorok 132/144px
- QA-módszer: headless Edge screenshotok (preview_screenshot módzusan törött),
  _qa_scroll.html QA-build (reveal felülbírálás + body-offset scroll)

---

## Előzmény: v5.1 — TIPÓ-REND + TÁRLAT-KATALÓGUS (2026-10-02)

User visszajelzés: „BETŰTÍPUS ITT IS SZAR / NAGYON SOK A SLISZ KLAUDIA FELIRAT /
EGY CSOMÓ KÉP CSAK RANDOM ÖSSZE VON DOBÁLVA". Megoldás:
- Név-csökkentés: footer óriás ELTÁVOLÍTVA (→ Élet virága SVG + mottó), wow ghost ELTÁVOLÍTVA,
  manifestó/mobilmenü aláírások név nélkül. A név már csak: hero, nav, footer-brand, jogsor.
- Betű-role-k: marquee + kisebb címkék Manrope caps; Cormorant-italic csak hero 3. sor + emblem-tipó.
- Galéria: .plates tárlat-katalógus (5 számozott tárlat, váltott igazítás, mindig látható felirat,
  képjelleg-szerinti keretarányok). Mobil: kép felül, felirat alatta.
- QA EXECUTED PASS (overflow 0 öt szélességen, konzol 0, 8/8 img).

---

## Előzmény: v5.0 — AZ EREDETI KÉPEK VISSZATÉRTEK (2026-10-02)

A user új, konkrét feladat-listája: eredeti képek használata, galéria, navigáció
(Rólam/Galéria/Világom/Szemlélet/Kapcsolat), mobil QA. Megvalósítva:
- 5 kép git-blobból visszaállítva 5675998-ból (hash-párosítás a gyökér-forrásokkal),
  assets/img-be: klaudia-hero, klaudia-portre, arany-virag, elet-viraga, sziv-elet-viragaban
- Hero: fotó-réteg (halvány arany fátyol) + generatív virág/szívmag felette
- Rólam szekció (v2 valós szövegek + portré + badge), galéria (v2 aszimmetrikus
  album-rács portolva, képjelleg-szerinti object-position kivágások)
- Nav + mobilmenü + footer: Rólam, Galéria, Világom, Szemlélet, Kapcsolat
- Szimbólum: szív-mandala fotó körül forgó pálya-gyűrű (SVG-disc elhagyva)
- works generatív váltó ELTÁVOLÍTVA (a valódi képek lettek a galéria)
- QA: overflow 0 @360/390/430/768/1440; konzol tiszta; 8/8 img betölt;
  anchor 76px scroll-padding (duplázódó scroll-margin javítva);
  about-glow 430px túllógás javítva (section--ink2 overflow:clip)
- OG/meta szövegek vissza fotós világra; preload klaudia-hero.jpg
- v4-es művészeti motor megmaradt (Ősformák, WOW, hero-generatív réteg)

---

## Előzmény: v4.0 — MŰVÉSZETI MOTOR-ÚJRAÉPÍTÉS (élő: 2fbac2d)

Ügyfél-utasítások: „ne használd fel a képeit, nagyon gagyi lett" → v3.0 fotó-mentes
generatív újraépítés; majd "RITKA SZAR SOKKAL JOBBAT CSINÁLJ ELEMEZD ÁT SOKSZOR" →
v4.0: mély audit + 3 iterációs kör (audit → motor-újraépítés → screenshot-audit →
javítás → QA → push). A vonalrajz-motor művészivé fokozva:
- engrave() többsávos metszet-vonalak, stipple()/stippleShape() porszem-felhők,
  rose() rózsa-görbe, fibDots() fibonacci magfej, fill-támogatás (kitöltött magok)
- Vörös (--red) mint EGYETLEN telített akcentus (hero szívmag, Ősformák számok,
  works 04/05, OG-kép)
- Hero "fény-oltár", Ősformák tintavonalak papíron + aszimmetrikus rács,
  works mű-specifikus jelenetek + vízjel, WOW strukturált rózsablond,
  CTA solid arany gomb; hero/wow offscreen cache (perf)
- QA: 0 konzolhiba, overflow 0 @360/390/430/1440, élő Pages 200 + új motor élőben
  igazolva (engrave/fibDots/rose/btn--solid megtalálható a published fájlokban)

## Előzmény (v3.0)
Fotó-mentes generatív vonalrajz-újjáépítés: Klaudia öt művének motívumai (fény,
hajtás, szív, Élet virága, spirál) élő canvas-rajzokként.

- Élő demó (GitHub Pages): https://daekon-ship.github.io/slisz-klaudia/
- Repo: https://github.com/daekon-ship/slisz-klaudia (main)
- FTP: `deploy/ftp-deploy.ps1` + `deploy/ftp-config.example.ps1` (hitelesítő: git-ignorált ftp-credentials.ps1)

## v3.0 vizuális rendszer
- **Hero:** nagy generatív kompozíció — Élet virága (7 kör), szív, aranyspirál,
  fényhaló, sugár-irányok, lebegő aranyporszemek; betöltéskor vonalanként megrajzolva
- **Ősformák:** 4 élő vonalrajz-kártya (halo / sprout / heart / spiral) IO-indítással
- **Alkotások:** interaktív lista + sticky váltó-vászon (klikk/tap/hover →
  progresszív újrarajzolás; keyboard: Enter/Space)
- **WOW:** generatív arany-bloom — ~80 véletlen ív + gyűrűk + tick-ek + porszemek,
  lassú forgás; minden betöltéskor más
- **Szimbólum:** forgó Élet virága SVG + keringő pálya-pötty + pulzáló mag
- **Tipó:** Fraunces + Cormorant Garamond italic + Manrope; outline hero-sor,
  függőleges hero-felirat, ghost „arany", footer óriás név
- **Fotók teljesen kivonva:** assets/img-ből törölve (gyökérben az eredeti
  forrásfájlok érintetlenek, .gitignore kezeli); OG-kép generatív PNG (make_og_image.ps1)

## Completed work
- index.html / css/style.css / js/main.js teljes újraírás (v3.0)
- favicon.svg (Élet virága monogram) + og-image.png (GDI+ generátor) + og-image.svg
- make_qa_embedded.ps1 frissítve (BOM-kezelés javítva — PS 5.1 ékezet-kvirk)
- 404.html színpaletta szinkron
- QA lefuttatva preview-ben: konzol 0 hiba, hero reveal él, works-canvas rajzol,
  alkotás-váltás működik, mobil menü nyit/zár, 390px overflow 0
- Vizuális iterációk: works→ nyíl→ inset sáv; CTA örökölt tintaszín javítva;
  hero side-felirat ütközés javítva; sprout motívum 2x újrarajzolva

## Open tasks / next steps (ügyféltől függő)
- Klaudia reakciója a fotó-mentes irányra (v2 fotós verzió git előzményből visszahozható)
- Valós elérhetőségek beillesztése a CTA-ba
- Éles domain / FTP a megadott hozzáférésekkel

## Blockers
- FTP hitelesítő adatok (nem blokkolja a linkes átadást)

## Technical constraints
- Nincs build rendszer; tiszta HTML/CSS/JS
- make_qa_embedded.ps1 → latvanyterv-egyfajlban.html újraépítés minden css/js változásnál
- PS szkriptekhez UTF-8 BOM kell (PowerShell 5.1 ékezet-kvirk) — LEARNINGS.md-ben
- Canvas-motor: egyelemző pts-tömb = kitöltött porszem (drawPaths kezeli)

## Deployment state
- GitHub Pages élő; minden commit push után ~1 percen belül frissül

## Key decisions
- Fotó-mentes irány: ügyfél explicit kérése; motívumok generatív vonalrajzzal
- Alkotások-felület: sticky váltó-vászon műlistával (a fotós galéria kiváltása)
- OG-kép: generatív PNG (SVG-t a megosztók nem jelenítik meg)
