#!/bin/bash
cd "$(dirname "$0")"

if [ ! -d "backend/node_modules" ]; then
  echo "Instalando dependencias del backend..."
  (cd backend && npm install)
fi

echo "Iniciando servidor en http://localhost:3000"
(cd backend && npm start) &

sleep 3
xdg-open index.html > /dev/null 2>&1 || open index.html > /dev/null 2>&1

wait
