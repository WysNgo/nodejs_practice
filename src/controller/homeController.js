import connection from '../configs/connectDB'

let getHomepage = (req, res) => {
    //logic
    let data = []
    connection.query(
        'SELECT * FROM `user` ',
        function(err, results) {
            results.map((row) => {
                data.push({
                    id: row.id,
                    email: row.email,
                    address: row.address,
                    firstName: row.firstName,
                    lastName: row.lastName
                })
         
            })
        return  res.render('index.ejs',{ dataUser: data })
        });
}

module.exports = {
    getHomepage
}