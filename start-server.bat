@echo off
echo =============================================
echo   Radha Rani Store - Local Development Server
echo =============================================
echo.

REM Try Python 3 first
where python >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo Starting server on http://localhost:8000
    echo Press Ctrl+C to stop.
    echo.
    start http://localhost:8000
    python -m http.server 8000
    exit /b
)

REM Try Python 2
where python2 >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo Starting server on http://localhost:8000
    echo Press Ctrl+C to stop.
    echo.
    start http://localhost:8000
    python2 -m SimpleHTTPServer 8000
    exit /b
)

REM Try Node.js npx serve
where npx >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo Starting server with npx serve on http://localhost:3000
    echo Press Ctrl+C to stop.
    echo.
    start http://localhost:3000
    npx serve . -p 3000
    exit /b
)

echo =============================================
echo ERROR: Neither Python nor Node.js found.
echo.
echo To run this website locally, install either:
echo   - Python: https://www.python.org/downloads/
echo   - Node.js: https://nodejs.org/
echo.
echo Or open with VS Code Live Server extension.
echo =============================================
pause
