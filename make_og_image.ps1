# OG-kép gyártása: 1200x630 crop a hero fotóból + méret optimalizálás
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing

$src = Join-Path $PWD 'assets\img\klaudia-hero.jpg'
$dst = Join-Path $PWD 'assets\img\og-image.jpg'

$orig = [System.Drawing.Image]::FromFile($src)
Write-Host ("forrás: {0}x{1}" -f $orig.Width, $orig.Height)

$tw = 1200; $th = 630
# cover-crop: a képet a cél képarányra töltjük, középre igazítva, enyhén felül (arc pozíció)
$cropAr = $tw / $th
$srcAr = $orig.Width / $orig.Height

if ($srcAr -gt $cropAr) {
  # forrás szélesebb → magasság tölt
  $sh = $orig.Height; $sw = [int]($sh * $cropAr)
  $sx = [int](($orig.Width - $sw) / 2); $sy = 0
} else {
  # forrás magasabb → szélesség tölt; függőleges eltolás felülről 25%
  $sw = $orig.Width; $sh = [int]($sw / $cropAr)
  $sx = 0; $sy = [int](($orig.Height - $sh) * 0.25)
}

$bmp = New-Object System.Drawing.Bitmap($tw, $th)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$dstRect = New-Object System.Drawing.Rectangle(0, 0, $tw, $th)
$srcRect = New-Object System.Drawing.Rectangle($sx, $sy, $sw, $sh)
$g.DrawImage($orig, $dstRect, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)
$g.Dispose()

# JPEG minőség 82
$codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$ep = New-Object System.Drawing.Imaging.EncoderParameters(1)
$ep.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]82)
$bmp.Save($dst, $codec, $ep)
$bmp.Dispose(); $orig.Dispose()

$kb = [math]::Round((Get-Item $dst).Length / 1KB)
Write-Host "KÉSZ: og-image.jpg ($kb KB)"
