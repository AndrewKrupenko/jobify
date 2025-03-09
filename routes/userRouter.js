import { Router } from 'express'
const router = Router()

import {
  getCurrentUser,
  getApplicationStats,
  updateUser,
} from '../controllers/userController.js'
import { validateUpdateUserInput } from '../middleware/validationMiddleware.js'
import { authorizePermissions } from '../middleware/authMiddleware.js'
import upload from '../middleware/multerMiddleware.js'

router.get('/current-user', getCurrentUser)
router.get(
  '/admin/app-stats',
  authorizePermissions('admin'), // Only admin can access this route
  getApplicationStats,
)
router.patch(
  '/update-user', // Update user profile
  upload.single('avatar'), // Upload a single file with the name 'avatar'
  validateUpdateUserInput,
  updateUser,
)

export default router
