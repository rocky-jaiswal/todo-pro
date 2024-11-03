exports.up = async (knex) => {
  knex.schema.table('tasks', (table) => {
    table.dropUnique('tasks_name_unique')
  })

  knex.schema.table('task_lists', (table) => {
    table.dropUnique('task_lists_name_unique')
  })
}

exports.down = async () => {
  return Promise.resolve()
}
