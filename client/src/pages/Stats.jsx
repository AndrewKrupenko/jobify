import { useQuery } from '@tanstack/react-query'

import { ChartsContainer, StatsContainer } from 'components'
import { statsQuery } from 'utils/actions'

const Stats = () => {
  const { data } = useQuery(statsQuery)
  const { defaultStats, monthlyApplications } = data

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
