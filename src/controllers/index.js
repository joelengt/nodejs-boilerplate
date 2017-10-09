import UserController from './users'
import MenuController from './menu'
import OrdersController from './orders'
import ClientsController from './clients'
import AuthController from './auth'

const userController = new UserController()
const menuController = new MenuController()
const ordersController = new OrdersController()
const clientsController = new ClientsController()
const authController = new AuthController()

export {
  userController,
  menuController,
  ordersController,
  clientsController,
  authController
}
