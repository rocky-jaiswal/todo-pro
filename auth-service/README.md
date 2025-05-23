# Auth Service

## What is this?

Basically a fast Node.js based JWT service, which also supports Google OAuth. I use it for a lot of personal projects to solve authentication.

## Setup

1. Run `node bin/generateKeyPair.mjs <environment>` to generate JWT signing keys and update src/public/.well-known -> "jwks.json"
2. Copy secret omitted from command above (keyid & key password) in "secrets/<_environment_>.env" (e.g. secrets/development.env)
3. Generate a strong secret/password somehow (e.g. `crypto.randomUUID().replaceAll('-', '').substring(0, 16)`)
4. Run `node bin/lockSecret.mjs <environment> <secret>` to encrypt secrets, use secret/password from step 3 here (encryption uses Node GPG)
5. Run `yarn dev` to start service in dev mode (DB should already be running on docker)

## Common HTTP requests (using HTTPIE)

- `http POST http://localhost:9090/v1/users email="ryan@example.com" password="123456" confirmedPassword="123456"`
- `http POST http://localhost:9090/v1/sessions email="ryan@example.com" password="123456"`
- `http GET http://localhost:9090/v1/user authorization:"token <jwt>"`
