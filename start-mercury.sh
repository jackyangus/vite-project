#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Set up environment variables
echo -e "${GREEN}Setting up environment variables...${NC}"
./env-setup.sh

# Check if .env file exists
if [ ! -f .env ]; then
  echo -e "${RED}Error: .env file not found. Cannot continue.${NC}"
  exit 1
fi

# Export environment variables from .env file
echo -e "${GREEN}Loading environment variables from .env file...${NC}"
export $(grep -v '^#' .env | xargs)

# Function to show usage
show_usage() {
  echo -e "${YELLOW}Usage: $0 [dev|prod|docker]${NC}"
  echo -e "  dev    - Run in development mode"
  echo -e "  prod   - Run in production mode"
  echo -e "  docker - Run using Docker Compose"
  exit 1
}

# Check for command line argument
if [ $# -eq 0 ]; then
  show_usage
fi

# Process argument
case "$1" in
  dev)
    echo -e "${GREEN}Starting Mercury in development mode...${NC}"
    mvn spring-boot:run -Dspring-boot.run.profiles=dev
    ;;
  prod)
    echo -e "${GREEN}Starting Mercury in production mode...${NC}"
    mvn spring-boot:run -Dspring-boot.run.profiles=prod
    ;;
  docker)
    echo -e "${GREEN}Starting Mercury using Docker Compose...${NC}"
    docker-compose up
    ;;
  *)
    show_usage
    ;;
esac 