import {
  BadRequestError,
  UnauthenticatedError,
  UnauthorizedError,
} from '../errors/customErrors.js'
import { verifyJWT } from '../utils/tokenUtils.js'

export const authenticateUser = (req, res, next) => {
  const { token } = req.cookies

  if (!token) throw new UnauthenticatedError('Authentication invalid')

  try {
    const { userId, role } = verifyJWT(token)
    const testUser = userId === '67ce1430aa3272630255085e'

    req.user = { userId, role, testUser }

    next()
  } catch (error) {
    throw new UnauthenticatedError('Authentication invalid')
  }
}

export const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new UnauthorizedError('Unauthorized to access this route')
    }

    next()
  }
}

export const checkForTestUser = (req, res, next) => {
  if (req.user.testUser) {
    throw new BadRequestError('Demo User. Read Only!')
  }

  next()
}
