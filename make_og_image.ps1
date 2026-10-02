# ============================================================
# OG-kép generátor v6 — ivory/grafit editorial, fotóval
# 1200x630 PNG · Használat: powershell -NoProfile -ExecutionPolicy Bypass -File make_og_image.ps1
# ============================================================
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing

$w = 1200; $h = 630
$bmp = New-Object System.Drawing.Bitmap($w, $h)
$g   = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = 'AntiAlias'
$g.InterpolationMode = 'HighQualityBicubic'

function Col($hex, $a = 255) {
  $hex = $hex.TrimStart('#')
  return [System.Drawing.Color]::FromArgb($a,
    [Convert]::ToInt32($hex.Substring(0,2),16),
    [Convert]::ToInt32($hex.Substring(2,2),16),
    [Convert]::ToInt32($hex.Substring(4,2),16))
}

$IVORY  = Col 'f5f1e9'
$GRAPH  = Col '201d1a'
$BRONZE = Col 'a8874f'

# háttér: ivory
$g.Clear($IVORY)

# --- fotó: klaudia-hero, jobbra 46% szélességben, teljes magasság, arányos kitöltés ---
$photoPath = 'assets/img/klaudia-hero.jpg'
$photo = [System.Drawing.Image]::FromFile((Resolve-Path $photoPath))
$pw = [int]($w * 0.46)
$px = $w - $pw
# cover-kitöltés a fotó középső sávjából (a kép 736x736)
$scale = [Math]::Max($pw / $photo.Width, $h / $photo.Height)
$sw = $w / $scale; $sh = $h / $scale
$sx = [Math]::Max(0, [int](($photo.Width - $sw) * 0.5))
$sy = [Math]::Max(0, [int](($photo.Height - $sh) * 0.22))
$destRect = New-Object System.Drawing.Rectangle($px, 0, $pw, $h)
$srcRect  = New-Object System.Drawing.Rectangle($sx, $sy, [int]$sw, [int]$sh)
$g.DrawImage($photo, $destRect, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)
$photo.Dispose()

# --- bal oldal: tipó ---
$nameFont  = New-Object System.Drawing.Font('Georgia', 92, [System.Drawing.FontStyle]::Regular)
$italicFont= New-Object System.Drawing.Font('Georgia', 92, [System.Drawing.FontStyle]::Italic)
$roleFont  = New-Object System.Drawing.Font('Arial', 21, [System.Drawing.FontStyle]::Bold)
$subFont   = New-Object System.Drawing.Font('Arial', 22, [System.Drawing.FontStyle]::Regular)

$g.DrawString('SLISZ', $nameFont, (New-Object System.Drawing.SolidBrush($GRAPH)), (New-Object System.Drawing.PointF(78, 170)))
$g.DrawString('Klaudia', $italicFont, (New-Object System.Drawing.SolidBrush($BRONZE)), (New-Object System.Drawing.PointF(78, 272)))

# "VIZUÁLIS ALKOTÓ" címsor
$roleY = 408
$g.DrawString('V I Z U Á L I S   A L K O T Ó', $roleFont, (New-Object System.Drawing.SolidBrush($BRONZE)), (New-Object System.Drawing.PointF(82, $roleY)))

# alcím
$g.DrawString('Fény, forma és belső történetek képekben.', $subFont, (New-Object System.Drawing.SolidBrush($GRAPH)), (New-Object System.Drawing.PointF(82, 470)))

# arany vonal
$pen = New-Object System.Drawing.Pen($BRONZE, 2)
$g.DrawLine($pen, 82, 556, 210, 556)

$bmp.Save("$PSScriptRoot\assets\img\og-image.png", [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Dispose(); $g.Dispose()
Write-Output 'OK: assets/img/og-image.png (v6 editorial)'
