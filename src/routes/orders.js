import express from 'express'
import {ordersController} from '/controllers'

const debug = require('debug')('assistance-service:routes:orders')
const router = express.Router()
const { validateParam, validateBody, schemas } = require('~/src/utils')

router.route('/')
  .get(validateParam(schemas.orderIDSchema),
       validateBody(schemas.orderSchema),
       ordersController.getList)
  .post(ordersController.create)

router.route('/:id')
  .get(ordersController.getById)
  .put(ordersController.updateById)
  .delete(ordersController.deleteById)

export default router
