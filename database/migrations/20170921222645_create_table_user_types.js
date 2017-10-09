exports.up = (knex, Promise) => {
  return knex.schema.createTable('user_type', (table) => {
    table.increments('id')

    table.string('title')
    table.string('description')
    table.string('icon')
    table.boolean('read').defaultTo(false)
    table.boolean('write').defaultTo(false)

    table.timestamps(false, true)
    table.datetime('archived_at')
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('user_type')
}
