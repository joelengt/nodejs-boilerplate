import {usersService} from '/services'
import messages from '../messages'
import crypto from 'crypto'
import uuid from 'uuid'
import jwt from 'jsonwebtoken'

import {
  noop,
  authtenticatePassword,
  encryptPassword,
  isValidEmail
} from '/utils'

var debug = require('debug')('assistance-service:controllers:auth')

class AuthController {
  async login (req, res) {
    // Get body data
    let user = {
      email: req.body.email,
      password: req.body.password
    }

    // Validate email format
    if (!isValidEmail(user.email)) {
      let payload = {success: false}
      return res['400'](payload, 'El formato de email no es valido')
    }

    // Validate body data
    if (!user.email || !user.password) {
      let payload = {success: false}
      return res['400'](payload, messages.userCreateBadRequest)
    }

    try {
      // validate user in data base
      let userFound = await usersService.getByEmail(user.email)

      // find by email
      if (userFound.status !== 200) {
        let payload = {success: false}
        return res['400'](payload, 'El campo email no es valido')
      }

      // validate password
      let isAuthenticate = await authtenticatePassword(user.password, userFound.data.item.password_salt, userFound.data.item.secure_password)

      // Evaluate if auth
      if (!isAuthenticate) {
        let payload = {success: false}
        return res['400'](payload, 'El campo password no es valido')
      }

      let payload = {
        access_token: userFound.data.item.access_token,
        refresh_token: userFound.data.item.refresh_token,
        userAccess: userFound.data.item.user_type_id,
        name: userFound.data.item.name,
        photo: userFound.data.item.photo,
      }

      return res.ok(payload, 'Usuario Autentificado')
    } catch (err) {
      let payload = {success: false}
      return res['500'](payload, err)
    }
  }

  async signup (req, res) {
    try {
      let userService = await usersService.create(req.body)
      if (userService.status !== 201) {
        return res[`${userService.status}`]({success: false}, userService.message)
      }

      let payload = userService.data
      return res['201'](payload, userService.message)
    } catch (err) {
      return res['500']({success: false}, err)
    }
  }
}

export default AuthController
