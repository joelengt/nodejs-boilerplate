import {menuRepository} from '/repository'

const debug = require('debug')('assistance-service:services:menu')

class MenuService {
  async getList () {
    try {
      let userService = await menuRepository.getList()
      let payload = userService
      return payload
    } catch (err) {
      let payload = err
      return payload
    }
  }

  async create (data) {
    try {
      let userService = await menuRepository.create(data)
      let payload = userService
      return payload
    } catch (err) {
      let payload = err
      return payload
    }
  }

  async getById (id) {
    try {
      let userService = await menuRepository.getById(id)
      let payload = userService
      return payload
    } catch (err) {
      let payload = err
      return payload
    }
  }

  async updateById (data, id) {
    try {
      let userService = await menuRepository.updateById(data, id)
      let payload = userService
      return payload
    } catch (err) {
      let payload = err
      return payload
    }
  }

  async deleteById (id) {
    try {
      let userService = await menuRepository.deleteById(id)
      let payload = userService
      return payload
    } catch (err) {
      let payload = err
      return payload
    }
  }
}

export default MenuService
