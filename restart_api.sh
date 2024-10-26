#!/bin/sh

git pull origin main
cd todo-pro-api/
./gradlew bootBuildImage --imageName=rockyj/todo-pro-api
cd ..
docker-compose -f docker-compose-prod.yml restart todo-pro-api
