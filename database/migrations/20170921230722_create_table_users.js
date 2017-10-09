exports.up = (knex, Promise) => {
  return knex.schema.createTable('users', (table) => {
    table.increments('id')

    table.integer('user_type_id').unsigned()
    .references('user_type.id').onDelete('SET NULL')

    table.string('uuid').notNullable()
    table.string('name').notNullable()
    table.string('last_name').notNullable()
    table.string('photo').notNullable()
    table.string('email').unique().notNullable()
    table.bigint('ruc').unsigned()
    table.string('phone').unsigned()
    table.string('dni')
    table.string('secure_password')
    table.string('password_salt')
    table.string('token_email_verification')
    table.string('token_password_recovery')
    table.string('access_token', 1000)
    table.string('refresh_token', 1000)
    table.boolean('is_email_verified').defaultTo(false)
    table.boolean('is_archived').defaultTo(false)
    table.timestamps(false, true)
    table.datetime('archived_at')
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('users')
}
