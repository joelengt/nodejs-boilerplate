import {clientsRepository} from '/repository'

const debug = require('debug')('assistance-service:services:clients')

class ClientsService {
  async getList () {
    try {
      let userService = await clientsRepository.getList()
      let payload = userService
      return payload
    } catch (err) {
      let payload = err
      return payload
    }
  }

  async create (data) {
    try {
      let userService = await clientsRepository.create(data)
      let payload = userService
      return payload
    } catch (err) {
      let payload = err
      return payload
    }
  }

  async getById (id) {
    try {
      let userService = await clientsRepository.getById(id)
      let payload = userService
      return payload
    } catch (err) {
      let payload = err
      return payload
    }
  }

  async updateById (data, id) {
    try {
      let userService = await clientsRepository.updateById(data, id)
      let payload = userService
      return payload
    } catch (err) {
      let payload = err
      return payload
    }
  }

  async deleteById (id) {
    try {
      let userService = await clientsRepository.deleteById(id)
      let payload = userService
      return payload
    } catch (err) {
      let payload = err
      return payload
    }
  }
}

export default ClientsService
