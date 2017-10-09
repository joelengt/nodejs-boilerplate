import {noop} from '~/src/utils'
var debug = require('debug')('riqra-service-users:is-email-available')
var knex = require('~/src/initializers/knex')

module.exports = async function (value) {
  let client = await knex('user')
  .select(['access_token', 'refresh_token'])
  .where('email', '=', value)
  .limit(1)
  .spread(noop)

  var isAvailable = client !== undefined

  debug('isAvailable', isAvailable)
  let payload = {
    isAvailable,
    client
  }
  return payload
}
