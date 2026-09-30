# SLISZ KLAUDIA — QA napló (v1.0, 2026-09-30)

## Végrehajtott ellenőrzések (EXECUTED)
- Konzol: 0 error / 0 warning (preview logs, friss reload után) — PASS
- Képek: 7/7 <img> + 2 CSS-beli bg kép betölt (data-URI QA buildben igazolva) — PASS
- Fontok: Fraunces + Manrope betöltve (document.fonts.check = true), magyar ékezetekkel — PASS
- Horizontális overflow: 360 / 390 / 430 / 820 / 1024 / 1440 / 1920 px — mind FALSE — PASS
- Hero sorok szélessége 390-en: 99 / 170 / 305 px (befér) — PASS
- Mobil menü: nyitás (aria-expanded=true, body scroll lock), linkre kattintás után zár + anchor ugrik — PASS
- Galéria méretek: desktop 12-col aszimmetria OK; 1024 fix sorok OK (gi--e javítva: 0px → 462px); mobil flex-oszlop + aspect-ratio OK
- Kontraszt (WCAG): paper/ink 16.09:1, dim/ink2 9.62:1, faint/ink 6.08:1, gold/ink 9.2:1 — PASS (AAA/AA)
- Anchor navigáció: scroll-margin-top + JS offset kompenzáció (#rolam ugrik helyesen) — PASS
- prefers-reduced-motion: CSS-lel mindenkori kikapcsolás + JS oldal (parallax/magnetic/smooth) — PASS
- Aria: burger aria-expanded/aria-controls, panel aria-hidden, ikon-gombok aria-label — PASS

## Nem ellenőrizhető ebben a környezetben (NOT VERIFIED)
- Valós böngésző-gépeken való futtatás (Safari/Firefox tényleges viselkedése)
- Valós eszközön való touch-teszt (a preview emulátor egér-eseményekkel dolgozik)
- Valós hálózati betöltési idők (CDN fontok, nem-Inlined képek)

## Ismert korlátok
- A beépített screenshot-motor animált oldalon nem komponál képet; a QA DOM-mérésekkel történt. A látványt a felhasználó a Preview tabban tudja élőben nézni.
