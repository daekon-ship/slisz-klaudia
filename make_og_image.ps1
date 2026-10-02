# ============================================================
# OG-kép generátor v7 — mentor-profil (ivory, grafitszöveg)
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
$GRAY   = Col '45403a'

# háttér: ivory
$g.Clear($IVORY)

# --- dekoratív fotó: mandala jobbra, 38% szélesség, halványított ---
$photoPath = 'assets/img/sziv-elet-viragaban.jpg'
$photo = [System.Drawing.Image]::FromFile((Resolve-Path $photoPath))
$pw = [int]($w * 0.38)
$px = $w - $pw
$scale = [Math]::Max($pw / $photo.Width, $h / $photo.Height)
$sw = $w / $scale; $sh = $h / $scale
$sx = [Math]::Max(0, [int](($photo.Width - $sw) * 0.5))
$sy = [Math]::Max(0, [int](($photo.Height - $sh) * 0.5))
$destRect = New-Object System.Drawing.Rectangle($px, 0, $pw, $h)
$srcRect  = New-Object System.Drawing.Rectangle($sx, $sy, [int]$sw, [int]$sh)
$g.DrawImage($photo, $destRect, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)
$photo.Dispose()

# --- bal oldal: tipó ---
$nameFont  = New-Object System.Drawing.Font('Georgia', 88, [System.Drawing.FontStyle]::Regular)
$italicFont= New-Object System.Drawing.Font('Georgia', 88, [System.Drawing.FontStyle]::Italic)
$roleFont  = New-Object System.Drawing.Font('Arial', 20, [System.Drawing.FontStyle]::Bold)
$subFont   = New-Object System.Drawing.Font('Arial', 21, [System.Drawing.FontStyle]::Regular)

$g.DrawString('Slisz', $nameFont, (New-Object System.Drawing.SolidBrush($GRAPH)), (New-Object System.Drawing.PointF(74, 150)))
$g.DrawString('Klaudia', $italicFont, (New-Object System.Drawing.SolidBrush($BRONZE)), (New-Object System.Drawing.PointF(74, 252)))

$g.DrawString('E X E C U T I V E   M E N T O R', $roleFont, (New-Object System.Drawing.SolidBrush($BRONZE)), (New-Object System.Drawing.PointF(78, 392)))
$g.DrawString('SuperConscious World · Budapest', $subFont, (New-Object System.Drawing.SolidBrush($GRAY)), (New-Object System.Drawing.PointF(78, 440)))

# arany vonal
$pen = New-Object System.Drawing.Pen($BRONZE, 2)
$g.DrawLine($pen, 78, 540, 206, 540)

$bmp.Save("$PSScriptRoot\assets\img\og-image.png", [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Dispose(); $g.Dispose()
Write-Output 'OK: assets/img/og-image.png (v7 mentor)'
