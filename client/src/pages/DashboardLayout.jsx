import { Outlet, useLoaderData, useNavigate } from 'react-router-dom'
import { useState, createContext, useContext } from 'react'

import Wrapper from 'assets/wrappers/Dashboard'
import { Navbar, BigSidebar, SmallSidebar } from 'components'
import { checkDefaultTheme } from '../App.jsx'
import { logoutAction } from 'utils/actions'

const DashboardContext = createContext()

const Dashboard = () => {
  const navigate = useNavigate()

  const { user } = useLoaderData()

  const [showSidebar, setShowSidebar] = useState(false)
  const [isDarkTheme, setIsDarkTheme] = useState(checkDefaultTheme())

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
    await logoutAction()
    navigate('/')
  }

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
              <Outlet context={{ user }} />
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  )
}

export const useDashboardContext = () => useContext(DashboardContext)

export default Dashboard
