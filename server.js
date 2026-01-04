import 'express-async-errors' // Handle async errors in express (to avoid using try-catch in every route)
import * as dotenv from 'dotenv'
dotenv.config() // Load env variables from .env file
import express from 'express'
const app = express()
import morgan from 'morgan' // HTTP request logger middleware
import mongoose from 'mongoose' // MongoDB object modeling tool designed to work in an asynchronous environment
import cookieParser from 'cookie-parser'
import cloudinary from 'cloudinary' // Cloudinary is a cloud service that offers a solution to a web application's entire image management pipeline
import helmet from 'helmet' // Security
import mongoSanitize from 'express-mongo-sanitize' // Security

// public
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import path from 'path'

// routes
import jobRouter from './routes/jobRouter.js'
import authRouter from './routes/authRouter.js'
import userRouter from './routes/userRouter.js'

// middleware
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js'
import { authenticateUser } from './middleware/authMiddleware.js'

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
})

const __dirname = dirname(fileURLToPath(import.meta.url))

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')) // HTTP request logger middleware
}

// The location of the FE build
app.use(express.static(path.resolve(__dirname, './client/dist')))

app.use(cookieParser()) // Parse cookies
app.use(express.json()) // for parsing application/json
app.use(helmet())
app.use(mongoSanitize())

app.use('/api/v1/jobs', authenticateUser, jobRouter) // Authenticate user before accessing job routes
app.use('/api/v1/users', authenticateUser, userRouter) // Authenticate user before accessing user routes
app.use('/api/v1/auth', authRouter) // Authentication routes

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/dist', 'index.html')) // path to the built frontend file
})

app.use('*', (req, res) => {
  res.status(404).json({ msg: 'Not found' })
})

app.use(errorHandlerMiddleware) // Error handler middleware (should be the last middleware)

const port = process.env.PORT || 5100

try {
  await mongoose.connect(process.env.MONGO_URL) // Connect to MongoDB

  app.listen(port, () => {
    console.log(`server running on PORT ${port}....`)
  })
} catch (error) {
  console.log({ error })
  process.exit(1) // 1 means process exited with failure
}
