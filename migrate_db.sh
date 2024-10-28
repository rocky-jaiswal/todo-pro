#!/bin/sh

git pull origin main
# cd db-helper/
# docker build -t rockyj/db-helper .
# cd ..
docker-compose -f docker-compose-prod.yml restart db-helper
