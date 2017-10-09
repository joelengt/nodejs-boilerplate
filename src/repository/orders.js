import Orders from '/models/orders'
import messages from '/messages'

const debug = require('debug')('assistance-service:repository:orders')

class OrdersRepository {
  async getList () {
    try {
      // Find orders on db
      let orders = await Orders.find()
      .populate('foods.item')
      .populate('client')

      // Evalute if orders was found
      if (!orders.length) {
        let payload = {
          status: 404,
          message: messages.usersItemsNotFound
        }
        return payload
      }

      let payload = {
        status: 200,
        data: {
          items: orders
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

  async create (data) {
    // Get body attributes
    let fields = data
    try {
      // Create a new order on db
      let order = new Orders(fields)
      let orderSaved = await order.save()

      let payload = {
        status: 201,
        data: {
          item: orderSaved
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

  async getById (id) {
    // Get uri params id
    let orderID = id

    try {
      // Find order on db
      let order = await Orders.findById(orderID)
      .populate('foods.item')
      .populate('client')

      // Validate if order was found
      if (!order) {
        let payload = {
          status: 404,
          message: messages.usersItemsNotFound
        }
        return payload
      }

      let payload = {
        status: 200,
        data: {
          item: order
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

  async updateById (data, id) {
    // Get uri params id
    let orderID = id
    // Get body attributes
    let fields = data

    try {
      // update order on db
      let result = await Orders.findOneAndUpdate({'_id': orderID}, fields)

      // Validate if product was found
      if (!result) {
        let payload = {
          status: 404,
          message: messages.usersItemsNotFound
        }
        return payload
      }

      // Find prodcut by id
      let order = await Orders.findOne({'_id': orderID})

      // Validate if product was found
      if (!order) {
        let payload = {
          status: 404,
          message: messages.usersItemsNotFound
        }
        return payload
      }

      let payload = {
        status: 200,
        data: {
          item: order
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

  async deleteById (id) {
    // Get uri params id
    let orderID = id

    try {
      // Find uri params by productId
      let order = await Orders.findOne({'_id': orderID})

      // Validate if order was found
      if (!order) {
        debug('Entri?')
        let payload = {
          status: 404,
          message: messages.orderNotFound
        }
        return payload
      }

      // Remove order from catalog
      await Orders.remove({'_id': order._id})

      let payload = {
        status: 200,
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
}

export default OrdersRepository
