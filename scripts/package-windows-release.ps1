$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $PSScriptRoot
$packageJsonPath = Join-Path $projectRoot "package.json"
$packageJson = Get-Content $packageJsonPath -Raw | ConvertFrom-Json

$version = $packageJson.version
$sourceExe = Join-Path $projectRoot "src-tauri\target\release\start-your-python.exe"

if (-not (Test-Path $sourceExe)) {
  throw "Tauri executable not found at $sourceExe. Run 'npm run tauri:build' first."
}

$releaseRoot = Join-Path $projectRoot "release\windows"
$bundleName = "StartYourPython-v$version-win-x64"
$bundleDir = Join-Path $releaseRoot $bundleName
$bundleExe = Join-Path $bundleDir "StartYourPython.exe"
$bundleReadme = Join-Path $bundleDir "README.txt"
$bundleZip = Join-Path $releaseRoot "$bundleName.zip"

if (Test-Path $bundleDir) {
  Remove-Item $bundleDir -Recurse -Force
}

if (Test-Path $bundleZip) {
  Remove-Item $bundleZip -Force
}

New-Item -ItemType Directory -Path $bundleDir -Force | Out-Null
Copy-Item $sourceExe $bundleExe -Force

$readmeContent = @"
Start Your Python v$version

How to run
1. Double-click StartYourPython.exe
2. If Windows SmartScreen appears, choose More info -> Run anyway

Notes
- This package contains the Tauri desktop build for Windows x64.
- The app is a PyCharm-inspired Python learning workspace.
"@

Set-Content -Path $bundleReadme -Value $readmeContent -Encoding UTF8
Compress-Archive -Path $bundleDir -DestinationPath $bundleZip -CompressionLevel Optimal

Write-Host "Windows release prepared:"
Write-Host "  Folder: $bundleDir"
Write-Host "  Zip:    $bundleZip"
