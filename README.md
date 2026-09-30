# SLISZ KLAUDIA — Vizuális világ
## Bemutató látványterv · Átadási dokumentum · v1.1 (2026-09-30)

**Élő demó:** https://daekon-ship.github.io/slisz-klaudia/
**GitHub:** https://github.com/daekon-ship/slisz-klaudia

---

## 0. v1.1 — brutál vizuális réteg (új)

- **Karakter-szintű hero reveal** — a név betűnként, staggelt időzítéssel áll össze
- **Por-részecske canvas** a heróban — lebegő aranyporszemek, halvány csillogással (mobilon kevesebb részecske, mobilon is sima)
- **Film-grain réteg** — nagyon finom, prémium „szemcse” az egész oldalon
- **Cursor fény** — az egér mögött haladó, elhaló arany ragyogás (csak asztali gépen)
- **Outline tipográfia** — a hero 3. sora körvonalas; a WOW sávban óriás, függőleges „arany” ghost-szó csúszik görgetésre; a footerben óriás körvonalas név, ami hoverre töltődik arannyal
- **WOW scroll-zoom** — az arany virág háttér görgetésre lassan zoomol
- **Íves galériakép** — az első kép boltíves aljával (fotó-arch keretérzet)
- **Szekció-számok** (01–04) óriás outline kiemeléssel
- **Mozgás-kapcsoló** a láblécben — ha a Windows-on kikapcsolt ablakanimáció (MinAnimate=0) miatt a böngésző letiltaná az animációkat, az oldal így is él; a kapcsolóval kikapcsolható marad az akadálymentesség kedvéért

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
- **Újraépítés:** ha az egyfájlos verziót is frissíteni kell: `powershell -File make_qa_embedded.ps1`, majd `copy _qa_embedded.html latvanyterv-egyfajlban.html`

## 6. Közzététel

### a) GitHub Pages — MÁR ÉL
Az oldal automatikusan felkerült ide: **https://daekon-ship.github.io/slisz-klaudia/**
Minden `git push` után ~1 percen belül frissül. Később saját domain is ráállítható.

### b) Saját tárhely FTP-n
1. `deploy/ftp-config.example.ps1` → másold `deploy/ftp-credentials.ps1` névre, töltsd ki a tárhely adataival (a fájl a .gitignore-ban van, soha nem kerül fel GitHubra)
2. Feltöltés:
```powershell
powershell -File deploy\ftp-deploy.ps1              # egyfájlos (gyors bemutató)
powershell -File deploy\ftp-deploy.ps1 -Structure multi   # teljes szerkezet css/js/img
```
3. Kész — böngészőben a domain azonnal az új oldalt mutatja

### c) Netlify/Vercel/Cloudflare Pages
A repo pull-nál egy kattintás, ingyenes.

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
