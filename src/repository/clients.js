import Client from '/models/client'
import messages from '/messages'

const debug = require('debug')('assistance-service:repository:clients')

class ClientsRepository {
  async getList () {
    try {
      // Find clients on db
      let clients = await Client.find()

      // Evalute if clients was found
      if (!clients.length) {
        let payload = {
          status: 404,
          message: messages.usersItemsNotFound
        }
        return payload
      }

      let payload = {
        status: 200,
        data: {
          items: clients
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
      // Create a new client on db
      let client = new Client(fields)
      let clientSaved = await client.save()

      let payload = {
        status: 201,
        data: {
          item: clientSaved
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
    let clientID = id

    try {
      // Find client on db
      let client = await Client.findById(clientID)

      // Validate if client was found
      if (!client) {
        let payload = {
          status: 404,
          message: messages.usersItemsNotFound
        }
        return payload
      }

      let payload = {
        status: 200,
        data: {
          item: client
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
    let clientID = id
    // Get body attributes
    let fields = data

    try {
      // update client on db
      let result = await Client.findOneAndUpdate({'_id': clientID}, fields)

      // Validate if product was found
      if (!result) {
        let payload = {
          status: 404,
          message: messages.usersItemsNotFound
        }
        return payload
      }

      // Find prodcut by id
      let client = await Client.findOne({'_id': clientID})

      // Validate if product was found
      if (!client) {
        let payload = {
          status: 404,
          message: messages.usersItemsNotFound
        }
        return payload
      }

      let payload = {
        status: 200,
        data: {
          item: client
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
    let clientID = id

    try {
      // Find uri params by productId
      let client = await Client.findOne({'_id': clientID})

      // Validate if client was found
      if (!client) {
        debug('Entri?')
        let payload = {
          status: 404,
          message: messages.clientNotFound
        }
        return payload
      }

      // Remove client from catalog
      await Client.remove({'_id': client._id})

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

export default ClientsRepository
