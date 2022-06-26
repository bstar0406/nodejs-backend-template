import { Router } from 'express'
import CollectionsController from '../controllers/collectionsController'

class CollectionsRouter {
  router = Router()
  collectionsController = new CollectionsController()

  constructor() {
    this.intializeRoutes()
  }
  intializeRoutes() {
    this.router.route('/').get(this.collectionsController.getCollection)
    this.router.route('/').post(this.collectionsController.addCollection)
    this.router.route('/stats').get(this.collectionsController.getCollectionStat)
    this.router.route('/chart').get(this.collectionsController.getCollectionChart)
  }
}
export default new CollectionsRouter().router