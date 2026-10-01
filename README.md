# SLISZ KLAUDIA — Vizuális világ
## Bemutató látványterv · Átadási dokumentum · v3.0 (2026-10-01)

**Élő demó:** https://daekon-ship.github.io/slisz-klaudia/
**GitHub:** https://github.com/daekon-ship/slisz-klaudia

---

## 0. v3.0 — fotó-mentes, generatív vonalrajz (újragépelve)

Az ügyfél kérésére az oldal **nem használja Klaudia fotóit**. Helyette minden motívumot **élő, generatív vonalrajz** jelenít meg (canvas):

- **Hero** — az Élet virága + szív + spirál + fényhaló nagy generatív kompozíciója, betöltéskor vonalanként megrajzolva, lassan lebegő aranyporszemekkel
- **Ősformák** — négy élő vonalrajz-kártya: Fény (koncentrikus gyűrűk), Hajtás (botanikai szár-levél), Szív, Aritmia (aranyspirál)
- **Alkotások** — interaktív műlista: kattintásra/érintésre a nagy vászon a kiválasztott mű vonalrajzával „él fel” (progresszív rajzolás)
- **WOW sáv** — minden betöltéskor újra „születő” arany-bloom: ~80 véletlen ív a tökéletes gyűrűk körül (sosem ugyanaz)
- **Editorial tipográfia** — Fraunces + Cormorant Garamond + Manrope; óriás hero, outline sorok, függőleges ghost-szó
- **Film-grain, cursor-fény, marquee, footer óriás név** — megtartva a v2-ből
- **Mozgás-kapcsoló** a láblécben (Windows MinAnimate-kvirk elleni védelem megmaradt)

## 1. Mit kaptál

| Fájl | Mi ez? |
|---|---|
| **`latvanyterv-egyfajlban.html`** | ⭐ **AZ ÁTADHATÓ VERZIÓ.** Egyetlen fájl, minden kép beágyazva. Küldd el bárhogy (e-mail, Messenger, pendrive) — dupla kattintásra megnyílik böngészőben, internet sem kell hozzá. |
| `index.html` + `css/` + `js/` + `assets/img/` | A „műhelybeli", szerkeszthető változat — ebben dolgozunk tovább. |
| `assets/img/` | Fotó-mentes grafika: `favicon.svg` (Élet virága), `og-image.png` (generatív megosztókép). A fotók **nincsenek használatban** — az eredeti fájlok a gyökérben érintetlenek, de fel sem töltődnek releváns helyre. |
| `.daekon/` | Belső munkadokumentáció: döntések, QA-napló, projektállapot. (Nem kell átadni.) |

## 2. Hogyan nézd meg (3 lépés)

1. Nyisd meg böngészőben a **`latvanyterv-egyfajlban.html`**-t (dupla katt).
2. **Görgetj végig** — az animációk, a parallax és a hover-ek az élő élmény részei.
3. Próbáld ki mobilon is (a fájlt megnyithatod telefonon is), és a jobb felső hamburger menüt.

## 3. Az oldal felépítése

| Szekció | Vizuál | Szerep |
|---|---|---|
| HERO | generatív Élet virága + szív + spirál canvas | Nagy nyitó kompozíció, élő porszemek |
| Manifestó | — | Csendes átvezetés, soronkénti belépéssel |
| Ősformák | 4 élő vonalrajz-kártya | A motívumok nyelvtana |
| Alkotások | interaktív váltó-vászon | Az 5 mű vonalrajz-értelmezése |
| WOW sáv | generatív arany-bloom (mindig új) | Full-screen pillanat |
| Szimbólum | forgó Élet virága SVG | 3 jelentésréteg |
| Szemlélet | — | 3 irányadó elv |
| Kapcsolat / CTA | — | **Hamarosan állapot** — lásd lent |

## 4. Mi NINCS benne (és miért)

Az átadási elv: **semmi kitalált adat.** Amíg nincs forrás, az oldalon nem szerepel:
- e-mail, telefonszám, cím, nyitvatartás
- szolgáltatáslista, árak
- vélemények, mérföldkövek, statisztikák
- **és — a kérés szerint — Klaudia fotói sem.** A vizuális világot a motívumai generatív vonalrajzként hordozzák; ha később mégis képeket szeretne, a v2-es fotós verzió a git előzményből 1 paranccsal visszahozható.

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
