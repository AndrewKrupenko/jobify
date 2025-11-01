import { StatusCodes } from 'http-status-codes'
import mongoose from 'mongoose'
import day from 'dayjs'

import JobModel from '../models/JobModel.js'

export const getAllJobs = async (req, res) => {
  const jobs = await JobModel.find({ createdBy: req.user.userId }) // get all jobs created by the user

  res.status(StatusCodes.OK).json({ jobs })
}

export const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId
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

export const showStats = async (req, res) => {
  let stats = await JobModel.aggregate([
    // get the count of jobs with each status
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } }, // filter by the user id to get only the user's jobs
    { $group: { _id: '$jobStatus', count: { $sum: 1 } } }, // group by job status and count the number of jobs with each status
  ])

  // convert the array of objects to an object with status as key and count as value
  stats = stats.reduce((acc, curr) => {
    const { _id: status, count } = curr
    acc[status] = count

    return acc
  }, {})

  const defaultStats = {
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    declined: stats.declined || 0,
  }

  let monthlyApplications = await JobModel.aggregate([
    // get the count of jobs created each month for the last 6 months (current month included)
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } }, // filter by the user id to get only the user's jobs
    {
      $group: {
        _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } }, // group by year and month
        count: { $sum: 1 }, // count the number of jobs created each month
      },
    },
    { $sort: { '_id.year': -1, '_id.month': -1 } }, // sort by year and month in descending order to get the latest months first
    { $limit: 6 }, // limit the results to the last 6 months
  ])

  monthlyApplications = monthlyApplications // convert the array of objects to an array of objects with date and count
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item

      const date = day()
        .month(month - 1) // month is zero-based in dayjs (0 - 11) but 1-based in MongoDB (1 - 12)
        .year(year)
        .format('MMM YY')

      return { date, count }
    })
    .reverse()

  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications })
}
