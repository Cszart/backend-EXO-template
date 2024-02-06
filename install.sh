#!/bin/bash

# In case SH file doesnt creat .env file you can create it manually and just copy this variables
POSTGRES_HOST="ec2-3-217-14-181.compute-1.amazonaws.com"
POSTGRES_PORT="5432"
POSTGRES_USER="wurhfjxedwysmc"
POSTGRES_PASSWORD="9a7a3094614e7c98de7479cc98f62b1d437d1720978796a5fedf0a8bf1fb8c8c"
POSTGRES_DATABASE="d2etbstc2806m7"
DATABASE_URL="postgres://wurhfjxedwysmc:9a7a3094614e7c98de7479cc98f62b1d437d1720978796a5fedf0a8bf1fb8c8c@ec2-3-217-14-181.compute-1.amazonaws.com:5432/d2etbstc2806m7"

echo 'Installing notes app backend'

# Install node and npm if not
apt-get update
apt-get install nodejs
apt-get install npm

echo "Using node version: $(node --version)"
echo "Using npm version: $(npm --version)"

# Write .env file
cat > .env
echo $POSTGRES_HOST > .env
echo $POSTGRES_PORT >> .env
echo $POSTGRES_USER >> .env
echo $POSTGRES_PASSWORD >> .env
echo $POSTGRES_DATABASE >> .env
echo $DATABASE_URL >> .env

# Install the app and run it
npm install
npm run start:prod
