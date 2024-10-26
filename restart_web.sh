#!/bin/sh

git pull origin main
cd todo-pro-web/
docker build -t rockyj/todo-pro-web .
cd ..
docker-compose -f docker-compose-prod.yml restart todo-pro-web
