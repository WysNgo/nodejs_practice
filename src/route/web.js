import express from 'express'
import homeController from '../controller/homeController'
import multer from 'multer'
import path from 'path'
var appRoot = require('app-root-path')

const storage = multer.diskStorage({
    destination: function(req, file, cb)  {
        cb(null, appRoot + '/src/public/image/')
    },
    // by default, multer removes file extentions so let's add them back
    filename: function(req, file, cb) {
        cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }

});

const imageFilter = function(req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true)
}

let upload = multer({storage: storage, fileFilter: imageFilter})

let router = express.Router()

const initWebRouter = (app) => {
    router.get('/', homeController.getHomepage)
    router.get('/detail/user/:id', homeController.getDetailPage)
    router.post('/createNewUser',homeController.createNewUser)
    router.post('/deleteUser', homeController.deleteUser)
    router.get('/editUser/:id', homeController.editUser)
    router.post('/updateUser', homeController.updateUser)
    router.get('/upload',homeController.uploadFilePage)
    router.post('/upload-file-pic',upload.single('profile_pic'), homeController.handleUploadFile)
    router.post('/upload-file-pics', upload.array('file-pics', 20) ,homeController.handleUpLoadMutipleFiles)
    return app.use('/', router)
}

export default initWebRouter