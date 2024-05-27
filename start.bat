@echo off
cd C:\Users\PC\gitex-presentation || exit /b
pm2 start deploy.json || exit /b
pm2 save -f || exit /b
timeout /t 5 /nobreak > NUL || exit /b
start "" "msedge.exe" "http://localhost:3000"