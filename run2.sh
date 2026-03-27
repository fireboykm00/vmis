#!/bin/bash

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

# Java and Maven paths
export JAVA_HOME=~/.sdkman/candidates/java/21.0.8-tem
export PATH=$JAVA_HOME/bin:$HOME/.sdkman/candidates/maven/current/bin:$PATH

PROJECT_ROOT="$(cd "$(dirname "$0")" && pwd)"

show_usage() {
    echo -e "${BLUE}VMIS Development Runner${NC}"
    echo ""
    echo "Usage: ./run.sh <command>"
    echo ""
    echo "Commands:"
    echo "  dev       Run both backend and frontend"
    echo "  backend   Run only backend"
    echo "  frontend  Run only frontend"
    echo "  stop      Stop all running services"
    echo "  logs      Show backend logs"
    echo "  status    Check running services"
    echo ""
    echo "Examples:"
    echo "  ./run.sh dev        # Start full dev environment"
    echo "  ./run.sh backend    # Start backend only"
    echo "  ./run.sh frontend   # Start frontend only"
}

start_backend() {
    echo -e "${YELLOW}Starting Backend...${NC}"
    cd "$PROJECT_ROOT/backend"
    
    mkdir -p data logs
    
    nohup mvn spring-boot:run > logs/app.log 2>&1 &
    BACKEND_PID=$!
    
    echo "Backend starting (PID: $BACKEND_PID)..."
    
    # Wait for backend to be ready
    echo -n "Waiting for backend..."
    for i in {1..30}; do
        if curl -s http://localhost:8080/api/health > /dev/null 2>&1; then
            break
        fi
        sleep 1
        echo -n "."
    done
    echo ""
    echo -e "${GREEN}Backend running at http://localhost:8080${NC}"
    echo "  - API: http://localhost:8080/api"
    echo "  - H2 Console: http://localhost:8080/h2-console"
}

start_frontend() {
    echo -e "${YELLOW}Starting Frontend...${NC}"
    cd "$PROJECT_ROOT/frontend"
    
    nohup pnpm dev > ../frontend.log 2>&1 &
    FRONTEND_PID=$!
    
    echo "Frontend starting (PID: $FRONTEND_PID)..."
    
    # Wait for frontend to be ready
    echo -n "Waiting for frontend..."
    for i in {1..20}; do
        if curl -s http://localhost:5173 > /dev/null 2>&1; then
            break
        fi
        sleep 1
        echo -n "."
    done
    echo ""
    echo -e "${GREEN}Frontend running at http://localhost:5173${NC}"
}

stop_services() {
    echo -e "${YELLOW}Stopping services...${NC}"
    
    pkill -f "spring-boot" 2>/dev/null
    pkill -f "VmisApplication" 2>/dev/null
    pkill -f "mvn" 2>/dev/null
    pkill -f "vite" 2>/dev/null
    pkill -f "pnpm" 2>/dev/null
    
    echo -e "${GREEN}All services stopped${NC}"
}

show_logs() {
    if [ -f "$PROJECT_ROOT/backend/logs/app.log" ]; then
        tail -50 "$PROJECT_ROOT/backend/logs/app.log"
    else
        echo -e "${RED}No backend logs found${NC}"
    fi
}

check_status() {
    echo -e "${BLUE}VMIS Services Status:${NC}"
    echo ""
    
    # Check backend
    if curl -s http://localhost:8080/api/health > /dev/null 2>&1; then
        echo -e "  Backend:  ${GREEN}Running${NC} (http://localhost:8080)"
    else
        echo -e "  Backend:  ${RED}Not running${NC}"
    fi
    
    # Check frontend
    if curl -s http://localhost:5173 > /dev/null 2>&1; then
        echo -e "  Frontend: ${GREEN}Running${NC} (http://localhost:5173)"
    else
        echo -e "  Frontend: ${RED}Not running${NC}"
    fi
}

case "${1:-}" in
    dev)
        start_backend
        start_frontend
        echo ""
        echo "=========================================="
        echo -e "${GREEN}VMIS is fully running!${NC}"
        echo "=========================================="
        echo "  Backend:  http://localhost:8080"
        echo "  Frontend: http://localhost:5173"
        echo "  API:      http://localhost:8080/api"
        echo ""
        echo "Default users:"
        echo "  admin / admin123"
        echo "  nurse / nurse123"
        echo "=========================================="
        ;;
    backend)
        start_backend
        echo -e "${GREEN}Backend started!${NC}"
        ;;
    frontend)
        start_frontend
        echo -e "${GREEN}Frontend started!${NC}"
        ;;
    stop)
        stop_services
        ;;
    logs)
        show_logs
        ;;
    status)
        check_status
        ;;
    *)
        show_usage
        ;;
esac