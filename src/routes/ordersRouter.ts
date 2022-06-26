import { Router } from 'express'
import OrdersController from '../controllers/ordersController'

class OrdersRouter {
  router = Router()
  ordersController = new OrdersController()

  constructor() {
    this.intializeRoutes()
  }
  intializeRoutes() {
    this.router.route('/').get(this.ordersController.getOrders)
    this.router.route('/').post(this.ordersController.makeOrder)
    this.router.route('/nonce').post(this.ordersController.getNonce)
    this.router.route('/changeOrderStatus').post(this.ordersController.changeOrderStatus)
  }
}
export default new OrdersRouter().router