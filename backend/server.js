import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import routes from './routes/routes.js'

dotenv.config()

const app = express()


mongoose.connect(process.env.URI, () => console.log('Database Connected'))

app.use(express.json())
app.use(cors())
app.use('/app', routes)
app.listen(4000, () => console.log('server is up and running'))