#!/bin/bash

# Single Server Deployment Script for VMIS
# Run on your server (Ubuntu/Debian)

set -e

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${GREEN}=== VMIS Single Server Deployment ===${NC}"

# Update and install Docker if needed
if ! command -v docker &> /dev/null; then
    echo -e "${YELLOW}Installing Docker...${NC}"
    apt update && apt install -y docker.io docker-compose
fi

# Create deployment directory
DEPLOY_DIR="/opt/vmis"
mkdir -p $DEPLOY_DIR

echo "Copying files to $DEPLOY_DIR..."
cp -r backend frontend docker-compose.yml $DEPLOY_DIR/

cd $DEPLOY_DIR

# Create environment file
if [ ! -f .env ]; then
    cat > .env << 'EOF'
# Generate a secure JWT secret: openssl rand -base64 32
JWT_SECRET=your-super-secure-jwt-secret-here-change-me
JWT_EXPIRATION=86400000
VITE_API_URL=http://localhost/api
EOF
    echo -e "${YELLOW}Created .env file. Edit it before running!${NC}"
fi

# Build and start containers
echo -e "${YELLOW}Building and starting containers...${NC}"
docker-compose up --build -d

# Show status
echo ""
echo -e "${GREEN}=== Deployment Complete ===${NC}"
echo "Services:"
echo "  - Frontend: http://localhost"
echo "  - Backend:  http://localhost/api"
echo "  - Health:   http://localhost/api/health"
echo ""
echo "Run 'docker-compose logs -f' to view logs"
echo "Run 'docker-compose down' to stop"