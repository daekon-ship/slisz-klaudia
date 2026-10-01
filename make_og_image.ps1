# ============================================================
# OG-kép generátor (fotó-mentes, GDI+) — 1200x630 PNG
# Használat: powershell -NoProfile -ExecutionPolicy Bypass -File make_og_image.ps1
# ============================================================
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing

$w = 1200; $h = 630
$bmp = New-Object System.Drawing.Bitmap($w, $h)
$g   = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = 'AntiAlias'

function Col($hex, $a = 255) {
  $hex = $hex.TrimStart('#')
  return [System.Drawing.Color]::FromArgb($a,
    [Convert]::ToInt32($hex.Substring(0,2),16),
    [Convert]::ToInt32($hex.Substring(2,2),16),
    [Convert]::ToInt32($hex.Substring(4,2),16))
}

$INK   = Col '17101f'; $INK2 = Col '241831'; $GOLD = Col 'c9a35c'
$GOLD2 = Col 'e9d3a1'; $PAPER = Col 'f3efe9'; $RED = Col 'b8524a'

# háttér: radial sötét tinta
$rect = New-Object System.Drawing.Rectangle(0,0,$w,$h)
$bgBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush($rect, (Col '2a1c38'), $INK, 55)
$g.FillRectangle($bgBrush, $rect)

# világító folt a virág mögött
function RadialSpot($cx, $cy, $radius, $alpha) {
  $gp = New-Object System.Drawing.Drawing2D.GraphicsPath
  $gp.AddEllipse($cx-$radius, $cy-$radius, $radius*2, $radius*2)
  $pgb = New-Object System.Drawing.Drawing2D.PathGradientBrush($gp)
  $pgb.CenterColor = [System.Drawing.Color]::FromArgb($alpha, $GOLD)
  $pgb.SurroundColors = @([System.Drawing.Color]::FromArgb(0, $GOLD))
  $g.FillPath($pgb, $gp)
}
RadialSpot 880 300 330 70

# Élet virága vonalrajz
function DrawCircle($cx, $cy, $r, $penW, $alpha, [bool]$dash = $false) {
  $pen = New-Object System.Drawing.Pen(([System.Drawing.Color]::FromArgb($alpha, $GOLD)), $penW)
  if ($dash) { $pen.DashStyle = [System.Drawing.Drawing2D.DashStyle]::Dash; $pen.DashPattern = @(3.0, 9.0) }
  $g.DrawEllipse($pen, $cx-$r, $cy-$r, $r*2, $r*2)
  $pen.Dispose()
}
$FCX = 880; $FCY = 300; $FR = 92
DrawCircle $FCX $FCY $FR 2 235
DrawCircle $FCX ($FCY-$FR) $FR 2 235
DrawCircle ($FCX+79.7) ($FCY-46) $FR 2 235
DrawCircle ($FCX+79.7) ($FCY+46) $FR 2 235
DrawCircle $FCX ($FCY+$FR) $FR 2 235
DrawCircle ($FCX-79.7) ($FCY+46) $FR 2 235
DrawCircle ($FCX-79.7) ($FCY-46) $FR 2 235
DrawCircle $FCX $FCY 172 1.2 110 $true
DrawCircle $FCX $FCY 212 1 75 $true
# mag izzás (vörös szívmag — az oldal egyetlen telített pontja)
RadialSpot $FCX $FCY 46 210
$g.FillEllipse((New-Object System.Drawing.SolidBrush($RED)), ($FCX-13), ($FCY-13), 26, 26)
$g.FillEllipse((New-Object System.Drawing.SolidBrush($GOLD2)), ($FCX-4), ($FCY-4), 8, 8)

# porszem-felhő a virág körül
$rnd = New-Object System.Random(7)
1..90 | ForEach-Object {
  $ang = $rnd.NextDouble() * [Math]::PI * 2
  $rr = 100 + ($rnd.NextDouble() * 150)
  $x = $FCX + [Math]::Cos($ang) * $rr
  $y = $FCY + [Math]::Sin($ang) * $rr * 0.86
  $sz = 1 + $rnd.NextDouble() * 2.2
  $al = [int](40 + $rnd.NextDouble() * 130)
  $dotBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb($al, $GOLD2))
  $g.FillEllipse($dotBrush, ($x-$sz/2), ($y-$sz/2), $sz, $sz)
  $dotBrush.Dispose()
}

# szív-motívum jobb alul — vörösen, az új arányhoz igazítva
$heartPen = New-Object System.Drawing.Pen(([System.Drawing.Color]::FromArgb(200, $RED)), 3)
$heartFill = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(120, $RED))
$g.TranslateTransform(1050, 512); $g.ScaleTransform(2.3, 2.3)
$hp = New-Object System.Drawing.Drawing2D.GraphicsPath
$hp.AddBezier(-16,-3, -16,-13, -5,-13, 0,-6.5)
$hp.AddBezier(0,-6.5, 5,-13, 16,-13, 16,-3)
$hp.AddBezier(16,-3, 16,5, 6,10, 0,15)
$hp.AddBezier(0,15, -6,10, -16,5, -16,-3)
$g.FillPath($heartFill, $hp)
$g.DrawPath($heartPen, $hp)
$g.ResetTransform()
$heartPen.Dispose(); $heartFill.Dispose()

# tipográfia
$fName = New-Object System.Drawing.FontFamily('Georgia')
$fTitle = New-Object System.Drawing.Font($fName, 64, [System.Drawing.FontStyle]::Bold)
$fSub   = New-Object System.Drawing.Font($fName, 28, ([System.Drawing.FontStyle]::Italic))
$fSm    = New-Object System.Drawing.Font('Verdana', 13, ([System.Drawing.FontStyle]::Regular))
$fXs    = New-Object System.Drawing.Font('Verdana', 10.5, ([System.Drawing.FontStyle]::Regular))

$g.DrawString('Slisz ',   $fTitle, (New-Object System.Drawing.SolidBrush($PAPER)), 90, 178)
$tw = $g.MeasureString('Slisz ', $fTitle).Width
$g.DrawString('Klaudia',  $fTitle, (New-Object System.Drawing.SolidBrush($GOLD2)), (90+$tw-14), 178)
$g.DrawString('vizuális világa', $fSub, (New-Object System.Drawing.SolidBrush($GOLD)), 94, 285)

$sepPen = New-Object System.Drawing.Pen($GOLD, 2)
$g.DrawLine($sepPen, 94, 386, 150, 386); $sepPen.Dispose()

$fmt = New-Object System.Drawing.StringFormat
$g.DrawString('FÉNY  ·  HAJTÁS  ·  SZÍV  ·  ARITMIA', $fSm,
  (New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(170, $PAPER))), 92, 415)
$g.DrawString('BEMUTATÓ LÁTVÁNYTERV — GENERATÍV VONALRAJZ', $fXs,
  (New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(100, $PAPER))), 94, 452)

$out = 'assets/img/og-image.png'
$bmp.Save($out, [System.Drawing.Imaging.ImageFormat]::Png)
$g.Dispose(); $bmp.Dispose()
Write-Host "OK: $out"
