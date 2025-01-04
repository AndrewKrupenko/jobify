import * as dotenv from 'dotenv'
dotenv.config() // Load env variables from .env file
import express from 'express'
const app = express()
import morgan from 'morgan'
import { nanoid } from 'nanoid'

const port = process.env.PORT || 5100

// Dummy data
let jobs = [
  { id: nanoid(), company: 'apple', position: 'front-end' },
  { id: nanoid(), company: 'google', position: 'back-end' },
]

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')) // HTTP request logger middleware
}

app.use(express.json()) // for parsing application/json

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.post('/', (req, res) => {
  res.json({ message: 'Data received', data: req.body })
})

app.get('/api/v1/jobs', (req, res) => {
  res.status(200).json({ jobs })
})

app.listen(port, () => {
  console.log(`server running on PORT ${port}....`)
})
