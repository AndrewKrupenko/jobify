import { useLoaderData } from 'react-router-dom'

import { ChartsContainer, StatsContainer } from 'components'

const Stats = () => {
  const { defaultStats, monthlyApplications } = useLoaderData()

  return (
    <>
      <StatsContainer defaultStats={defaultStats} />
      {monthlyApplications?.length > 0 && (
        <ChartsContainer data={monthlyApplications} />
      )}
    </>
  )
}

export default Stats
