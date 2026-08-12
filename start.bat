@echo off
title ModaFlex - Carrito de compras
cd /d "%~dp0"

if not exist backend\node_modules (
    echo Instalando dependencias del backend...
    cd backend
    call npm install
    cd ..
)

echo Iniciando servidor en http://localhost:3000
start "ModaFlex Backend" cmd /k "cd /d "%~dp0backend" && npm start"

timeout /t 3 /nobreak > nul
start "" "%~dp0index.html"

echo.
echo Tienda abierta en tu navegador. Cierra la ventana "ModaFlex Backend" para apagar el servidor.
pause
