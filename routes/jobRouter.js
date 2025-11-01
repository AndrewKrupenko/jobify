import { Router } from 'express'
const router = Router()

import {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
  showStats,
} from '../controllers/jobController.js'
import {
  validateIdParam,
  validateJobInput,
} from '../middleware/validationMiddleware.js'
import { checkForTestUser } from '../middleware/authMiddleware.js'

router
  .route('/')
  .get(getAllJobs)
  .post(checkForTestUser, validateJobInput, createJob)

// Place the /stats route before the /:id route to avoid conflicts with the /:id route handler
router.route('/stats').get(showStats) // GET /api/jobs/stats

router
  .route('/:id')
  .get(validateIdParam, getJob)
  .patch(checkForTestUser, validateJobInput, validateIdParam, updateJob)
  .delete(checkForTestUser, validateIdParam, deleteJob)

export default router
