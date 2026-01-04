import { toast } from 'react-toastify'
import { redirect } from 'react-router-dom'

import customFetch from 'utils/customFetch'

export const registerAction = async ({ request }) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)

  try {
    await customFetch.post('/auth/register', data)
    toast.success('Registration successful')

    return redirect('/login')
  } catch (error) {
    toast.error(error?.response?.data?.msg)

    return error
  }
}

export const loginAction =
  (queryClient) =>
  async ({ request }) => {
    const formData = await request.formData()
    const data = Object.fromEntries(formData)

    try {
      await customFetch.post('/auth/login', data)
      queryClient.invalidateQueries()
      toast.success('Login successful')

      return redirect('/dashboard')
    } catch (error) {
      toast.error(error?.response?.data?.msg)

      return error
    }
  }

export const logoutAction = (queryClient) => async () => {
  await customFetch.get('/auth/logout')
  queryClient.invalidateQueries()
}

export const userQuery = {
  queryKey: ['user'],
  queryFn: async () => {
    const { data } = await customFetch('/users/current-user')

    return data
  },
}

// Loader must be a function that returns the function (to implement @tanstack/react-query)
export const dashboardLoader = (queryClient) => async () => {
  try {
    return await queryClient.ensureQueryData(userQuery)
  } catch (error) {
    console.error({ error })

    return redirect('/')
  }
}

export const allJobsQuery = (params) => {
  const { search, jobStatus, jobType, sort, page } = params

  return {
    queryKey: [
      'jobs',
      search ?? '',
      jobStatus ?? 'all',
      jobType ?? 'all',
      sort ?? 'newest',
      page ?? 1,
    ],
    queryFn: async () => {
      const { data } = await customFetch.get('/jobs', {
        params,
      })

      return data
    },
  }
}

export const allJobsLoader =
  (queryClient) =>
  async ({ request }) => {
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ])

    await queryClient.ensureQueryData(allJobsQuery(params))
    return { searchValues: { ...params } }
  }

export const addJobAction =
  (queryClient) =>
  async ({ request }) => {
    const formData = await request.formData()
    const data = Object.fromEntries(formData)

    try {
      await customFetch.post('/jobs', data)
      queryClient.invalidateQueries(['jobs'])
      toast.success('Job added successfully')

      return redirect('all-jobs')
    } catch (error) {
      toast.error(error?.response?.data?.msg)

      return error
    }
  }

export const singleJobQuery = (id) => {
  return {
    queryKey: ['job', id],
    queryFn: async () => {
      const { data } = await customFetch.get(`/jobs/${id}`)

      return data
    },
  }
}

export const editJobLoader =
  (queryClient) =>
  async ({ params }) => {
    try {
      await queryClient.ensureQueryData(singleJobQuery(params.id))

      return params.id
    } catch (error) {
      toast.error(error?.response?.data?.msg)

      return redirect('/dashboard/all-jobs')
    }
  }

export const editJobAction =
  (queryClient) =>
  async ({ request, params }) => {
    const formData = await request.formData()
    const data = Object.fromEntries(formData)

    try {
      await customFetch.patch(`/jobs/${params.id}`, data)
      queryClient.invalidateQueries(['jobs'])
      toast.success('Job edited successfully')

      return redirect('/dashboard/all-jobs')
    } catch (error) {
      toast.error(error?.response?.data?.msg)

      return error
    }
  }

export const deleteJobAction =
  (queryClient) =>
  async ({ params }) => {
    try {
      await customFetch.delete(`/jobs/${params.id}`)
      queryClient.invalidateQueries(['jobs'])
      toast.success('Job deleted successfully')
    } catch (error) {
      toast.error(error.response.data.msg)
    }

    return redirect('/dashboard/all-jobs')
  }

export const adminLoader = async () => {
  try {
    const response = await customFetch.get('/users/admin/app-stats')

    return response.data
  } catch (error) {
    toast.error('You are not authorized to view this page')

    return redirect('/dashboard')
  }
}

export const profileAction =
  (queryClient) =>
  async ({ request }) => {
    const formData = await request.formData()
    const file = formData.get('avatar')

    if (file && file.size > 500000) {
      toast.error('Image size is too large')

      return null
    }

    try {
      await customFetch.patch('/users/update-user', formData)
      queryClient.invalidateQueries(['user'])
      toast.success('Profile updated successfully')

      return redirect('/dashboard')
    } catch (error) {
      toast.error(error?.response?.data?.msg)

      return null
    }
  }

/*
Demo User Data:
{
    "name": "Zippy",
    "email": "test@test.com",
    "password": "secret123",
    "lastName": "ShakeAndBake",
    "location": "Codeville"
}
*/

export const loginDemoUser = async ({ navigate }) => {
  const data = {
    email: 'test@test.com',
    password: 'secret123',
  }

  try {
    await customFetch.post('/auth/login', data)
    toast.success('Take a test drive')

    navigate('/dashboard')
  } catch (error) {
    toast.error(error?.response?.data?.msg)
  }
}

export const statsQuery = {
  queryKey: ['stats'],
  queryFn: async () => {
    const response = await customFetch.get('/jobs/stats')

    return response.data
  },
}

// Loader must be a function that returns the function (to implement @tanstack/react-query)
export const statsLoader = (queryClient) => async () => {
  return await queryClient.ensureQueryData(statsQuery)
}
