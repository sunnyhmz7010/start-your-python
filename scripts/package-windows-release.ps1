$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $PSScriptRoot
$packageJsonPath = Join-Path $projectRoot "package.json"
$packageJson = Get-Content $packageJsonPath -Raw | ConvertFrom-Json

$version = $packageJson.version
$sourceExe = Join-Path $projectRoot "src-tauri\target\release\start-your-python.exe"
$sourceContent = Join-Path $projectRoot "content"

if (-not (Test-Path $sourceExe)) {
  throw "Tauri executable not found at $sourceExe. Run 'npm run tauri:build' first."
}

if (-not (Test-Path $sourceContent)) {
  throw "Content directory not found at $sourceContent."
}

$releaseRoot = Join-Path $projectRoot "release\windows"
$bundleName = "StartYourPython-v$version-win-x64"
$stagingDir = Join-Path $releaseRoot "_portable"
$portableExe = Join-Path $stagingDir "Start Your Python.exe"
$bundleZip = Join-Path $releaseRoot "$bundleName.zip"

if (Test-Path $stagingDir) {
  Remove-Item $stagingDir -Recurse -Force
}

if (Test-Path $bundleZip) {
  Remove-Item $bundleZip -Force
}

New-Item -ItemType Directory -Path $stagingDir -Force | Out-Null
Copy-Item $sourceExe $portableExe -Force
Copy-Item $sourceContent (Join-Path $stagingDir "content") -Recurse -Force
Compress-Archive -Path (Join-Path $stagingDir "*") -DestinationPath $bundleZip -CompressionLevel Optimal
Remove-Item $stagingDir -Recurse -Force

Write-Host "Windows release prepared:"
Write-Host "  Zip: $bundleZip"
Write-Host "  Contains:"
Write-Host "    Start Your Python.exe"
Write-Host "    content/"
