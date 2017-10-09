import express from 'express'
import {menuController} from '/controllers'

const debug = require('debug')('assistance-service:routes:menu')
const router = express.Router()

router.route('/')
  .get(menuController.getList)
  .post(menuController.create)

router.route('/:id')
  .get(menuController.getById)
  .put(menuController.updateById)
  .delete(menuController.deleteById)

export default router
