import { toast } from 'react-toastify'
import { redirect } from 'react-router-dom'

import customFetch from './customFetch.js'

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

export const loginAction = async ({ request }) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)

  try {
    await customFetch.post('/auth/login', data)
    toast.success('Login successful')

    return redirect('/dashboard')
  } catch (error) {
    toast.error(error?.response?.data?.msg)

    return error
  }
}

export const logoutAction = async () => {
  await customFetch.get('/auth/logout')
  toast.success('Logged out')
}

export const dashboardLoader = async () => {
  try {
    const { data } = await customFetch('/users/current-user')

    return data
  } catch (error) {
    console.error({ error })

    return redirect('/')
  }
}
