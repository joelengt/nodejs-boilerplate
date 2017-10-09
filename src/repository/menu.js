import Food from '/models/food'
import messages from '/messages'

const debug = require('debug')('assistance-service:repository:menu')

class MenuRepository {
  async getList () {
    try {
      // Find foods on db
      let foods = await Food.find()

      // Evalute if foods was found
      if (!foods.length) {
        let payload = {
          status: 404,
          message: messages.usersItemsNotFound
        }
        return payload
      }

      let payload = {
        status: 200,
        data: {
          items: foods
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
      // Create a new food on db
      let food = new Food(fields)
      let foodSaved = await food.save()

      let payload = {
        status: 201,
        data: {
          item: foodSaved
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
    let foodID = id

    try {
      // Find food on db
      let food = await Food.findById(foodID)

      // Validate if food was found
      if (!food) {
        let payload = {
          status: 404,
          message: messages.usersItemsNotFound
        }
        return payload
      }

      let payload = {
        status: 200,
        data: {
          item: food
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
    let foodID = id
    // Get body attributes
    let fields = data

    try {
      // update food on db
      let result = await Food.findOneAndUpdate({'_id': foodID}, fields)

      // Validate if product was found
      if (!result) {
        let payload = {
          status: 404,
          message: messages.usersItemsNotFound
        }
        return payload
      }

      // Find prodcut by id
      let food = await Food.findOne({'_id': foodID})

      // Validate if product was found
      if (!food) {
        let payload = {
          status: 404,
          message: messages.usersItemsNotFound
        }
        return payload
      }

      let payload = {
        status: 200,
        data: {
          item: food
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
    let foodID = id

    try {
      // Find uri params by productId
      let food = await Food.findOne({'_id': foodID})

      // Validate if food was found
      if (!food) {
        debug('Entri?')
        let payload = {
          status: 404,
          message: messages.foodNotFound
        }
        return payload
      }

      // Remove food from catalog
      await Food.remove({'_id': food._id})

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

export default MenuRepository
