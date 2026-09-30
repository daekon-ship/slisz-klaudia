# FTP/FTPS beállítások — PÉLDÁNY
# 1) Másold át:  copy deploy\ftp-config.example.ps1 deploy\ftp-credentials.ps1
# 2) Töltsd ki a szolgáltatód (pl. tárhelyszolgáltató, cPanel) adataival
# 3) A ftp-credentials.ps1 a .gitignore-ban van — soha nem kerül fel GitHubra!

$FtpHost     = "ftp.sajat-domain.hu"      # vagy IP
$FtpUser     = "felhasznalonev"
$FtpPass     = "jelszo"
$FtpRemoteDir = "/public_html/"           # gyökér, ahová az index.html kerüljön
$UseSsl      = $true                      # FTPS (ajánlott). $false = sima FTP

# Opcionális: csak a publikus fájlok kerülnek fel (ez az alapértelmezés)
$PublishFiles = @(
  @{ Local = "latvanyterv-egyfajlban.html"; Remote = "index.html" }  # az egyfájlos megy fel index.html-ként
)
# Ha a többfájlos szerkezetet szeretnéd feltölteni (index.html + css/ + js/ + assets/),
# hívd így:  powershell -File deploy\ftp-deploy.ps1 -Structure multi
