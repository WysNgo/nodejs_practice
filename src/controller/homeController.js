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
        

module.exports = {
    getHomepage, getDetailPage, createNewUser
}