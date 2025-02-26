import { createContext, useContext } from 'react'
import { useLoaderData } from 'react-router-dom'

import { JobsContainer, SearchContainer } from 'components'

const AllJobsContext = createContext()

const AllJobs = () => {
  const { data } = useLoaderData()

  return (
    <AllJobsContext.Provider value={{ data }}>
      <SearchContainer />
      <JobsContainer />
    </AllJobsContext.Provider>
  )
}

export const useAllJobsContext = () => useContext(AllJobsContext)

export default AllJobs
