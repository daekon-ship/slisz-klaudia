# SLISZ KLAUDIA — Design döntések

## Képaudit (5 saját fotó)
| Fájl | Tartalom | Döntés |
|---|---|---|
| 46f8e85a…jpg (736×736) | Fénylő női alak, virágkoszorú, izzó szív, pasztell-arany robbanás | HERO háttér (object-position center 22%) + galéria 01 |
| b6167130…jpg (736×807) | Női alak izzó szívvel, neoni sugarak, tengerpart | „Rólam” editorial portré (aspect 7/8, hover zoom) + galéria 05 |
| 62aa0623…jpg (736×1308) | Arany csillogó virág, napfény, gyöngyök | WOW full-bleed parallax sáv (center 30%) + galéria 02 |
| Élet virága.jpg (680×1200) | Élet virága geometria, irizáló vízfesték | Galéria 03 (álló panel) |
| Szív élet virágában.jpg (555×548) | Szív a geometria közepén, magenta mandala | Szimbólum szekció kerek medálja + galéria 04 |

## Színpaletta (a fotókból levezetve)
- --ink #1a1022 (mély aubergine — a képek sötét pereme/ura), --ink-2/-3 emelt tónusok
- --paper #f4efe8 meleg elefántcsont (tipó), --paper-dim/-faint fokozatok
- --gold #d8b26a pezsgőarany accent (a képek arany fénye), --gold-deep hover
- --accent-rose #d78a9d tartalékos mikroakcent (jelenleg nem használt)
- Kontrasztok mért: paper/ink 16.09, dim/ink2 9.62, faint/ink 6.08, gold/ink 9.2 (AAA/AA)

## Tipográfia
- Fraunces (display, SOFT=0 WONK=1 char., 400–640, italic) — headline-ok, editorial jelleg
- Manrope (body) — csendes, jól olvasható kísérő
- clamp()-es fluid skála; hero max ~152px 1920-on, 48px 390-en

## Elrendezési elv
- Ritmus: nagy (hero) → nyugodt (manifestó) → információs (rólam) → vizuális (galéria) → WOW (full-bleed) → szimbólum → CTA
- Galéria: 12 oszlopos grid, auto-rows 64px, abszolút képpel — aszimmetria, nem kártyahalom
- Görbe Dísz: CTA koncentrikus körök; szimbólum: keringő fénypötty (CSS animáció)

## Zero-AI-look szempontok
- Nincs kártyahalom, nincs glassmorphism, nincs gradient-gomb; hoverek finomak
- Igazi képek mindenhol; nem középre zárt minden szekció; számjel és caption editorial stílusban
