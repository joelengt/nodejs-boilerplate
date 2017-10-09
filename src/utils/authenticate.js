import {encryptPassword} from './'
var debug = require('debug')('riqra-service-users:utils:authenticate')

export function authtenticatePassword (password, passwordSalt, securePassword) {
  var passwordTemp = encryptPassword(password, passwordSalt)
  return passwordTemp === securePassword
}
