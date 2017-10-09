
import uuid from 'uuid'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import _ from 'lodash'

import messages from '/messages'

import {
  noop,
  encryptPassword,
  verifyEmail,
  isValidEmail
} from '/utils'

var sql = require('/initializers/knex')
var tokenSecret = process.env.JWT_SECRET

const debug = require('debug')('assistance-service:repository:users')

class UserRepository {
  async getList () {
    try {
      // Find element updated
      let attributes = [
        'users.id AS id',
        'users.uuid AS uuid',
        'users.name AS name',
        'users.last_name AS last_name',
        'users.photo AS photo',
        'users.email AS email',
        'users.phone AS phone',
        'users.ruc AS ruc',
        'users.dni AS dni',
        'users.access_token AS access_token',
        'users.refresh_token AS refresh_token',
        'users.is_archived AS is_archived',
        'users.created_at AS created_at',
        'users.updated_at AS updated_at',
        'users.archived_at AS archived_at',
        'users.user_type_id AS user_type_id',
        'user_type.title AS user_type_title',
        'user_type.icon AS user_type_icon'
      ]

      // Get users from database
      let users = await sql('users')
      .select(attributes)
      .innerJoin('user_type', (qb) => {
        qb.on('user_type.id', 'users.user_type_id')
      })

      // Validate if users was found
      if (!users.length) {
        let payload = {
          status: 404,
          message: messages.usersItemsNotFound
        }
        return payload
      }

      let payload = {
        status: 200,
        data: {
          items: users
        },
        message: messages.usersItemsFound
      }

      return payload
    } catch (err) {
      let payload = {
        status: 500,
        message: err
      }
      return payload
    }
  }

  async create (userData) {
    // Validate email with format
    if (!isValidEmail(userData.email)) {
      let payload = {
        status: 400,
        message: 'Email not valid format'
      }
      return payload
    }

    try {
      // Get body data
      let user = {
        user_type_id: userData.user_type_id,
        uuid: uuid.v1(),
        name: userData.name,
        last_name: userData.last_name,
        email: userData.email,
        password: userData.password,
        photo: userData.photo || 'https://res.cloudinary.com/riqra/image/upload/profile.png'
      }

      // email verification
      let emailAvailable = await verifyEmail(user.email)
      if (emailAvailable.status === 400) {
        return emailAvailable
      }

      // create token email verification
      user.token_email_verification = jwt.sign(uuid.v1(), tokenSecret)

      // create encrypt password
      user.password_salt = crypto.randomBytes(16).toString('base64')
      user.secure_password = encryptPassword(user.password, user.password_salt)
      delete user.password

      // create token and refresh token - exp: 15 days
      let token = jwt.sign(user, tokenSecret, { expiresIn: 60 * 60 * 24 * 15 })
      let refreshToken = jwt.sign(uuid.v1(), tokenSecret)
      user.access_token = token
      user.refresh_token = refreshToken

      // Create new user
      let userCreate = await sql('users')
      .insert(user)
      .returning('*')
      .spread(noop)

      if (userCreate.status) {
        return userCreate
      }

      let userId = userCreate.id

      // Find element ads created
      let attributes = [
        'users.id AS id',
        'users.uuid AS uuid',
        'users.name AS name',
        'users.last_name AS last_name',
        'users.photo AS photo',
        'users.email AS email',
        'users.phone AS phone',
        'users.user_type_id AS user_type_id',
        'users.ruc AS ruc',
        'users.dni AS dni',
        'users.access_token AS access_token',
        'users.refresh_token AS refresh_token',
        'users.is_archived AS is_archived',
        'users.created_at AS created_at',
        'users.updated_at AS updated_at',
        'users.archived_at AS archived_at'
      ]

      let userItem = await sql('users')
      .select(attributes)
      .where('id', userId)
      .spread(noop)

      if (!userItem) {
        let payload = {
          status: 400,
          message: messages.usersItemsNotFound
        }
        return payload
      }

      // remove token_email_verification from payload
      userItem = _.omit(userItem, ['token_email_verification'])

      let payload = {
        status: 201,
        data: {
          item: userItem
        },
        message: messages.userItemCreated
      }

      return payload
    } catch (err) {
      let payload = {
        status: 500,
        message: err
      }
      return payload
    }
  }

