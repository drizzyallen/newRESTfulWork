import express from 'express'
import pizzaRouter from './routes/pizzas.js'
import './config/dotenv.js'
import cors from 'cors'

const app = express()

app.use(cors())

app.use(express.json())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173')
    next()
})

app.use('/pizzas', pizzaRouter)

app.get('/', (req, res) => {
    res.send('yep we out here 😂')
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log('🦜we on express server🦜')
})