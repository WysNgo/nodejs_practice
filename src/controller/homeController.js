import pool from '../configs/connectDB'

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

module.exports = {
    getHomepage, getDetailPage, createNewUser, deleteUser, editUser, updateUser
}