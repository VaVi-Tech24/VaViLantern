$ErrorActionPreference = 'Stop'
Set-Location -LiteralPath $PSScriptRoot
$lanternJdk = Get-ChildItem -LiteralPath 'tools/jdk' -Directory | Select-Object -First 1
if (-not $lanternJdk) { throw 'Install Java 17 and Android SDK 36, then build in Android Studio. See README.md.' }
$env:JAVA_HOME = $lanternJdk.FullName
$env:ANDROID_HOME = (Resolve-Path 'tools/android-sdk').Path
$env:GRADLE_USER_HOME = Join-Path $PSScriptRoot 'tools/gradle-cache'
New-Item -ItemType Directory -Force 'tools/tmp' | Out-Null
$lanternSocketPath = (Resolve-Path 'tools/tmp').Path
$env:JAVA_TOOL_OPTIONS = '-Djdk.net.unixdomain.tmpdir="' + $lanternSocketPath + '"'
& 'tools/gradle-8.13/bin/gradle.bat' --no-daemon assembleDebug bundleRelease
if ($LASTEXITCODE -ne 0) { throw 'Android build failed. See output above.' }
