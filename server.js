const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello wolrd')
})
app.get('/about', (req,res) =>{
    res.send(`I'm QUY`)
})

app.listen(port, () => {
    console.log(`app listening to port ${port}`)
})