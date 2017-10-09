process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const _ = require('lodash')
const path = require('path')
const home = require('os').homedir()
const envPath = path.join(home, '.env')

if (process.env.NODE_ENV === 'development') {
  require('dotenv').config()
} else {
  require('dotenv').config({path: envPath})
}

const base = {
  client: 'pg',
  version: '9.6',
  connection: {
    host: process.env.POSTGRE_SQL_HOST,
    port: process.env.POSTGRE_SQL_PORT,
    user: process.env.POSTGRE_SQL_USER,
    password: process.env.POSTGRE_SQL_PASSWORD,
    database: process.env.POSTGRE_SQL_DATABASE
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: `${__dirname}/database/migrations`
  },
  seeds: {
    directory: `${__dirname}/database/seeds`
  }
}

module.exports = {
  development: _.assign({debug: true}, base),
  staging: base,
  test: base,
  production: base
}