  async getById (id) {
    try {
      let userId = id

      let attributes = [
        'users.id AS id',
        'users.uuid AS uuid',
        'users.name AS name',
        'users.last_name AS last_name',
        'users.photo AS photo',
        'users.email AS email',
        'users.phone AS phone',
        'users.ruc AS ruc',
        'users.dni AS dni',
        'users.access_token AS access_token',
        'users.refresh_token AS refresh_token',
        'users.is_archived AS is_archived',
        'users.created_at AS created_at',
        'users.updated_at AS updated_at',
        'users.archived_at AS archived_at',
        'users.user_type_id AS user_type_id',
        'user_type.title AS user_type_title',
        'user_type.icon AS user_type_icon'
      ]

      let userItem = await sql('users')
      .select(attributes)
      .innerJoin('user_type', (qb) => {
        qb.on('user_type.id', 'users.user_type_id')
      })
      .where({'users.id': userId})
      .limit(1)
      .spread(noop)

      // Validate element found
      if (userItem === undefined) {
        let payload = {
          status: 404,
          message: messages.usersItemsNotFound
        }
        return payload
      }

      let payload = {
        status: 200,
        data: {
          item: userItem
        },
        message: messages.usersItemsFound
      }

      return payload
    } catch (err) {
      let payload = {
        status: 500,
        message: err
      }
      return payload
    }
  }

  async getByEmail (email) {
    try {
      let userEmail = email

      let userItem = await sql('users')
      .innerJoin('user_type', (qb) => {
        qb.on('user_type.id', 'users.user_type_id')
      })
      .where({'users.email': userEmail})
      .limit(1)
      .spread(noop)

      // Validate element found
      if (userItem === undefined) {
        let payload = {
          status: 404,
          message: messages.usersItemsNotFound
        }
        return payload
      }

      let payload = {
        status: 200,
        data: {
          item: userItem
        },
        message: messages.usersItemsFound
      }

      return payload
    } catch (err) {
      let payload = {
        status: 500,
        message: err
      }
      return payload
    }
  }

  async updateById (userData, id) {
    try {
      // Get body data
      let currentUser = await sql('users')
      .where('id', id)
      .spread(noop)

      if (!currentUser) {
        let payload = {
          status: 404,
          message: messages.usersItemsNotFound
        }
        return payload
      }

      if (currentUser.email !== userData.email && userData.email) {
        let emailAvailable = await verifyEmail(userData.email)
        if (emailAvailable.status === 400) {
          return emailAvailable
        }
      }

      let userItemID = currentUser.id

      let user = {
        user_type_id: userData.user_type_id || currentUser.user_type_id,
        name: userData.name || currentUser.name,
        last_name: userData.last_name || currentUser.last_name,
        email: userData.email || currentUser.email,
        phone: userData.phone || currentUser.phone,
        ruc: userData.ruc || currentUser.ruc,
        dni: userData.dni || currentUser.dni,
        photo: userData.photo || currentUser.photo
      }

      // update attributes
      let userItemToUpdated = await sql('users')
      .update(user)
      .where({id: userItemID})

      // Validate element updated
      if (!userItemToUpdated) {
        let payload = {
          status: 400,
          message: messages.adsItemNotFound
        }
        return payload
      }

      // Find element updated
      let attributes = [
        'users.id AS id',
        'users.uuid AS uuid',
        'users.name AS name',
        'users.last_name AS last_name',
        'users.photo AS photo',
        'users.email AS email',
        'users.phone AS phone',
        'users.user_type_id AS user_type_id',
        'users.ruc AS ruc',
        'users.dni AS dni',
        'users.access_token AS access_token',
        'users.refresh_token AS refresh_token',
        'users.is_archived AS is_archived',
        'users.created_at AS created_at',
        'users.updated_at AS updated_at',
        'users.archived_at AS archived_at'
      ]

      let userItemElement = await sql('users')
      .select(attributes)
      .where('id', userItemID)
      .spread(noop)

      let payload = {
        status: 200,
        data: {
          item: userItemElement
        },
        message: messages.adsItemUpdated
      }
      return payload
    } catch (err) {
      let payload = {
        status: 500,
        message: err
      }
      return payload
    }
  }

  async deleteById (id) {
    try {
      var userId = id
      let result = await sql('users')
      .where('id', userId)
      .del()
      .then((itemDeleted) => {
        if (!itemDeleted) {
          let payload = {
            status: 404,
            message: messages.usersItemsNotFound
          }
          return payload
        }

        let payload = {
          status: 200,
          data: {
            id: userId
          },
          message: messages.userItemDeleted
        }
        return payload
      })

      return result
    } catch (err) {
      let payload = {
        status: 500,
        message: err
      }
      return payload
    }
  }
}

export default UserRepository
