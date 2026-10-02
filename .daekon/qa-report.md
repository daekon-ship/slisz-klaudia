# DAEKON minőségi kapu — SLISZ KLAUDIA
Dátum: 2026-10-02 · **v6.0 — teljes vizuális újraterv, editorial művészeti portfólió**
Kontextus: ügyfélnek bemutatandó prémium látványterv (statikus one-page)

## v6.0 kapu (2026-10-02) — EXECUTED PASS
- Overflow: 0 @360/390/430/768/1440 (élő preview + headless Edge)
- Konzol: 0 hiba · 7/7 img betölt (görgetés után is; a "broken" a lazy-load érthető állapota)
- Placeholder-szken: 0 találat („hamarosan", „Bemutató látványterv", „generatív")
- Desktop tipó: hero 132px, contact 144px (clamp-lál 360px-en is biztonságos)
- Mobil: hero fotó 56svh + tipó alatta; művek közel teli szélességben; menü prémium, él
- Képvizsgálat: headless Edge screenshotok (hero/w1–w4/rolam/kapcs/mobil×5/tablet×2)
  — hero-pár ritmus, statement-blokkok, mandala részlet-zoom, grafit lezárás mind rendben
- Animációk: reveal + clip-path maszk + parallax; prefers-reduced-motion: minden mozdulatlan
- OG-kép: új (ivory + fotó + editorial tipó), élő 200
- Éles: 08aad9c → index 200, új jelölők élőben visszakeresve, 0 maradványszó

---

## Előzmény: v5.1 kapu (2026-10-02) — EXECUTED PASS

## v5.1 kapu (2026-10-02) — EXECUTED PASS
- Név-ismétlés kivezetve: footer óriás outline → csendes mottó (Élet virága SVG + Fény·Virág·Geometria·Szív);
  wow ghost-szó eltávolítva; manifestó aláírás + mobilmenü lábléc név nélkül.
  A „Slisz/Klaudia" már csak: hero óriás, nav-brand, footer brand + jogsor (a where it belongs).
- Betű-role-k rendbetéve: marquee dőlt Cormorantból → Manrope caps-label;
  about-értékek + szimbólum sorszámok hasonlóan; hero 3. sor marad aegyedüli nagy Cormorant-italic.
- Galéria teljes újraírás: .plates tárlat-katalógus — 5 számozott tárlat (01–05),
  váltott bal/jobbigazított sor, mindig látható felirat (TÁRLAT 01 / cím / altag + arany rule),
  képjelleg-szerinti keretarányok (4/3, 4/4.6, 4/4.4, 1/1, 4/3.2), mobil: kép + felirat alatta.
- Overflow: 0 @360/390/430/768/1440 · konzol: 0 · 8/8 img betölt (görgetéssel is) · név-előfordulás 9 →
  a fenti 4 helyen (tartalmi szövegekkel együtt).
- Elavult CSS-maradványok kitakarítva (.gi--*, .gallery__grid, .footer__giant duplikátumok).
- Egyfájlos build újragenerálva, ellenőrzött.

---

## v5.0 kapu (2026-10-02) — EXECUTED PASS
- Overflow-x: 0 @ 360/390/430/768/1440 (a 430-as 3px about-glow túllógás javítva:
  .section--ink2 overflow:clip)
- Konzol: 0 hiba / 0 figyelmeztetés (több teljes betöltés, mobil + asztal)
- Képek: 8/8 img betölt (viewport-alattiak lazy-load), élőben mind az 5 jpg HTTP 200
- Anchor-ok: html scroll-padding-top 76px egyedileg (a duplázó [id] scroll-margin
  eltávolítva); #galeria cél 76px-en áll meg, cím nem takart
- Mobilmenü: nyit/zár, aria-expanded, link-kattintás után zár + görget
- Scrollspy az új szekciókkal (#rolam/#galeria/#vilag/#szemlelet) él
- Érintő: .g-item figcaption + idx mindig látszik (hover:none media)
- Egyfájlos build 81 KB: görgetés után 0 törött kép, overflow 0
- Éles: eba0365 → index 200 + 5×jpg 200, új jelölők a szolgált HTML/CSS-ben visszakeresve

---

## Előzmény: v4.0 kapu (2026-10-01) — EXECUTED PASS

## v4.0 kapu (2026-10-01) — EXECUTED PASS
- Konzol: 0 hiba / 0 figyelmeztetés (desktop + mobil reload után, preview_logs)
- Overflow-x: 0 px @ 360 / 390 / 430 / 1400 / 1440 (scrollWidth − innerWidth)
- Hero: fény-oltár kompozíció él (vörös szívmag + Élet virága + por), reveal OK
- Works: 5/5 mű-specifikus jelenet vált; vízjel + felirat frissül; 05 szív-clip javítva
- WOW: strukturált rózsablond + forgás; Szimbólum, Szemlélet, CTA, footer átnézve
- Mobil 390: hero mag-helyzet javítva (cy .36→.33, R .34→.31); CTA full-width OK
- Élő Pages: index 200; main.js-ben engrave/fibDots/rose = 23 találat; style.css-ben
  btn--solid = 2 találat → az új build ÉL a publikus URL-en
- OG-kép: újragenerálva (vörös mag, vörös szív, porszem-felhő), PNG a repóban

## v3.0 kapu (2026-10-01) — preview QA, mind EXECUTED PASS

## v3.0 kapu (2026-10-01) — preview QA, mind EXECUTED PASS
- Konzol: 0 hiba / 0 figyelmeztetés friss reload után (többször)
- Hero: `hero.is-in` + 27 karakter-span opacity 1 (reveal él); hero-canvas festve
- Ősformák: 4/4 motívum-canvas festve (IO-indítás) — sprout 2x iterálva vizuálisan
- Alkotások: boot-nál festett; kattintásra vált (activeItem + caption + 4680 festett px mérve)
- WOW: bloom-canvas festve, forgó loop IO-kapcsolt
- Mobil 390px: overflowX = 0; hamburger nyit→zár (aria-state-ekkel) mérése rendben
- Asztali 1440: hero / Ősformák / Alkotások / WOW / Szimbólum / CTA / footer képernyőképen átnézve;
  3 hiba megtalálva és javítva (works nyíl-tördelés, CTA tintaszín, hero oldalfelirat-ütközés)
- Konzisztencia: fotók 0 hivatkozás; OG abszolút URL PNG-re mutat; egyfájlos átadó újraépítve (69 KB, inline, offline)
- Korlátozás: élő GitHub Pages ellenőrzés a push UTÁN esedékes (a 2026-09-30-i élő tábla a v2-t dokumentálta)

## VÉGSŐ ÉLES ELLENŐRZÉS (GitHub Pages, 2026-09-30) — mind EXECUTED PASS
- Oldal: 200 OK · favicon/404/robots/sitemap: mind 200 OK
- 7/7 kép betölt (3 lazy elem scrollra/erőltetve igazolva — normál viselkedés)
- 21 navigációs horgony: 0 törött
- Konzol: 0 hiba
- 390px: overflow-mentes, hamburger menü aktív · 1920px: overflow-mentes, hero 152px
- Animációs rendszer aktív (27 karakter-span, motion-keep a Windows-kvirk ellen)
- Fraunces + Manrope betöltve

## v2.0 bővülés az eredeti v1.0 kapuhoz képest
hero image-reveal · arany glow portré · galéria arany-tinta hover · Élet virága
brand-SVG (medál-ring 60s spin + CTA-minta) · favicon.svg · apple-touch-icon ·
márkázott 404 · robots.txt · sitemap.xml · FTP útmutató (magyar)

Az alábbi eredeti bizonyítéktábla a v1.0 QA-t dokumentálja:

## Evidence táblázat

| Terület | Ellenőrzés | Státusz | Bizonyíték |
|---|---|---|---|
| Funkcionális | Konzolhiba | **EXECUTED PASS** | preview_logs: 0 bejegyzés friss reload után (több futtatás) |
| Funkcionális | Navigáció / anchorok | **EXECUTED PASS** | mobilmenü nyit-zár + #rolam ugrás mérése DOM-ban |
| Funkcionális | Hero animáció indulása | **EXECUTED PASS** | `hero.is-in` osztály futás közben igazolva |
| Funkcionális | Képek betöltése | **EXECUTED PASS** | 7/7 img nat. mérettel (a 3 lazy kép görgetésre tölt — viselkedésrendben) |
| Tipográfia | Fraunces + Manrope latin-ext | **EXECUTED PASS** | document.fonts.check = true, ékezetes szöveg renderelve |
| Reszponzív | Overflow 360/390/430/820/1024/1440/1920 | **EXECUTED PASS** | scrollWidth ≤ clientWidth minden szélességen (friss load-dal) |
| Reszponzív | Galéria kompozíciók | **EXECUTED PASS** | cellaméretek mérve; 2 gridhiba megtalálva és javítva (abszolút img, align-self) |
| Akadálymentesség | Kontrasztok | **EXECUTED PASS** | paper 16.09:1, dim 9.62:1, faint 6.08:1, gold 9.2:1 |
| Akadálymentesség | ARIA (burger, panel, ikonok) | **EXECUTED PASS** | aria-expanded/controls/hidden állapotváltás mérése |
| Akadálymentesség | Keyboard/fókusz | **PARTIAL (NOT VERIFIED maradék)** | outline szabály definiált; teljes billentyűzet-átjárás gépen nem futott |
| Teljesítmény | Animáció költség | **EXECUTED PASS (statikus)** | transform/opacity-only animációk, rAF-throttle, IO + unobserve |
| Teljesítmény | Valós hálózat / gyenge telefon | **NOT VERIFIED** | emulátorban nem mérhető reálisan |
| Tartalom | Nincs kitalált adat / placeholder | **EXECUTED PASS** | CTA „hamarosan" állapot; minden szöveg forráshoz köthető (képfájlnevek + látványterv-keret) |
| Zero-AI-look | Sablon-ellenőrzés | **EXECUTED PASS** | nincs kártyahalom/glassmorphism/gradient-gomb; aszimmetrikus, editorial szerkezet |
| Deploy | Éles közzététel | **NOT APPLICABLE** | nem volt requestelve; statikus hostra kész (README 6. szakasz) |

## Összesítés
- **EXECUTED PASS:** 13 tétel
- **FAIL:** 0 tétel
- **NOT APPLICABLE:** 1 tétel (deploy)
- **NOT VERIFIED / részleges:** 2 tétel (valós eszköz+hálózat, teljes keyboard-átjárás)

## Kapu döntés
A látványterv **átadható** ügyfélnek bemutatásra. A NOT VERIFIED tételek élesítés előtt esedékesek (valós eszközteszt + billentyűzet-átjárás), nem blokkolják a bemutatót.

## Poszt-fix regresszió
A QA során javított 2 gridhiba után a beágyazott buildet újrageneráltuk és a méreteket újra lementük — regresszió nincs.
