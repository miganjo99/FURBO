#!/bin/bash

echo "Iniciando el proceso de actualización en GitHub..."

git add .

git commit -m "update excel"

git push origin main

echo "Proceso completado."
