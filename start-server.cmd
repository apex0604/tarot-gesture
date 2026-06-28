@echo off
cd /d "%~dp0"
start "" powershell -NoProfile -WindowStyle Hidden -Command "Start-Sleep -Milliseconds 800; Start-Process 'http://127.0.0.1:5173'"
"C:\Program Files\nodejs\node.exe" server.mjs
