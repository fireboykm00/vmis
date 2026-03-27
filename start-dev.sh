#!/bin/bash

echo "🚀 Starting VMIS Development Environment..."

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Start backend
echo -e "${YELLOW}Starting Backend...${NC}"
cd backend
mkdir -p data logs
./mvnw spring-boot:run &
BACKEND_PID=$!

# Wait for backend to start
echo "Waiting for backend to start..."
sleep 15

# Start frontend
echo -e "${GREEN}Starting Frontend...${NC}"
cd ../frontend
pnpm dev &
FRONTEND_PID=$!

echo ""
echo "=========================================="
echo -e "${GREEN}VMIS is running!${NC}"
echo "=========================================="
echo "Backend: http://localhost:8080"
echo "Frontend: http://localhost:5173"
echo ""
echo "Default users:"
echo "  Admin:  admin / admin123"
echo "  Nurse:  nurse / nurse123"
echo ""
echo "Press Ctrl+C to stop all services"
echo "=========================================="

# Trap signals to kill all processes
cleanup() {
  echo ""
  echo "Stopping services..."
  kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
  exit 0
}

trap cleanup SIGINT SIGTERM

# Wait for any process to exit
wait