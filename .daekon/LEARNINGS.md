# SLISZ KLAUDIA — Tanulságok

## Környezet / eszközök
- A Freebuff preview szerver EGY regisztrált fájlt szolgál ki; a relatív css/js/img 404 → base64-inline QA build kell (make_qa_embedded.ps1)
- preview_open nem fogad file:// URL-t — mindig register_preview, aztán a kapott localhost URL
- A screenshot „no frames” hibát adhat; DOM-mérés (getBoundingClientRect, getComputedStyle) kiváltja a QA egy részét
- Viewport-emuláció live resize-nál NEM frissíti a vw-alapú clamp-értékeket → resize után mindig reload kell, mielőtt méreteket mérünk
- A fullPage screenshot stitchelés hibás lehet (ismétlődő képek) — scrollonkénti viewport screenshot megbízhatóbb
- loading=lazy képek természetesen nem töltődnek below-the-fold → „nem töltött kép” nem feltétlen hiba

## CSS / implementáció
- Grid auto-rows + span cellákban: a képnek abszolútnak kell lennie (inset:0), különben a természetes magasság feszíti a sorokat
- align-self:start üres cellát 0-magasságúra zsugorít — kerülendő fix magasságú grid-kompozíciókban
- IntersectionObserver + unobserve minta: olcsó, egyszer reveal-es animációkhoz
- Parallax: csak pointer:fine + >900px + reduced-motion ellenőrzéssel; rAF-ben throttle-olva

## Tartalom
- Fájlnevek is lehetnek tartalmi horgonyok („Élet virága”, „Szív élet virágában”) — felhasználva műcímkeként
- Ha nincs kontaktadat: „hamarosan” állapot + oka leírva jobb, mint kitalált adat
