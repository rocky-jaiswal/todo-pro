'use strict'

import { writeFileSync } from 'fs'
import { randomBytes } from 'crypto'

const generateEnvFile = () => {
  const RANDOM_DB_PASSWORD = randomBytes(256).toString('hex').substring(0, 32)
  const RANDOM_TOKEN_PASSWORD = randomBytes(256).toString('hex').substring(0, 32)
  const RANDOM_AUTH_LOCK_PASSWORD = randomBytes(256).toString('hex').substring(0, 32)

  const filePath = `.env`

  console.log(`Writing to - ${filePath}`)

  const contents = `
    POSTGRES_PASSWORD="${RANDOM_DB_PASSWORD}"
    AUTH_SERVICE_SECRET="${RANDOM_AUTH_LOCK_PASSWORD}"
    DB_CONN_AUTH="postgresql://app_dev:${RANDOM_DB_PASSWORD}@db:5432/auth_service_dev"
    DB_CONN_APP="postgresql://app_dev:${RANDOM_DB_PASSWORD}@db:5432/todo_pro_dev"
    AUTH_SERVER_URL="http://auth-service:9090"
    MAIN_API_URL="http://api-service:8080"
    WEB_TOKEN_SECRET="${RANDOM_TOKEN_PASSWORD}"
  `.trim()

  writeFileSync(filePath, contents)

  console.log(`Use this password for locking the auth-service "development" env file - ${RANDOM_AUTH_LOCK_PASSWORD}`)
}

generateEnvFile()