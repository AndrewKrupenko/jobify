import { Router } from 'express'
import rateLimiter from 'express-rate-limit'

import { register, login, logout } from '../controllers/authController.js'
import {
  validateLoginInput,
  validateRegisterInput,
} from '../middleware/validationMiddleware.js'

const router = Router()

const apiLimiter = rateLimiter({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 25, // number of requests
  message: { msg: 'IP rate limit exceeded, retry in 5 minutes.' },
})

router.post('/register', apiLimiter, validateRegisterInput, register)
router.post('/login', apiLimiter, validateLoginInput, login)
router.get('/logout', logout)

export default router
