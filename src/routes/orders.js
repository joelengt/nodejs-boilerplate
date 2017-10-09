import express from 'express'
import {ordersController} from '/controllers'

const debug = require('debug')('assistance-service:routes:orders')
const router = express.Router()

router.route('/')
  .get(ordersController.getList)
  .post(ordersController.create)

router.route('/:id')
  .get(ordersController.getById)
  .put(ordersController.updateById)
  .delete(ordersController.deleteById)

export default router
