import express from 'express'
import {clientsController} from '/controllers'

const debug = require('debug')('assistance-service:routes:menu')
const router = express.Router()

router.route('/')
  .get(clientsController.getList)
  .post(clientsController.create)

router.route('/:id')
  .get(clientsController.getById)
  .put(clientsController.updateById)
  .delete(clientsController.deleteById)

export default router
