# SLISZ KLAUDIA — Tanulságok

## Környezet / eszközök
- A Freebuff preview szerver EGY regisztrált fájlt szolgál ki; a relatív css/js/img 404 → base64-inline QA build kell (make_qa_embedded.ps1)
- preview_open nem fogad file:// URL-t — mindig register_preview, aztán a kapott localhost URL
- A screenshot „no frames” hibát adhat; DOM-mérés (getBoundingClientRect, getComputedStyle) kiváltja a QA egy részét
- Viewport-emuláció live resize-nál NEM frissíti a vw-alapú clamp-értékeket → resize után mindig reload kell, mielőtt méreteket mérünk
- A fullPage screenshot stitchelés hibás lehet (ismétlődő képek) — scrollonkénti viewport screenshot megbízhatóbb
- loading=lazy képek természetesen nem töltődnek below-the-fold → „nem töltött kép” nem feltétlen hiba

## KRITIKUS: Windows reduced-motion kvirk
- MinAnimate=0 (ablakanimáció kikapcsolva) esetén a Chromium `prefers-reduced-motion: reduce`-ot jelent — VÉGIG az oldalon letiltva minden animációt, anélkül hogy bármi hibát látnánk
- Tünet: JS-ből a [data-split] blokk nem fut le ( prefersReduced=true ), CSS transition-ök 0.01ms
- Megoldás: html.motion-keep osztály felülbírálja az OS preferenciát + látható „Mozgás” toggle a footerben (localStorage: sk-motion), motion-off osztály a felhasználói kikapcsoláshoz
- Mindig ellenőrizzük: matchMedia('(prefers-reduced-motion: reduce)').matches MÉG a fejlesztőgépemen is lehet true!

## Canvas tippek
- A <canvas> replaced elem: az inset:0 önmagában nem nyújtja szét — kell a width:100%;height:100% CSS-nek is
- dpr min 2-re vágni + setTransform a tiszta skálázáshoz; IntersectionObserverrel pause-olni, ha nincs a viewportban

## CSS / implementáció
- Grid auto-rows + span cellákban: a képnek abszolútnak kell lennie (inset:0), különben a természetes magasság feszíti a sorokat
- align-self:start üres cellát 0-magasságúra zsugorít — kerülendő fix magasságú grid-kompozíciókban
- IntersectionObserver + unobserve minta: olcsó, egyszer reveal-es animációkhoz
- Parallax: csak pointer:fine + >900px + reduced-motion ellenőrzéssel; rAF-ben throttle-olva

## Tartalom
- Fájlnevek is lehetnek tartalmi horgonyok („Élet virága”, „Szív élet virágában”) — felhasználva műcímkeként
- Ha nincs kontaktadat: „hamarosan” állapot + oka leírva jobb, mint kitalált adat
