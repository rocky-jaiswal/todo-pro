# Todo Pro

## What

A simple CRUD application to play around with - Next.js + TRPC & Spring Boot + JPA on Kotlin

## Run application locally

- __Technically, we need to simply run `docker-compose up`__ (or `docker-compose up --build` for the first run)

## But ...

- But for a new setup we need to pre-populate the "known" secrets in `.env` file since `auth-service` needs secure secrets
- To generate and set new secrets run - 
  - `cd auth-service && node bin/generateKeyPair.mjs`. This generates a new password protected RSA key pair for JWT signing (and new JWKS to be copied)
  - Copy the pem key file secret in the `auth-service/secrets/development.env` file and update JWKS file
  - Now run - `node generate_dev_env_file.mjs` and note the random secret
  - Using this new random secret, in auth-service also run `node bin/lockSecret.mjs development <secret>` to "lock" the secrets in the "auth-service"
  - Finally run `docker-compose up --build`

## Setup for local development

- Comment `api-service` and `web-service` in the `docker-compose.yml` file
- Run `docker-compose up --build`. This will start the DB, migrate the DB and start a Node.js JWT+JWKS Auth service
- Go to the API (todo-pro-api) and run the Spring Boot application with Gradle (I usually do this from IntelliJ Idea)
- Go the the Web app (todo-pro-web) and run the Next.js app with `yarn dev`
- This allows for quick feedback loop

## Under developement

- This application is under development
