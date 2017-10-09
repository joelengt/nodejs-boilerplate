import UserService from './user'
import MenuService from './menu'
import OrdersService from './orders'
import ClientsService from './clients'

const usersService = new UserService()
const menuService = new MenuService()
const ordersService = new OrdersService()
const clientsService = new ClientsService()

export {
  usersService,
  menuService,
  ordersService,
  clientsService
}
