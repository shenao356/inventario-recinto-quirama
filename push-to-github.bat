@echo off
chcp 65001 > nul
echo ===============================================================
echo   PUBLICADOR AUTOMATICO A GITHUB - RECINTO QUIRAMA
echo   Usuario GitHub: shenao356
echo   Repositorio: inventario-recinto-quirama
echo ===============================================================
echo.

set PATH=%PATH%;C:\Users\rmoralea\AppData\Local\Programs\Git\cmd;C:\Users\rmoralea\AppData\Local\Microsoft\WinGet\Packages\GitHub.cli_Microsoft.Winget.Source_8wekyb3d8bbwe\bin;C:\Program Files\Git\cmd

echo [1/4] Verificando instalacion de Git...
git --version
if %errorlevel% neq 0 (
    echo ERROR: Git no fue detectado en las rutas esperadas.
    pause
    exit /b %errorlevel%
)

echo.
echo [2/4] Preparando repositorio local...
if not exist ".git" (
    git init
    git branch -M main
)

git config user.name "shenao356"
git config user.email "shenao356@users.noreply.github.com"

git remote remove origin >nul 2>&1
git remote add origin https://github.com/shenao356/inventario-recinto-quirama.git

echo.
echo [3/4] Agregando archivos y creando commit...
git add .
git commit -m "Sistema de Control de Inventario Habitaciones - Recinto Quirama"

echo.
echo [4/4] Subiendo a GitHub (https://github.com/shenao356/inventario-recinto-quirama)...
echo NOTA: Si es la primera vez que subes codigo, se abrira una ventana de GitHub para autorizar.
echo.
git push -u origin main

if %errorlevel% equ 0 (
    echo.
    echo ===============================================================
    echo   ¡SUBIDA EXITOSA A GITHUB!
    echo   Repositorio: https://github.com/shenao356/inventario-recinto-quirama
    echo.
    echo   Para activar la pagina web publica en vivo:
    echo   1. Entra a https://github.com/shenao356/inventario-recinto-quirama/settings/pages
    echo   2. En Branch elige 'main' y carpeta '/ (root)', haz clic en Save.
    echo   3. Tu web estara en: https://shenao356.github.io/inventario-recinto-quirama/
    echo ===============================================================
) else (
    echo.
    echo Hubo un inconveniente al hacer push directo.
    echo Asegurate de haber creado el repositorio 'inventario-recinto-quirama' en tu cuenta de GitHub:
    echo https://github.com/new
)

echo.
pause
