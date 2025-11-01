import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from 'react-icons/fa'

import Wrapper from 'assets/wrappers/StatsContainer'
import StatItem from 'components/StatItem'

const StatsContainer = ({ defaultStats }) => {
  const stats = [
    {
      title: 'Pending applications',
      count: defaultStats?.pending || 0,
      icon: <FaSuitcaseRolling />,
      color: '#f59e0b',
      bcg: '#fef3c7',
    },
    {
      title: 'Interviews scheduled',
      count: defaultStats?.interview || 0,
      icon: <FaCalendarCheck />,
      color: '#647acb',
      bcg: '#e0e8f9',
    },
    {
      title: 'Jobs declined',
      count: defaultStats?.declined || 0,
      icon: <FaBug />,
      color: '#d66a6a',
      bcg: '#ffeeee',
    },
  ]

  return (
    <Wrapper>
      {stats.map((item) => (
        <StatItem key={item.title} {...item} />
      ))}
    </Wrapper>
  )
}

export default StatsContainer
