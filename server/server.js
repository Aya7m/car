import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { dbConnection } from './config/dbConnect.js'
import userRoute from './routes/userRoute.js'
import ownerRoute from './routes/ownerRoute.js'
import bookingRouter from './routes/bookingRoute.js'
const app = express()

dotenv.config()
dbConnection()

app.use(express.json())
app.use(cors())
const port = process.env.PORT ||5000


app.use('/api/user',userRoute)
app.use('/api/owner',ownerRoute)
app.use('/api/booking',bookingRouter)
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))