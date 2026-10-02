# SLISZ KLAUDIA — Vizuális világ
## Bemutató látványterv · Átadási dokumentum · v5.0 (2026-10-02)

**Élő demó:** https://daekon-ship.github.io/slisz-klaudia/
**GitHub:** https://github.com/daekon-ship/slisz-klaudia

---

## 0. v5.0 — a saját képek visszatérnek, generatív réteggel egyesítve

A látványterv most **az öt eredeti képet** használja (a v2-ből visszaállítva, web-optimalizált méretben), a v3–v4 generatív vonalrajz-motorja felette él tovább:

- **Hero** — a `klaudia-hero.jpg` fényáztatott alakja halvány arany-fátyol alatt; felette az Élet virága + izzó vörös szívmag generatív réteg
- **Rólam** — portré + a v2-ből átment, valós bemutatkozó szöveg
- **Galéria** — mind az 5 eredeti kép aszimmetrikus album-kompozícióban, képjelleg-szerinti kivágásokkal
- **Ősformák** — négy élő vonalrajz-kártya (metszet-vonalak, porszem-stipple) megmaradt
- **Szimbólum** — a `sziv-elet-viragaban.jpg` körül forgó pálya-gyűrű
- **WOW sáv** — generatív rózsablond-ablak (minden betöltéskor új)
- **Mozgás-kapcsoló** a láblécben (Windows MinAnimate-kvirk elleni védelem megmaradt)

## 1. Mit kaptál

| Fájl | Mi ez? |
|---|---|
| **`latvanyterv-egyfajlban.html`** | ⭐ **AZ ÁTADHATÓ VERZIÓ.** Egyetlen fájl, minden kép beágyazva. Küldd el bárhogy (e-mail, Messenger, pendrive) — dupla kattintásra megnyílik böngészőben, internet sem kell hozzá. |
| `index.html` + `css/` + `js/` + `assets/img/` | A „műhelybeli", szerkeszthető változat — ebben dolgozunk tovább. |
| `assets/img/` | `favicon.svg`, `og-image.png` + **az 5 eredeti kép** optimalizált változata: `klaudia-hero.jpg`, `klaudia-portre.jpg`, `arany-virag.jpg`, `elet-viraga.jpg`, `sziv-elet-viragaban.jpg`. Az eredeti, felbontásos fájlok a gyökérben maradnak (gitignore). |
| `.daekon/` | Belső munkadokumentáció: döntések, QA-napló, projektállapot. (Nem kell átadni.) |

## 2. Hogyan nézd meg (3 lépés)

1. Nyisd meg böngészőben a **`latvanyterv-egyfajlban.html`**-t (dupla katt).
2. **Görgetj végig** — az animációk, a parallax és a hover-ek az élő élmény részei.
3. Próbáld ki mobilon is (a fájlt megnyithatod telefonon is), és a jobb felső hamburger menüt.

## 3. Az oldal felépítése

| Szekció | Vizuál | Szerep |
|---|---|---|
| HERO | fotó (klaudia-hero) + generatív Élet virága + vörös szívmag | Nagy nyitó kompozíció, élő porszemek |
| Manifestó | — | Csendes átvezetés, soronkénti belépéssel |
| Rólam | portré + badge | Valós bemutatkozás |
| Ősformák | 4 élő vonalrajz-kártya | A motívumok nyelvtana |
| Galéria | 5 eredeti kép, aszimmetrikus album-rács | A saját művek, képjelleg-szerinti kivágással |
| WOW sáv | generatív rózsablond (mindig új) | Full-screen pillanat |
| Szimbólum | szív-mandala fotó + forgó pálya-gyűrű | 3 jelentésréteg |
| Szemlélet | — | 3 irányadó elv |
| Kapcsolat / CTA | — | **Hamarosan állapot** — lásd lent |

## 4. Mi NINCS benne (és miért)

Az átadási elv: **semmi kitalált adat.** Amíg nincs forrás, az oldalon nem szerepel:
- e-mail, telefonszám, cím, nyitvatartás
- szolgáltatáslista, árak
- vélemények, mérföldkövek, statisztikák
- (v5.0-tól Klaudia öt saját képe az oldal része — csak ezek, más kép nem kerül fel.)

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
- ✅ `prefers-reduced-motion` támogatás (a footer kapcsolóval felülbírálható)
- ✅ SEO alapok (title, description, OG tag-ek), tematikus favicon
- ⚠️ A Google Fonts (Fraunces, Manrope) hálózatról töltődik — offline is működik, csak tartalék betűtípussal

## 8. Üzenet Klaudiának (másolható)

> Kedves Klaudia!
>
> Elkészítettem a vizuális világod bemutató látványtervét — az öt saját képedet egyetlen, egységes képi univerzummá komponáltam.
>
> **Megtekintés (internet kell hozzá):** https://daekon-ship.github.io/slisz-klaudia/
>
> **Ha ez nem elérhető:** csatolmányban küldöm a `latvanyterv-egyfajlban.html` fájlt — azt csak meg kell nyitni, internet nélkül is működik.
>
> Amit érdemes figyelni rajta: a nyitó képernyő lassan „vonul be” — görgetve az oldal folyamatosan él. A galériában az egyes képekre ha rámutatsz, feliratuk előtűnik. Mobilon a jobb felső három csík nyitja a menüt.
>
> Ez első körben bemutatóanyag: a végső elérhetőségek (e-mail, telefon, közösségi oldalak) és az esetleges szolgáltatásleírások a te visszajelzésed után kerülnek rá. Semmit nem találtam ki helyetted — minden, amit látsz, a saját képeidből és világodból jön.
>
> Várom a reakciódat: mi tetszik, mit változtatnál, mi az, amit másképp képzelj el.

## 9. Következő lépések (javaslat)

1. Klaudia visszajelzése a látványtervre (szín, szövegek, sorrend)
2. Valós elérhetőségek + esetleges szolgáltatásleírások begyűjtése
3. Domain + hosting döntés → élesítés (FTP-vel: `deploy/FTP-UTMUTATO.md`)
4. Bővítési opciók: EN nyelvű verzió, Instagram feed, kiállítás-/webshop-modul később
