# SLISZ KLAUDIA — FTP feltöltő
# Használat:
#   powershell -File deploy\ftp-deploy.ps1                 # egyfájlos: latvanyterv-egyfajlban.html -> index.html
#   powershell -File deploy\ftp-deploy.ps1 -Structure multi # index.html + css/ + js/ + assets/
param(
  [ValidateSet("single","multi")]
  [string]$Structure = "single"
)

$ErrorActionPreference = 'Stop'
$root = Split-Path $PSScriptRoot -Parent
$credPath = Join-Path $root 'deploy\ftp-credentials.ps1'

if (-not (Test-Path $credPath)) {
  Write-Host "HIÁNYZIK: deploy\ftp-credentials.ps1" -ForegroundColor Red
  Write-Host "Másold a deploy\ftp-config.example.ps1-et és töltsd ki az adataiddal."
  exit 1
}
. $credPath

$protocol = if ($UseSsl) { "ftps" } else { "ftp" }
$base = "$protocol`://$FtpHost$FtpRemoteDir"

function Upload-File([string]$localPath, [string]$remoteName) {
  $uri = "$base$remoteName"
  Write-Host "  ↑ $localPath -> $uri"
  if ($UseSsl) {
    # FTPS:証明書-ellenőrzés rugalmasan (önaláírt is jó legyen)
    add-type @"
    using System.Net;
    public class TrustAll : ICertificatePolicy {
      public bool CheckValidationResult(ServicePoint sp, System.Security.Cryptography.X509Certificates.X509Certificate cert, WebRequest req, int problem) { return true; }
    }
"@
    [System.Net.ServicePointManager]::CertificatePolicy = New-Object TrustAll
    [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.SecurityProtocolType]::Tls12
    $request = [Net.FtpWebRequest]::Create($uri)
    $request.Method = [Net.WebRequestMethods+Ftp]::UploadFile
    $request.Credentials = New-Object Net.NetworkCredential($FtpUser, $FtpPass)
    $request.EnableSsl = $true
    $request.UseBinary = $true
    $request.UsePassive = $true
    $data = [IO.File]::ReadAllBytes($localPath)
    $request.ContentLength = $data.Length
    $rs = $request.GetRequestStream()
    $rs.Write($data, 0, $data.Length)
    $rs.Close()
    $resp = $request.GetResponse()
    $resp.Close()
  } else {
    # Sima FTP a beépített cmdlet-tel
    $wincred = "ftp://$([uri]::EscapeDataString($FtpUser))`:$([uri]::EscapeDataString($FtpPass))@$FtpHost$FtpRemoteDir$remoteName"
    Invoke-WebRequest -Uri $wincred -Method Put -InFile $localPath -ContentType "application/octet-stream" | Out-Null
  }
}

Write-Host "== SLISZ KLAUDIA FTP deploy ($Structure) ==" -ForegroundColor Cyan

if ($Structure -eq "single") {
  Upload-File (Join-Path $root "latvanyterv-egyfajlban.html") "index.html"
} else {
  Upload-File (Join-Path $root "index.html") "index.html"
  Upload-File (Join-Path $root "css\style.css") "css/style.css"
  Upload-File (Join-Path $root "js\main.js") "js/main.js"
  foreach ($img in @("klaudia-hero.jpg","klaudia-portre.jpg","arany-virag.jpg","elet-viraga.jpg","sziv-elet-viragaban.jpg")) {
    Upload-File (Join-Path $root "assets\img\$img") "assets/img/$img"
  }
}

Write-Host "KÉSZ. Ellenőrizd böngészőben: http(s)://$FtpHost" -ForegroundColor Green
