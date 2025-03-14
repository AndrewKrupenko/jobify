import mongoose from 'mongoose'
import { body, param, validationResult } from 'express-validator' // Validate incoming request bodies

import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from '../errors/customErrors.js'
import { JOB_STATUS, JOB_TYPE } from '../utils/constants.js'
import JobModel from '../models/JobModel.js'
import UserModel from '../models/UserModel.js'

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg)

        if (errorMessages[0].startsWith('No job')) {
          throw new NotFoundError(errorMessages)
        }

        if (errorMessages[0].startsWith('Not authorized')) {
          throw new UnauthorizedError('Not authorized to access this route')
        }

        throw new BadRequestError(errorMessages)
      }

      next()
    },
  ]
}

export const validateTest = withValidationErrors([
  body('name')
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 3, max: 50 })
    .withMessage('Name must be between 3 and 50 characters long')
    .trim(),
])

export const validateJobInput = withValidationErrors([
  body('company').notEmpty().withMessage('Company is required'),
  body('position').notEmpty().withMessage('Position is required'),
  body('jobLocation').notEmpty().withMessage('Job location is required'),
  body('jobStatus')
    .isIn(Object.values(JOB_STATUS))
    .withMessage('Invalid status value'),
  body('jobType').isIn(Object.values(JOB_TYPE)).withMessage('Invalid job type'),
])

export const validateIdParam = withValidationErrors([
  param('id').custom(async (value, { req }) => {
    const isValidId = mongoose.Types.ObjectId.isValid(value)

    if (!isValidId) throw new BadRequestError('Invalid MongoDB id')

    const job = await JobModel.findById(value)
    if (!job) throw new NotFoundError(`No job with id : ${value}`)

    const isAdmin = req.user.role === 'admin'
    const isOwner = req.user.userId === job.createdBy.toString()

    if (!isAdmin && !isOwner)
      throw new UnauthorizedError('Not authorized to access this route')
  }),
])

export const validateRegisterInput = withValidationErrors([
  body('name').notEmpty().withMessage('Name is required'),
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email format')
    .custom(async (email) => {
      const user = await UserModel.findOne({ email })

      if (user) {
        throw new BadRequestError('Email already exists')
      }
    }),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),
  body('location').notEmpty().withMessage('Location is required'),
  body('lastName').notEmpty().withMessage('Last name is required'),
])

export const validateLoginInput = withValidationErrors([
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email format'),
  body('password').notEmpty().withMessage('Password is required'),
])

export const validateUpdateUserInput = withValidationErrors([
  body('name').notEmpty().withMessage('Name is required'),
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email format')
    .custom(async (email, { req }) => {
      const user = await UserModel.findOne({ email })

      if (user && user._id.toString() !== req.user.userId) {
        throw new Error('Email already exists')
      }
    }),
  body('lastName').notEmpty().withMessage('Last name is required'),
  body('location').notEmpty().withMessage('Location is required'),
])
