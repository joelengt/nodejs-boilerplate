import express from 'express'
import {authController} from '/controllers'

const debug = require('debug')('assistance-service:routes:menu')
const router = express.Router()

router.route('/login')
  .post(authController.login)

router.route('/signup')
  .post(authController.signup)

export default router
