import UserRepository from './user'
import MenuRepository from './menu'
import OrdersRepository from './orders'
import ClientsRepository from './clients'

const userRepository = new UserRepository()
const menuRepository = new MenuRepository()
const ordersRepository = new OrdersRepository()
const clientsRepository = new ClientsRepository()

export {
  userRepository,
  menuRepository,
  ordersRepository,
  clientsRepository
}
