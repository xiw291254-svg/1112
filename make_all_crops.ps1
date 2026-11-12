Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Image]::FromFile('d:\001\2772.jpg')

# Let's crop each question precisely
# Header: 180 - 340
# Q1: 340 - 440
# Q2: 440 - 520
# Q3: 520 - 610
# Q4: 610 - 680
# Q5: 680 - 750
# Q6: 750 - 820
# Q7: 820 - 890
# Q8: 890 - 970
# Q9: 970 - 1100 (Wait, let's check!)

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

SaveCrop 180 180 880 160 "crop_header.jpg"
SaveCrop 60 340 980 100 "crop_q1.jpg"
SaveCrop 60 435 980 90 "crop_q2.jpg"
SaveCrop 60 520 980 95 "crop_q3.jpg"
SaveCrop 60 610 980 75 "crop_q4.jpg"
SaveCrop 60 680 980 75 "crop_q5.jpg"
SaveCrop 60 750 980 75 "crop_q6.jpg"
SaveCrop 60 820 980 75 "crop_q7.jpg"
SaveCrop 60 890 980 80 "crop_q8.jpg"
SaveCrop 60 965 980 140 "crop_q9.jpg"
SaveCrop 60 1100 980 80 "crop_q10.jpg"
SaveCrop 60 1175 980 95 "crop_q11.jpg"
SaveCrop 60 1265 980 85 "crop_q12.jpg"
SaveCrop 60 1345 980 95 "crop_q13.jpg"

$img.Dispose()
Write-Output "All 13 crops generated."

