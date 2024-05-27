@echo off
cd C:\Users\PC\gitex-presentation
pm2 start deploy.json
pm2 -f save
start msedge "http://localhost:3000"