import { createContext, useContext } from 'react'
import { useLoaderData } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

import { JobsContainer, SearchContainer } from 'components'
import { allJobsQuery } from 'utils/actions'

const AllJobsContext = createContext()

const AllJobs = () => {
  const { searchValues } = useLoaderData()
  const { data } = useQuery(allJobsQuery(searchValues))

  return (
    <AllJobsContext.Provider value={{ data, searchValues }}>
      <SearchContainer />
      <JobsContainer />
    </AllJobsContext.Provider>
  )
}

export const useAllJobsContext = () => useContext(AllJobsContext)

export default AllJobs
