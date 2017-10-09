import {
  noop
} from '/utils'

var sql = require('/initializers/knex')

export const verifyEmail = async (email) => {
  let user = await sql('users')
  .where({email})
  .limit(1)
  .spread(noop)

  let status
  let msg
  if (user !== undefined) {
    status = 400
    msg = `Ya existe un usuario con el correo ${email}`
  } else {
    status = 200
    msg = `El email ${email} esta disponible`
  }

  let payload = {
    status: status,
    message: msg
  }
  return payload
}
