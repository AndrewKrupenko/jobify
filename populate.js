import { readFile } from 'fs/promises'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

import JobModel from './models/JobModel.js'
import UserModel from './models/UserModel.js'

try {
  await mongoose.connect(process.env.MONGO_URL)

  const user = await UserModel.findOne({ email: 'john@gmail.com' })

  const jsonJobs = JSON.parse(
    await readFile(new URL('./utils/mockData.json', import.meta.url)), // import.meta.url is the current file path
  )

  const jobs = jsonJobs.map((job) => {
    // map over each job and add the user id to the job
    return { ...job, createdBy: user._id }
  })

  await JobModel.deleteMany({ createdBy: user._id }) // delete all jobs created by the user before
  await JobModel.create(jobs) // create new jobs

  console.log('Success!!!')

  process.exit(0) // exit the script with success
} catch (error) {
  console.log({ error })

  process.exit(1)
}
