#!/bin/bash
set -e

echo "Setting up Mercury database in local MySQL..."

# Default values
DB_NAME="Mercury"
DB_USER="mercury"
DB_PASS="mercury"

# Create database and user with privileges
echo "Creating database and user..."
mysql -u root -p <<EOF
CREATE DATABASE IF NOT EXISTS $DB_NAME;
CREATE USER IF NOT EXISTS '$DB_USER'@'localhost' IDENTIFIED BY '$DB_PASS';
CREATE USER IF NOT EXISTS '$DB_USER'@'%' IDENTIFIED BY '$DB_PASS';
GRANT ALL PRIVILEGES ON $DB_NAME.* TO '$DB_USER'@'localhost';
GRANT ALL PRIVILEGES ON $DB_NAME.* TO '$DB_USER'@'%';
FLUSH PRIVILEGES;
EOF

echo "Initializing database schema..."
mysql -u $DB_USER -p$DB_PASS $DB_NAME < init-scripts/01-init.sql

echo "Database setup complete!"
echo "You can now run the application with: npm run java:dev" 