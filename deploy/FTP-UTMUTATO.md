# FTP feltöltés — 3 lépésben (magyarul)

## 1. Hitelesítési fájl elkészítése

Klónozd a példányt és töltsd ki:

```
copy deploy\ftp-config.example.ps1 deploy\ftp-credentials.ps1
notepad deploy\ftp-credentials.ps1
```

A tárhelyszolgáltatód (pl. hosting panel) adja ezeket:
- **$FtpHost** — FTP-kiszolgáló (pl. `ftp.sajatdomain.hu`)
- **$FtpUser** / **$FtpPass** — belépési adatok
- **$FtpRemoteDir** — ahová a weboldal kerül (általában `/public_html/` vagy `/httpdocs/`)
- **$UseSsl** — hagyd `$true`-n, ha FTPS elérhető

> A `ftp-credentials.ps1` a `.gitignore`-ban van — soha nem kerül fel GitHubra.

## 2. Feltöltés

```powershell
# Gyors, bemutatóváltozat (egy fájl, minden kép beágyazva):
powershell -File deploy\ftp-deploy.ps1

# Teljes szerkezet (index.html + css/ + js/ + assets/):
powershell -File deploy\ftp-deploy.ps1 -Structure multi
```

## 3. Ellenőrzés

Nyisd meg a böngészőben a domaint. Ha régi oldalt látod: **Ctrl+F5** (kemény újratöltés).

## Gyorshibaelhárítás

| Hiba | Ok | Megoldás |
|---|---|---|
| `530 Login incorrect` | rossz user/jelszó | másold újra a panelből |
| `550 Failed to change directory` | rossz $FtpRemoteDir | próbáld `/` vagy `/httpdocs/` |
| Üres oldal | az index.html nem a gyökérbe ment | ellenőrizd a távoli mappát |
| Betűtípus nem tölt | nincs internet | fallback betűtípus jön be, nem hiba |

## Ha saját domain kell a GitHub Pages-re is

1. Haladj: GitHub repo → Settings → Pages → Custom domain → add meg a domaint
2. A domain szolgáltatónál CNAME rekord: `www` → `daekon-ship.github.io` (vagy A rekordok: 185.199.108–111.153)
3. Várj a tanúsítvány kiadására (10–60 perc), pipáld az „Enforce HTTPS”-t
