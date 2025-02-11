exports.up = async (knex) => {
  await knex.schema.table('tasks', (table) => {
    table.dropUnique('name')
  })

  await knex.schema.table('task_lists', (table) => {
    table.dropUnique('name')
  })
}

exports.down = async () => {
  return Promise.resolve()
}
