# SLISZ KLAUDIA — Projektállapot

## Current goal
Prémium bemutató látványterv. **v4.0 — MŰVÉSZETI MOTOR-ÚJRAÉPÍTÉS (élő: 2fbac2d)**

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
