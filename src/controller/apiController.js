import pool from '../configs/connectDB'

let getAllUser = async(req,res) => {
    const [rows] = await pool.execute('SELECT * from user')
    return res.status(200).json({
        massage: 'OK',
        data: rows
    })
}
let createNewUser = async(req,res) => {
    let {firstName, lastName, email, address} = req.body
    if(!firstName || !lastName || !email || !address){
        return res.status(200).json({
            massage: 'missing'
        })
    }

    
    await pool.execute('insert into user(firstName, lastName, email, address) values(?, ?, ?, ?)',[firstName, lastName, email, address])

    return res.status(200).json({
        massage: 'OK',
    })
}

let updateUser = async(req,res) => {
    let {firstName, lastName, email, address, id} = req.body

    if(!firstName || !lastName || !email || !address || !id){
        return res.status(200).json({
            massage: 'missing'
        })
    }

    await pool.execute('update user set firstName = ?, lastName = ?, email = ?, address = ? where id = ?', 
    [firstName, lastName, email, address, id])
    
    return res.status(200).json({
        massage: 'OK',
    })
}

let deleteUser = async(req,res) => {
    let userId = req.query.id
    if(!userId){
        return res.status(200).json({
            massage: 'missing'
        })
    }
    await pool.execute('delete from user where id = ?', [userId])
    
    return res.status(200).json({
        message: 'ok'
    })
}

module.exports = {
    getAllUser, createNewUser, updateUser, deleteUser
}