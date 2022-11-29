import express from 'express'
import homeController from '../controller/homeController'


let router = express.Router()

const initWebRouter = (app) => {
    router.get('/', homeController.getHomepage)
    router.get('/detail/user/:id', homeController.getDetailPage)
    router.post('/createNewUser',homeController.createNewUser)
    router.post('/deleteUser', homeController.deleteUser)
    router.get('/editUser/:id', homeController.editUser)
    router.post('/updateUser', homeController.updateUser)
    return app.use('/', router)
}

export default initWebRouter