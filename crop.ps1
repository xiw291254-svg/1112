Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Image]::FromFile('d:\001\2772.jpg')

# Let's crop into 3 sections:
# Section 1: Q1 - Q5 (y: 200 to 600)
# Section 2: Q6 - Q9 (y: 550 to 950)
# Section 3: Q10 - Q13 (y: 900 to 1350)

function CropImage($y, $h, $filename) {
    $crop = New-Object System.Drawing.Bitmap 1108, $h
    $g = [System.Drawing.Graphics]::FromImage($crop)
    $srcRect = New-Object System.Drawing.Rectangle 0, $y, 1108, $h
    $destRect = New-Object System.Drawing.Rectangle 0, 0, 1108, $h
    $g.DrawImage($img, $destRect, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)
    $crop.Save("d:\001\$filename", [System.Drawing.Imaging.ImageFormat]::Jpeg)
    $g.Dispose()
    $crop.Dispose()
}

CropImage 200 450 "section1.jpg"
CropImage 600 400 "section2.jpg"
CropImage 950 450 "section3.jpg"

$img.Dispose()
Write-Output "Sections saved."

