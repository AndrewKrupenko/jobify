import { FaSuitcaseRolling, FaCalendarCheck } from 'react-icons/fa'
import { useLoaderData } from 'react-router-dom'

import Wrapper from 'assets/wrappers/StatsContainer'
import StatItem from 'components/StatItem.jsx'

const Admin = () => {
  const { users, jobs } = useLoaderData()

  return (
    <Wrapper>
      <StatItem
        title="Current users"
        count={users}
        color="#e9b949"
        bcg="#fcefc7"
        icon={<FaSuitcaseRolling />}
      />
      <StatItem
        title="Total jobs"
        count={jobs}
        color="#647acb"
        bcg="#e0e8f9"
        icon={<FaCalendarCheck />}
      />
    </Wrapper>
  )
}

export default Admin
