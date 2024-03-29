import pool from '../configs/connectDB'
import multer from 'multer'


let getHomepage = async(req, res) => {
    //logic
    const [rows] = await pool.execute('SELECT * from user')
    return  res.render('index.ejs',{ dataUser: rows })
        
}

let getDetailPage = async(req, res) => {
    let userId = req.params.id
    let user =  await pool.execute('SELECT * FROM `user` WHERE `id` = ?', [userId])
    return res.send(JSON.stringify(user[0]))
}

let createNewUser = async(req,res) => {
    console.log('>>>check request', req.body )
    let {firstName, lastName, email, address} = req.body
    await pool.execute('insert into user(firstName, lastName, email, address) values(?, ?, ?, ?)',[firstName, lastName, email, address])
    return res.redirect('/')
}

let deleteUser = async(req, res) => {
    let userId = req.body.userId
    await pool.execute('delete from user where id = ?', [userId])
    return res.redirect('/')
}

let editUser = async(req,res) => {
    let userId = req.params.id
    let [user] = await pool.execute('select * from user where id = ?', [userId])
    return res.render('update.ejs',{dataUser: user[0]})
}

let updateUser = async(req,res) => {
    let {firstName, lastName, email, address, id} = req.body
    await pool.execute('update user set firstName = ?, lastName = ?, email = ?, address = ? where id = ?', 
    [firstName, lastName, email, address, id])
    return res.redirect('/')
}

let uploadFilePage = async(req,res) => {
    return res.render('uploadFile.ejs')
}





const upload = multer().single('profile_pic')
const uploadMultiple = multer().array('file-pics', 20)

let handleUploadFile = async(req,res) => {
    
    console.log(req.file)
    upload(req, res, function(err) {
        // req.file contains information of uploaded file
        // req.body contains information of text fields, if there were any

        if (req.fileValidationError) {
            return res.send(req.fileValidationError)
        }
        else if (!req.file) {
            return res.send('Please select an image to upload')
        }
        else if (err instanceof multer.MulterError && err.code === "LIMIT_UNEXPECTED_FILE") {
            return res.send('LIMIT_UNEXPECTED_FILE')
        }
        else if (err) {
            return res.send(err)
        }

        // Display uploaded image for user validation
        res.send(`You have uploaded this image: <hr/><img src="/image/${req.file.filename}" width="500"><hr /><a href="/upload">Upload another image</a>`);
    });
}

let handleUpLoadMutipleFiles = async(req,res) => {
    upload(req, res, function(err) {
        console.log(req.files)
        if (req.fileValidationError) {
            return res.send(req.fileValidationError)
        }
        else if (!req.files) {
            return res.send('Please select an image to upload')
        }
        else if (err instanceof multer.MulterError) {
            return res.send(err)
        }
        else if (err) {
            return res.send(err)
        }
        let result = "You have uploaded these images: <hr />";
        const files = req.files;
        let index, len;

        // Loop through all the uploaded images and display them on frontend
        for (index = 0, len = files.length; index < len; ++index) {
            result += `<img src="/image/${files[index].filename}" width="300" style="margin-right: 20px;">`;
        }
        result += '<hr/><a href="/upload">Upload more images</a>';
        res.send(result);
    })
} 



module.exports = {
    getHomepage, getDetailPage, createNewUser, deleteUser, editUser, updateUser, uploadFilePage,
    handleUploadFile, handleUpLoadMutipleFiles
}