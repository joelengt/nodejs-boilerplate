import crypto from 'crypto'

export const encryptPassword = (password, salt) => {
  let buffer = Buffer.from(salt, 'base64')

  return crypto
  .pbkdf2Sync(password, buffer, 10000, 64, 'sha1')
  .toString('base64')
}
