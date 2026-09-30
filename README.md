# SLISZ KLAUDIA — Vizuális világ
## Bemutató látványterv · Átadási dokumentum · v1.0 (2026-09-30)

---

## 1. Mit kaptál

| Fájl | Mi ez? |
|---|---|
| **`latvanyterv-egyfajlban.html`** | ⭐ **AZ ÁTADHATÓ VERZIÓ.** Egyetlen fájl, minden kép beágyazva. Küldd el bárhogy (e-mail, Messenger, pendrive) — dupla kattintásra megnyílik böngészőben, internet sem kell hozzá. |
| `index.html` + `css/` + `js/` + `assets/img/` | A „műhelybeli", szerkeszthető változat — ebben dolgozunk tovább. |
| `assets/img/` | Klaudia 5 saját képe letisztult néven (a gyökérben az eredetiek is megmaradtak érintetlenül). |
| `.daekon/` | Belső munkadokumentáció: döntések, QA-napló, projektállapot. (Nem kell átadni.) |

## 2. Hogyan nézd meg (3 lépés)

1. Nyisd meg böngészőben a **`latvanyterv-egyfajlban.html`**-t (dupla katt).
2. **Görgetj végig** — az animációk, a parallax és a hover-ek az élő élmény részei.
3. Próbáld ki mobilon is (a fájlt megnyithatod telefonon is), és a jobb felső hamburger menüt.

## 3. Az oldal felépítése

| Szekció | Kép | Szerep |
|---|---|---|
| HERO | fénylő alak, virágkoszorú | Nagy nyitó kompozíció, lassú parallax |
| Manifestó | — | Csendes átvezetés, soronkénti belépéssel |
| Rólam | alak izzó szívvel | Editorial portré + kulcsértékek |
| Galéria | mind az 5 mű | Aszimmetrikus album-kompozíció |
| WOW sáv | arany virág | Full-screen parallax pillanat |
| Szimbólum | szív az Élet virágában | Kerek medál, 3 jelentésréteg |
| Szemlélet | — | 3 irányadó elv |
| Kapcsolat / CTA | — | **Hamarosan állapot** — lásd lent |

## 4. Mi NINCS benne (és miért)

Az átadási elv: **semmi kitalált adat.** Amíg nincs forrás, az oldalon nem szerepel:
- e-mail, telefonszám, cím, nyitvatartás
- szolgáltatáslista, árak
- vélemények, mérföldkövek, statisztikák

A Kapcsolat szekció ezért jelenleg „hamarosan" gombokat mutat. Amint megvannak a valódi elérhetőségek, 5 perc alatt bekerülnek.

## 5. Szerkesztési pontok (a szerkeszthető változatban)

- **Szövegek:** `index.html` — minden szöveg közvetlenül olvasható a HTML-ben, jelöléssel `<!-- ============ SZEKCIÓ ============ -->`
- **Színek:** `css/style.css` elején a `:root` blokk — egy sor átírása az egész oldalt átszínezi
- **Tipográfia:** `--font-display` (címek) és `--font-body` (szöveg) a `:root`-ban
- **Képcsere:** `assets/img/` fájlok azonos néven felülírhatók — a kompozíció változatlan marad
- **Újraépítés:** ha a szabadalmi egyfájlos verziót is frissíteni kell: `powershell -File make_qa_embedded.ps1`, majd `copy _qa_embedded.html latvanyterv-egyfajlban.html`

## 6. Közzététel (ha jóváhagyod)

A látványterv bármelyik ingyenes/olcsó statikus hostingon fut:
- **Netlify / Vercel / Cloudflare Pages:** húzd be a mappát, kész (ingyenes)
- **Saját domain:** a fenti szolgáltatásokon 1-2 kattintás alatt beállítható
- Nem kell szerver, adatbázis, PHP — teljesen statikus, gyors és olcsó fenntartani

## 7. Technikai állapot

- ✅ Konzolhibamentes, 7/7 kép betölt
- ✅ Reszponzív: 360 px-től 1920 px-ig overflow-mentesen tesztelve
- ✅ Kontrasztok WCAG AAA/AA szintűek
- ✅ `prefers-reduced-motion` támogatás (csökkentett mozgás esetén minden animáció kikapcsol)
- ✅ SEO alapok (title, description, OG tag-ek), tematikus favicon
- ⚠️ A Google Fonts (Fraunces, Manrope) hálózatról töltődik — offline is működik, csak tartalék betűtípussal

## 8. Következő lépések (javaslat)

1. Klaudia visszajelzése a látványtervre (szín, szövegek, sorrend)
2. Valós elérhetőségek + esetleges szolgáltatásleírások begyűjtése
3. Domain + hosting döntés → élesítés
4. Bővítési opciók: EN nyelvű verzió, Instagram feed, kiállítás-/webshop-modul később
