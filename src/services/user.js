import messages from '/messages'
import {userRepository} from '/repository'

const debug = require('debug')('assistance-service:services:users')

class UserService {
  async getList () {
    try {
      let userService = await userRepository.getList()
      let payload = userService
      return payload
    } catch (err) {
      let payload = err
      return payload
    }
  }

  async create (userData) {
    try {
      let userService = await userRepository.create(userData)
      let payload = userService
      return payload
    } catch (err) {
      let payload = err
      return payload
    }
  }

  async getById (id) {
    try {
      let userService = await userRepository.getById(id)
      let payload = userService
      return payload
    } catch (err) {
      let payload = err
      return payload
    }
  }

  async getByEmail (email) {
    try {
      let userService = await userRepository.getByEmail(email)
      let payload = userService
      return payload
    } catch (err) {
      let payload = err
      return payload
    }
  }

  async updateById (userData, userItemID) {
    try {
      let userService = await userRepository.updateById(userData, userItemID)
      let payload = userService
      return payload
    } catch (err) {
      let payload = err
      return payload
    }
  }

  async deleteById (id) {
    try {
      let userService = await userRepository.deleteById(id)
      let payload = userService
      return payload
    } catch (err) {
      let payload = err
      return payload
    }
  }
}

export default UserService
