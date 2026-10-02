# SLISZ KLAUDIA — Vizuális alkotó
## Művészeti portfólió · Átadási dokumentum · v6.0 (2026-10-02)

**Élő oldal:** https://daekon-ship.github.io/slisz-klaudia/
**GitHub:** https://github.com/daekon-ship/slisz-klaudia

---

## 0. v6.0 — teljes vizuális újraterv (galéria-editorial portfólió)

Az oldal **az alkotások köré épül**: ivory háttér, grafit tipó, visszafogott bronz accent,
nagy Fraunces címsorok, bőséges whitespace. Generatív vonalrajz-motor, Ősformák,
marquee, technikai szövegek — mind kikerültek.

- **Hero** — a „Fényáztatott alak" teljes viewport-magasságban balra, editorial tipó jobbra
  (SLISZ / *Klaudia* / Vizuális alkotó + egy mondat). Kép-maszkos belépés, lassú parallax.
- **Alkotások** — váltakozó ritmus: monumentális széles kép → számos statement
  („Forma. Fény. Érzés.") → két kép egymás mellett elcsúsztatva → zárt monumentális önarckép.
  Minden mű apró, elegáns felirattal; hoveren finom zoom.
- **Rólam** — mandala-részlet + 4 soros bemutatkozás (kitalált tények nélkül).
- **Kapcsolat** — sötét grafit lezárás: „Beszéljünk." — csak valós elérhetőség kerülhet ide.
- **Footer** — két sor: Slisz Klaudia · © 2026
- **Mozgás** — reveal + parallax; `prefers-reduced-motion` esetén minden mozdulatlan.

## 1. Fájlok

| Fájl | Mi ez? |
|---|---|
| `index.html` + `css/` + `js/` + `assets/img/` | Az élő oldal forrása. |
| `assets/img/` | Az 5 eredeti kép (optimalizált) + favicon + og-image.png |
| `latvanyterv-egyfajlban.html` | Egyfájlos offline átadó (`make_qa_embedded.ps1` építi) |
| `.daekon/` | Belső munkadokumentáció (nem kell átadni) |

## 2. Szerkesztési pontok

- **Szövegek:** `index.html`, szekció-kommentekkel jelölve
- **Színek:** `css/style.css` `:root` blokk (`--ivory`, `--graphite`, `--bronze`)
- **Képcsere:** `assets/img/` azonos néven — a kompozíció változatlan marad
- **Egyfájlos újraépítés:** `powershell -File make_qa_embedded.ps1`, majd
  `copy _qa_embedded.html latvanyterv-egyfajlban.html`

## 3. Közzététel

GitHub Pages él: minden push után ~1 percen belül frissül.
FTP-terv: `deploy/FTP-UTMUTATO.md` (hitelesítő nélkül inaktív).

## 4. Technikai állapot (v6 QA)

- Overflow 0 @ 360 / 390 / 430 / 768 / 1440
- Konzol: 0 hiba; 7/7 kép betölt
- `prefers-reduced-motion`: minden animáció kikapcsol
- SEO/OG: frissítve (új og-image, editorial felirattal)

## 5. Üzenet Klaudiának (másolható)

> Kedves Klaudia!
>
> Az oldalad most az alkotásaid köré épül: nagy, tiszta felületek, ivory háttér,
> a képeid színei dominálnak. Nyitóképernyő: a Fényáztatott alak teljes magasságban,
> mellette a neved. Görgetve a többi mű váltakozó nagy kompozíciókban jelenik meg.
>
> **Megtekintés:** https://daekon-ship.github.io/slisz-klaudia/
>
> Amint megvannak a valódi elérhetőségeid (e-mail / Instagram / Facebook),
> egyetlen üzenetből bekerülnek a Kapcsolat részbe.
