import {ordersRepository} from '/repository'

const debug = require('debug')('assistance-service:services:orders')

class OrdersService {
  async getList () {
    try {
      let userService = await ordersRepository.getList()
      let payload = userService
      return payload
    } catch (err) {
      let payload = err
      return payload
    }
  }

  async create (data) {
    try {
      let userService = await ordersRepository.create(data)
      let payload = userService
      return payload
    } catch (err) {
      let payload = err
      return payload
    }
  }

  async getById (id) {
    try {
      let userService = await ordersRepository.getById(id)
      let payload = userService
      return payload
    } catch (err) {
      let payload = err
      return payload
    }
  }

  async updateById (data, id) {
    try {
      let userService = await ordersRepository.updateById(data, id)
      let payload = userService
      return payload
    } catch (err) {
      let payload = err
      return payload
    }
  }

  async deleteById (id) {
    try {
      let userService = await ordersRepository.deleteById(id)
      let payload = userService
      return payload
    } catch (err) {
      let payload = err
      return payload
    }
  }
}

export default OrdersService
