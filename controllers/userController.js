import { StatusCodes } from 'http-status-codes'
import cloudinary from 'cloudinary'

import UserModel from '../models/UserModel.js'
import JobModel from '../models/JobModel.js'
import { formatImage } from '../middleware/multerMiddleware.js'

export const getCurrentUser = async (req, res) => {
  const user = await UserModel.findOne({ _id: req.user.userId })
  const userWithoutPassword = user.toJSON()

  res.status(StatusCodes.OK).json({ user: userWithoutPassword })
}

// Available to admin only (GET '/admin/app-stats' request)
export const getApplicationStats = async (req, res) => {
  const users = await UserModel.countDocuments()
  const jobs = await JobModel.countDocuments()

  res.status(StatusCodes.OK).json({ users, jobs })
}

export const updateUser = async (req, res) => {
  const newUser = { ...req.body }
  delete newUser.password // Make sure that the password is not updated

  // Only when the user uploads a new avatar
  if (req.file) {
    const file = formatImage(req.file)
    const response = await cloudinary.v2.uploader.upload(file)
    newUser.avatar = response.secure_url // Save the image URL
    newUser.avatarPublicId = response.public_id // Save the image public ID
  }

  const updatedUser = await UserModel.findByIdAndUpdate(
    req.user.userId,
    newUser,
  )

  // If the user had an avatar and uploaded a new one - delete the old avatar from Cloudinary
  if (req.file && updatedUser.avatarPublicId) {
    await cloudinary.v2.uploader.destroy(updatedUser.avatarPublicId) // Delete the image from Cloudinary
  }

  res.status(StatusCodes.OK).json({ msg: 'User updated' })
}
