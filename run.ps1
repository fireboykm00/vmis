# VMIS Development Runner for Windows
# Usage: .\run.ps1 <command>

param(
    [string]$Command = "help"
)

$GREEN = ""
$YELLOW = ""
$BLUE = ""
$RED = ""
$NC = ""

# Detect if running in CI/headless
if ($env:CI -ne "true") {
    $GREEN = "`e[32m"
    $YELLOW = "`e[33m"
    $BLUE = "`e[34m"
    $RED = "`e[31m"
    $NC = "`e[0m"
}

$PROJECT_ROOT = $PSScriptRoot

function Show-Usage {
    Write-Host "${BLUE}VMIS Development Runner${NC}" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Usage: .\run.ps1 <command>"
    Write-Host ""
    Write-Host "Commands:"
    Write-Host "  dev       Run both backend and frontend"
    Write-Host "  backend   Run only backend"
    Write-Host "  frontend  Run only frontend"
    Write-Host "  stop      Stop all running services"
    Write-Host "  status    Check running services"
    Write-Host ""
    Write-Host "Examples:"
    Write-Host "  .\run.ps1 dev        # Start full dev environment"
    Write-Host "  .\run.ps1 backend    # Start backend only"
    Write-Host "  .\run.ps1 stop       # Stop all services"
}

function Start-Backend {
    Write-Host "${YELLOW}Starting Backend...${NC}" -ForegroundColor Yellow
    Set-Location "$PROJECT_ROOT\backend"

    if (-not (Test-Path "data")) { New-Item -ItemType Directory -Path "data" -Force | Out-Null }
    if (-not (Test-Path "logs")) { New-Item -ItemType Directory -Path "logs" -Force | Out-Null }

    Start-Process -FilePath "mvn" -ArgumentList "spring-boot:run" -NoNewWindow -Wait:$false

    Write-Host "${GREEN}Backend starting...${NC}" -ForegroundColor Green
    Write-Host "  Running at http://localhost:8080" -ForegroundColor Gray
}

function Start-Frontend {
    Write-Host "${YELLOW}Starting Frontend...${NC}" -ForegroundColor Yellow
    Set-Location "$PROJECT_ROOT\frontend"

    Start-Process -FilePath "pnpm" -ArgumentList "dev" -NoNewWindow -Wait:$false

    Write-Host "${GREEN}Frontend starting...${NC}" -ForegroundColor Green
    Write-Host "  Running at http://localhost:5173" -ForegroundColor Gray
}

function Stop-Services {
    Write-Host "${YELLOW}Stopping services...${NC}" -ForegroundColor Yellow

    # Kill Java/Maven processes
    Get-Process | Where-Object { $_.ProcessName -match "java|mvn" } | Stop-Process -Force -ErrorAction SilentlyContinue
    
    # Kill Node processes for frontend
    Get-Process | Where-Object { $_.ProcessName -match "node|vite" } | Stop-Process -Force -ErrorAction SilentlyContinue

    # Kill by port
    $8080 = Get-NetTCPConnection -LocalPort 8080 -ErrorAction SilentlyContinue
    if ($8080) { Stop-Process -Id $8080.OwningProcess -Force -ErrorAction SilentlyContinue }

    $5173 = Get-NetTCPConnection -LocalPort 5173 -ErrorAction SilentlyContinue
    if ($5173) { Stop-Process -Id $5173.OwningProcess -Force -ErrorAction SilentlyContinue }

    Write-Host "${GREEN}All services stopped${NC}" -ForegroundColor Green
}

function Check-Status {
    Write-Host "${BLUE}VMIS Services Status:${NC}" -ForegroundColor Cyan
    Write-Host ""

    try {
        $null = Invoke-WebRequest -Uri "http://localhost:8080/api/health" -UseBasicParsing -TimeoutSec 2 -ErrorAction Stop
        Write-Host "  Backend:  ${GREEN}Running${NC} (http://localhost:8080)" -ForegroundColor Green
    } catch {
        Write-Host "  Backend:  ${RED}Not running${NC}" -ForegroundColor Red
    }

    try {
        $null = Invoke-WebRequest -Uri "http://localhost:5173" -UseBasicParsing -TimeoutSec 2 -ErrorAction Stop
        Write-Host "  Frontend: ${GREEN}Running${NC} (http://localhost:5173)" -ForegroundColor Green
    } catch {
        Write-Host "  Frontend: ${RED}Not running${NC}" -ForegroundColor Red
    }
}

switch ($Command) {
    "dev" {
        Start-Backend
        Start-Location $PROJECT_ROOT
        Start-Frontend
        Write-Host ""
        Write-Host "==========================================" -ForegroundColor Cyan
        Write-Host "${GREEN}VMIS is fully running!${NC}" -ForegroundColor Green
        Write-Host "=========================================="
        Write-Host "  Backend:  http://localhost:8080"
        Write-Host "  Frontend: http://localhost:5173"
        Write-Host ""
        Write-Host "Default users:" -ForegroundColor Gray
        Write-Host "  admin / admin123" -ForegroundColor Gray
        Write-Host "  nurse / nurse123" -ForegroundColor Gray
    }
    "backend" {
        Start-Backend
    }
    "frontend" {
        Start-Frontend
    }
    "stop" {
        Stop-Services
    }
    "status" {
        Check-Status
    }
    default {
        Show-Usage
    }
}