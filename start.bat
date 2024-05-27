@echo off
cd C:\Users\PC\gitex-presentation
pm2 start deploy.json
pm2 save -f
timeout /t 5 /nobreak > NUL
start "" "msedge.exe" "http://localhost:3000"
