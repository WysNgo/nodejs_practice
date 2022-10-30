
import express  from 'express'
import configViewEngine from "./configs/viewEngine"
require('dotenv').config()

const app = express()
const port = process.env.PORT
configViewEngine(app)

app.get('/', (req,res) => {
    // res.sendFile(path.join(__dirname, 'index.html'))
    // res.send('Hello world')
    res.render('index.ejs')
})

app.listen(port, ()=>{
    console.log(`app listening to port ${port}`)
})