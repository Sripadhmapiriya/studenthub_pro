@echo off
echo Starting StudentHub Pro Full Stack Application...
echo.

REM Start backend first
echo [1/2] Starting Spring Boot Backend...
cd "%~dp0backend"
start "StudentHub Backend" cmd /c "mvn spring-boot:run"

REM Wait a moment for backend to start initializing
timeout /t 5 /nobreak > nul

REM Start frontend
echo [2/2] Starting React Frontend...
cd "%~dp0studenthub_pro"
start "StudentHub Frontend" cmd /c "npm start"

echo.
echo Both applications are starting...
echo Backend will be available at: http://localhost:8080/api
echo Frontend will be available at: http://localhost:3000
echo.
echo Default Login Credentials:
echo Username: admin
echo Password: admin123
echo.
echo Press any key to close this window...
pause > nul