
import express  from 'express'
import configViewEngine from "./configs/viewEngine"

const app = express()
const port = 8080

configViewEngine(app)

app.get('/', (req,res) => {
    // res.sendFile(path.join(__dirname, 'index.html'))
    // res.send('Hello world')
    res.render('index.ejs')
})

app.listen(port, ()=>{
    console.log(`app listening to port ${port}`)
})