import express from 'express'
import homeController from '../controller/homeController'


let router = express.Router()

const initWebRouter = (app) => {
    router.get('/', homeController.getHomepage)
    router.get('/detail/user/:id', homeController.getDetailPage)

    return app.use('/', router)
}

export default initWebRouter