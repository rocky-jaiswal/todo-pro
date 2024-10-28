#!/bin/sh

git pull origin main
cd auth-service/
docker build -t rockyj/auth-service .
cd ..
docker-compose -f docker-compose-prod.yml restart auth-service
