'use strict'

exports.up = async (knex) => {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')

  await knex.schema.createTable('task_lists', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'))
    table.text('name').unique().notNullable()
    table.text('description').nullable()
    table.boolean('completed').defaultTo(false)

    table.uuid('user_id').notNullable()

    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())

    table.foreign('user_id').references('users.id')
  })
}

exports.down = async (knex) => {
  await knex.schema.dropTable('task_lists')
}
