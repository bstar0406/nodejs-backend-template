import { Application } from 'express'
import ordersRouter from './ordersRouter'
import collectionsRouter from './collectionsRouter'
import usersRouter from './usersRouter'

export default class Routes {

  constructor(app: Application) {
    // orders reoutes
    app.use('/api/v1/orders', ordersRouter)
    // collections routes
    app.use('/api/v1/collections', collectionsRouter)
    // users routes
    app.use('/api/v1/users', usersRouter)
  }
}