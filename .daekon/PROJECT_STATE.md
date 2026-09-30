# SLISZ KLAUDIA — Projektállapot

## Current goal
Prémium bemutató látványterv. **v2.0 FINÁLÉ — TELJESEN ÁTADHATÓ**

Új a v2.0-ban: hero image-reveal (clip-path wipe), arany glow a portré mögött,
galéria arany-tinta hover, Élet virága brand-SVG (medál-ring + CTA-minta),
favicon.svg + apple-touch-icon, 404.html, robots.txt, sitemap.xml,
deploy/FTP-UTMUTATO.md (magyar, gyorshibaelhárítással).

- Élő demó (GitHub Pages): https://daekon-ship.github.io/slisz-klaudia/
- Repo: https://github.com/daekon-ship/slisz-klaudia (main, d169b3a)
- FTP: `deploy/ftp-deploy.ps1` + `deploy/ftp-config.example.ps1` (hitelesítő: git-ignorált ftp-credentials.ps1)

## v1.1 brutál vizuális réteg (lefuttatva, QA-zva)
- karakter-szintű hero reveal (27 ch span, staggelt delay)
- por-részecske canvas (dpr-aware, IntersectionObserver-tudatos, 26/55 részecske)
- film-grain SVG turbulence + cursor-glow (fine pointer only)
- outline tipó: hero 3. sor, marquee b-k, WOW ghost "arany" (90°, scroll-move), footer óriás név (hover-fill)
- WOW scroll-zoom (1.04↔1.24) + ghostmove ±140px
- gi--a íves (999px border-radius), sec-index 01–04
- mozgás-kapcsoló (sk-motion localStorage) — a Windows MinAnimate=0 reduced-motion kvirk kezelésére; html.motion-keep felülbírálja az OS preferenciát, motion-off a felhasználói kikapcsolás

## Átadási csomag
- `latvanyterv-egyfajlban.html` — ügyfélnek küldhető, minden beágyazva (smoke-tesztelve)
- `README.md` — nyitási/szerkesztési/közzétételi útmutató
- `.daekon/qa-report.md` — bizonyítéki státuszokkal (13 PASS / 0 FAIL / 2 NOT VERIFIED / 1 N.A.)

## Completed work
- Teljes képaudit (5 kép: hero/portré/editorial döntés) — lásd DESIGN_DECISIONS.md
- index.html + css/style.css + js/main.js (statikus, keretrendszer nélküli premium one-page)
- Design rendszer: aubergine/elefántcsont/pezsgőarany, Fraunces + Manrope (latin-ext)
- Szekciók: hero (rétegzett, parallax), marquee, manifestó (soronkénti reveal), rólam (editorial portré + badge), galéria (12-os grid, aszimmetrikus), WOW full-bleed (arany virág parallax), Élet virága szimbólum szekció (keringő fénypötty), értékek, CTA, footer
- Interakciók: scroll reveal (IO), hero szó-reveal, parallax (rAF, csak desktop), nav scrolled állapot + aktív link, progress bar, mobil menü, magnetic gombok, back-to-top, smooth anchor
- prefers-reduced-motion teljes támogatás
- QA lefutott: 360/390/430/820/1024/1440/1920 overflow-mentes, kontrasztok AAA/AA, konzol tiszta, mobil menü és anchorok tesztelve

## Open tasks / next steps (ügyféltől függő)
- Valós elérhetőségek (e-mail, telefon, social) beillesztése a CTA + footer + nav pontokba
- Klaudia jóváhagyása után: éles domain/hosting, esetleg valós tartalom-bővítés (szolgáltatások, ha lesz forrás)
- Esetleg: angol nyelvű változat, OG kép generálás

## Blockers
- Nincs kontaktadat / szolgáltatásinformáció — a CTA szekció szándékosan „hamarosan” állapotban, nem kitalált adatokkal

## Technical constraints
- Nincs build rendszer; tiszta HTML/CSS/JS. A Google Fonts CDN-ről jön (offline estére fallback: Georgia/system)
- Képek a gyökérben is megmaradnak eredeti néven (forrás); a használt példányok: assets/img/
- make_qa_embedded.ps1: újraépíti a latvanyterv-egyfajlban.html / _qa_embedded.html fájlokat, ha a css/js/img változik

## Deployment state
- Nincs requestelt deploy; a mappa statikusan szolgálható (bármelyik statikus host)

## Key decisions
- Egy oldal + anchor nav (látványterv jelleg); komponensszerű BEM szerkezet a CSS-ben
- Fájlnevek alapú tartalmi horgony: „Élet virága”, „Szív élet virágában” mint műcímkek
