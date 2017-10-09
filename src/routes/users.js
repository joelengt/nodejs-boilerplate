import express from 'express'
import {userController} from '/controllers'

const debug = require('debug')('assistance-service:routes:users')
const router = express.Router()

router.route('/')
  .get(userController.getList)
  .post(userController.create)

router.route('/:id')
  .get(userController.getById)
  .put(userController.updateById)
  .delete(userController.deleteById)

export default router
