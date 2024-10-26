#!/bin/sh

AUTH_SERVICE_SECRET=`cat .secret | tr -d '\n'`
POSTGRES_PASSWORD=`openssl rand -hex 32`
WEB_TOKEN_SECRET=`openssl rand -hex 32`

# Build .env file for docker-compose
touch .env

echo "POSTGRES_PASSWORD=$POSTGRES_PASSWORD" >> .env
echo "AUTH_SERVICE_SECRET=$AUTH_SERVICE_SECRET" >> .env
echo "DB_CONN_AUTH="postgresql://app_dev:$POSTGRES_PASSWORD@db:5432/auth_service_dev"" >> .env
echo "DB_CONN_APP="postgresql://app_dev:$POSTGRES_PASSWORD@db:5432/todo_pro_dev"" >> .env


# DB data directory
mkdir -p /opt/app/postgres/data

# Setup web
cd ./todo-pro-web/

touch .env

echo "AUTH_SERVER_URL="http://auth-service:9090"" >> .env
echo "MAIN_API_URL="http://todo-pro-api:8080"" >> .env
echo "WEB_TOKEN_SECRET=$WEB_TOKEN_SECRET" >> .env

docker build -t rockyj/todo-pro-web .

# Setup API
cd ../todo-pro-api/

./gradlew bootBuildImage --imageName=rockyj/todo-pro-api

# Start docker compose in production mode now

