# SLISZ KLAUDIA — Executive mentor
## Személyes bemutatkozó oldal · Átadási dokumentum · v7.0 (2026-10-02)

**Élő oldal:** https://daekon-ship.github.io/slisz-klaudia/
**GitHub:** https://github.com/daekon-ship/slisz-klaudia

---

## 0. v7.0 — tartalmi alapcseréje: mentor-profil

Az oldal célja az **önfejlesztő szolgáltatások bemutatása és a jelentkezés segítése**.
A korábbi „vizuális alkotó / portfólió" tartalmi irány elhagyva — az ellenőrzött adatok:

- **Név:** Slisz Klaudia
- **Szerep:** Executive mentor, Mentor, Tag — SuperConscious World
- **Hely:** Budapest
- **E-mail:** klaudia.slisz@gmail.com (működő mailto-link)
- **Telefon:** +36 20 365 2410 (a nyilvános SCC-profil szerint; tel:-link)
- **Profil:** https://scc.world/hu/members/118
- **Jelvények:** Intuyching · Pénz · Mentor

A korábban kapott képek **dekorációként** jelennek meg (hero oldalkép, bemutatkozás-mellkép,
képcsík), nem „alkotásként" vannak feltüntetve. Szolgáltatáslista, ár, vélemény,
végzettség vagy eredményígéret **szándékosan nincs az oldalon** — amíg Klaudia meg nem
adja őket, semmi nem kerül fel.

## 1. Szerkezet

- **Hero** — név + executive mentor pozicionálás + Kapcsolatfelvétel (mailto) + SCC profil gomb; jobb oldalt dekoratív mandala-kép
- **Bemutatkozás** — rövid, csak ellenőrzött tények + jelvények + SCC profil link; dekoratív kép mellett
- **Képcsík** — 3 dekoratív kép (aria-hidden)
- **Kapcsolat** — Beszéljünk. + E-mail küldése / telefonszám / SCC profil gombok + szöveges elérhetőségek
- **Footer** — Slisz Klaudia · © 2026

## 2. Szerkesztési pontok

- **Szövegek / elérhetőségek:** `index.html`
- **Színek:** `css/style.css` `:root` (`--ivory`, `--graphite`, `--bronze`)
- **Egyfájlos offline változat:** `powershell -File make_qa_embedded.ps1`, majd
  `copy _qa_embedded.html latvanyterv-egyfajlban.html`
- **OG-kép:** `powershell -File make_og_image.ps1`

## 3. Közzététel

GitHub Pages él: minden push után ~1 percen belül frissül.

## 4. Technikai állapot (v7 QA)

- Overflow 0 @ 360 / 390 / 430 / 768 / 1440
- Konzol: 0 hiba; minden kép betölt
- Minden elérhetőség működő link (mailto / tel / https)
- `prefers-reduced-motion`: minden animáció kikapcsol
- Title / meta description / OG szövegek a mentor-profilra igazítva
