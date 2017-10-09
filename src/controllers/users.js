import messages from '/messages'
import {usersService} from '/services'

const debug = require('debug')('assistance-service:controllers:users')

class UserController {
  async getList (req, res) {
    debug('userService controller 1')
    try {
      debug('userService controller 2')

      let userService = await usersService.getList()
      if (userService.status !== 200) {
        return res[`${userService.status}`]({success: false}, userService.message)
      }

      let payload = userService.data
      return res.ok(payload, messages.usersItemsFound)
    } catch (err) {
      debug('Result!!! error', err)

      return res['500']({success: false}, err)
    }
  }

  async create (req, res) {
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

  async getById (req, res) {
    try {
      let id = req.params.id
      let userService = await usersService.getById(id)
      if (userService.status !== 200) {
        return res[`${userService.status}`]({success: false}, userService.message)
      }

      let payload = userService.data
      return res.ok(payload, messages.usersItemsFound)
    } catch (err) {
      return res['500']({success: false}, err)
    }
  }

  async getByEmail (req, res) {
    try {
      let email = req.params.email
      let userService = await usersService.getById(email)
      if (userService.status !== 200) {
        return res[`${userService.status}`]({success: false}, userService.message)
      }

      let payload = userService.data
      return res.ok(payload, messages.usersItemsFound)
    } catch (err) {
      return res['500']({success: false}, err)
    }
  }

  async updateById (req, res) {
    try {
      let userItemID = req.params.id
      let userData = req.body

      let userService = await usersService.updateById(userData, userItemID)
      if (userService.status !== 200) {
        return res[`${userService.status}`]({success: false}, userService.message)
      }

      let payload = userService.data
      return res.ok(payload, messages.adsItemUpdated)
    } catch (err) {
      return res['500']({success: false}, err)
    }
  }

  async deleteById (req, res) {
    try {
      let id = req.params.id
      let userService = await usersService.deleteById(id)
      if (userService.status !== 200) {
        return res[`${userService.status}`]({success: false}, userService.message)
      }

      let payload = userService.data
      return res.ok(payload, messages.userItemDeleted)
    } catch (err) {
      return res['500']({success: false}, err)
    }
  }
}

export default UserController
