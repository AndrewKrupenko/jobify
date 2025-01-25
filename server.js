import 'express-async-errors' // Handle async errors in express (to avoid using try-catch in every route)
import * as dotenv from 'dotenv'
dotenv.config() // Load env variables from .env file
import express from 'express'
const app = express()
import morgan from 'morgan' // HTTP request logger middleware
import mongoose from 'mongoose' // MongoDB object modeling tool designed to work in an asynchronous environment
import cookieParser from 'cookie-parser'

import jobRouter from './routes/jobRouter.js'
import authRouter from './routes/authRouter.js'
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js'
import { authenticateUser } from './middleware/authMiddleware.js'
import userRouter from './routes/userRouter.js'

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')) // HTTP request logger middleware
}

app.use(cookieParser()) // Parse cookies
app.use(express.json()) // for parsing application/json

app.use('/api/v1/jobs', authenticateUser, jobRouter) // Authenticate user before accessing job routes
app.use('/api/v1/users', authenticateUser, userRouter) // Authenticate user before accessing user routes
app.use('/api/v1/auth', authRouter) // Authentication routes

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
