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
        

module.exports = {
    getHomepage, getDetailPage
}