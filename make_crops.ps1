Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Image]::FromFile('d:\001\2772.jpg')

function SaveCrop($x, $y, $w, $h, $filename) {
    $crop = New-Object System.Drawing.Bitmap $w, $h
    $g = [System.Drawing.Graphics]::FromImage($crop)
    $srcRect = New-Object System.Drawing.Rectangle $x, $y, $w, $h
    $destRect = New-Object System.Drawing.Rectangle 0, 0, $w, $h
    $g.DrawImage($img, $destRect, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)
    $crop.Save("d:\001\$filename", [System.Drawing.Imaging.ImageFormat]::Jpeg)
    $g.Dispose()
    $crop.Dispose()
}

SaveCrop 180 180 880 170 "crop_header.jpg"
SaveCrop 60 740 980 160 "crop_q9.jpg"
SaveCrop 60 930 980 150 "crop_q12.jpg"
SaveCrop 60 1045 980 180 "crop_q13.jpg"

$img.Dispose()
Write-Output "Perfect crops created."
