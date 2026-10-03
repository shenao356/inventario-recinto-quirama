# PowerShell Script para subir el repositorio a GitHub
# Usuario: shenao356
# Repositorio: inventario-recinto-quirama

$env:Path = [Environment]::GetEnvironmentVariable("Path", "User") + ";C:\Users\rmoralea\AppData\Local\Programs\Git\cmd;C:\Program Files\Git\cmd;" + $env:Path

Write-Host "===============================================================" -ForegroundColor Cyan
Write-Host "  SUBIR A GITHUB: HOTEL RECINTO QUIRAMA INVENTARIO" -ForegroundColor Green
Write-Host "  Usuario: shenao356" -ForegroundColor Yellow
Write-Host "  Repositorio: inventario-recinto-quirama" -ForegroundColor Yellow
Write-Host "===============================================================" -ForegroundColor Cyan
Write-Host ""

# 1. Verificar Git
$gitCmd = Get-Command git -ErrorAction SilentlyContinue
if (-not $gitCmd) {
    Write-Host "No se encontró git.exe en PATH. Buscando en AppData..." -ForegroundColor Yellow
    if (Test-Path "C:\Users\rmoralea\AppData\Local\Programs\Git\cmd\git.exe") {
        $gitExe = "C:\Users\rmoralea\AppData\Local\Programs\Git\cmd\git.exe"
    } else {
        Write-Host "Error: Git no está instalado." -ForegroundColor Red
        pause
        exit 1
    }
} else {
    $gitExe = "git"
}

# 2. Configurar Git
& $gitExe config user.name "shenao356"
& $gitExe config user.email "shenao356@users.noreply.github.com"

# 3. Commit
& $gitExe add .
& $gitExe commit -m "Actualizacion de sistema de inventario Recinto Quirama"

# 4. Remote
& $gitExe remote remove origin 2>$null
& $gitExe remote add origin "https://github.com/shenao356/inventario-recinto-quirama.git"
& $gitExe branch -M main

Write-Host ""
Write-Host "Subiendo a GitHub (https://github.com/shenao356/inventario-recinto-quirama)..." -ForegroundColor Cyan
& $gitExe push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "===============================================================" -ForegroundColor Green
    Write-Host "  ¡SUBIDO CON ÉXITO A GITHUB!" -ForegroundColor Green
    Write-Host "  Repositorio: https://github.com/shenao356/inventario-recinto-quirama" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "  Para publicar tu aplicación web en internet (GitHub Pages):" -ForegroundColor White
    Write-Host "  1. Abre: https://github.com/shenao356/inventario-recinto-quirama/settings/pages" -ForegroundColor Yellow
    Write-Host "  2. En 'Build and deployment -> Branch', elige 'main' y carpeta '/ (root)'" -ForegroundColor Yellow
    Write-Host "  3. Haz clic en 'Save'" -ForegroundColor Yellow
    Write-Host "  4. Tu web estará lista en: https://shenao356.github.io/inventario-recinto-quirama/" -ForegroundColor Green
    Write-Host "===============================================================" -ForegroundColor Green
} else {
    Write-Host ""
    Write-Host "No se pudo realizar el push automático directo." -ForegroundColor Yellow
    Write-Host "Si aún no has creado el repositorio en GitHub, créalo en:" -ForegroundColor White
    Write-Host "https://github.com/new (Nombre: inventario-recinto-quirama)" -ForegroundColor Cyan
}

Write-Host ""
Write-Host "Presiona cualquier tecla para salir..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
