import { Outlet, useNavigate, useNavigation } from 'react-router-dom'
import { useState, createContext, useContext, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import Wrapper from 'assets/wrappers/Dashboard'
import { Navbar, BigSidebar, SmallSidebar, Loading } from 'components'
import { checkDefaultTheme } from '../App.jsx'
import { logoutAction, userQuery } from 'utils/actions'
import customFetch from 'utils/customFetch'

const DashboardContext = createContext()

const DashboardLayout = ({ queryClient }) => {
  const navigate = useNavigate()
  const navigation = useNavigation()
  const isPageLoading = navigation.state === 'loading'

  const { user } = useQuery(userQuery)?.data

  const [showSidebar, setShowSidebar] = useState(false)
  const [isDarkTheme, setIsDarkTheme] = useState(checkDefaultTheme())
  const [isAuthError, setIsAuthError] = useState(false)

  const toggleDarkTheme = () => {
    const newThemeValue = !isDarkTheme

    setIsDarkTheme(newThemeValue)
    document.body.classList.toggle('dark-theme', newThemeValue)
    localStorage.setItem('darkTheme', newThemeValue)
  }

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar)
  }

  const logoutUser = async () => {
    await logoutAction(queryClient)
    toast.success('Logged out')
    navigate('/')
  }

  customFetch.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      if (error?.response?.status === 401) {
        setIsAuthError(true)
      }

      return Promise.reject(error)
    },
  )

  useEffect(() => {
    if (!isAuthError) return

    logoutUser()
  }, [isAuthError])

  return (
    <DashboardContext.Provider
      value={{
        user,
        showSidebar,
        isDarkTheme,
        toggleDarkTheme,
        toggleSidebar,
        logoutUser,
      }}
    >
      <Wrapper>
        <main className="dashboard">
          <SmallSidebar />
          <BigSidebar />
          <div>
            <Navbar />
            <div className="dashboard-page">
              {isPageLoading ? <Loading /> : <Outlet context={{ user }} />}
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  )
}

export const useDashboardContext = () => useContext(DashboardContext)

export default DashboardLayout
