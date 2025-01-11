import { StatusCodes } from 'http-status-codes'

import JobModel from '../models/JobModel.js'

export const getAllJobs = async (req, res) => {
  const jobs = await JobModel.find({})

  res.status(StatusCodes.OK).json({ jobs })
}

export const createJob = async (req, res) => {
  const job = await JobModel.create(req.body)

  res.status(StatusCodes.CREATED).json({ job })
}

export const getJob = async (req, res) => {
  const job = await JobModel.findById(req.params.id)

  res.status(StatusCodes.OK).json({ job })
}

export const updateJob = async (req, res) => {
  const updatedJob = await JobModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true, // return the updated job
  })

  res.status(StatusCodes.OK).json({ job: updatedJob })
}

export const deleteJob = async (req, res) => {
  const removedJob = await JobModel.findByIdAndDelete(req.params.id)

  res.status(StatusCodes.OK).json({ job: removedJob })
}
