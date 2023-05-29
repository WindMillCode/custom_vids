Param
(
    [Parameter(Mandatory = $true)] [string] $scriptUser
)

$path = $MyInvocation.MyCommand.Path
if (!$path) {$path = $psISE.CurrentFile.Fullpath}
if ($path)  {$path = Split-Path $path -Parent}

$gae = $path+"\meetup-gae.json"


Set-Location Env:

# dev
Set-Content -Path FLASK_BACKEND_ENV                          -Value "DEV"
Set-Content -Path STORAGE_EMULATOR_HOST                      -Value "http://localhost:9198"
Set-Content -Path AUTH_EMULATOR_HOST                         -Value "http://localhost:9099"
Set-Content -Path GOOGLE_APPLICATION_CREDENTIALS             -Value $gae

$RunScriptDir =   $path
$ProjectDir =  $RunScriptDir +  "\..\..\apps\zero\backend\FlaskApp"
Set-Location $ProjectDir
python app.py
# waitress-serve --listen=*:5000 --threads=100  app:app

Set-Location $RunScriptDir
./run_backend_dev.ps1 $scriptUser
