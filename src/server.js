
import express  from 'express'
import configViewEngine from "./configs/viewEngine"
import initWebRouter from './route/web'


require('dotenv').config()

const app = express()
const port = process.env.PORT

app.use(express.urlencoded({ extended: true}))
app.use(express.json())

//setup view engine
configViewEngine(app)

//init web route
initWebRouter(app)

app.listen(port, ()=>{
    console.log(`app listening to port ${port}`)
})