import express from 'express'
import apiController from '../controller/apiController'
let router = express.Router()

const initApiRoute = (app) => {
    //METHOD GET -> read DATA
    router.get('/users', apiController.getAllUser)
    //POST -> create DATA
    router.post('/CreateNewUser', apiController.createNewUser)
    //PUT -> UPDATE  DATA
    router.put('/updateUser', apiController.updateUser)
    //DELETE
    router.delete('/deleteUser/:id', apiController.deleteUser)

    return app.use('/api/v1/', router)
}

export default initApiRoute