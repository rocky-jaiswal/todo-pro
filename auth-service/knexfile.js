'use strict'

const dbConfiguration = {
  client: 'postgresql',
  useNullAsDefault: true,
  connection: process.env.DB_CONN,
  pool: {
    min: 12,
    max: 12,
  },
  migrations: {
    directory: './db/migrations',
    tableName: 'knex_migrations',
  },
  seeds: {
    directory: './db/seeds',
  },
}

module.exports = {
  development: dbConfiguration,
  test: dbConfiguration,
  staging: dbConfiguration,
  production: dbConfiguration,
}
