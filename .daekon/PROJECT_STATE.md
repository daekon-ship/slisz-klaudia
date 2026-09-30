# SLISZ KLAUDIA — Projektállapot

## Current goal
Prémium bemutató látványterv (portfóliószintű referenciamunka) Klaudia 5 saját képére építve. **v1.0 — TELJESEN ÁTADVA** (látványterv + átadó dokumentum + QA-jelentés).

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
