#!/bin/sh

git pull origin main
cd auth-service/
docker build -f Dockerfile-prod -t rockyj/auth-service .

cd ..
docker-compose -f docker-compose-prod.yml restart auth-service
