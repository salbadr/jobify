import { FaBug, FaCalendarCheck, FaSuitcaseRolling } from "react-icons/fa"
import StatsItem from "./StatsItem"
import Wrapper from '../assets/wrappers/StatsContainer';

const StatsContainer = ({ stats }) => {
    const defaultStats = [
        {
            title: 'pending applications',
            count: stats.pending,
            icon: <FaSuitcaseRolling />,
            color: '#e9b949',
            bcg: '#fcefc7'
        },
        {
            title: 'interviews scheduled',
            count: stats.interview,
            icon: <FaCalendarCheck />,
            color: '#647acb',
            bcg: '#e0e8f9'
        },
        {
            title: 'jobs declined',
            count: stats.declined,
            icon: <FaBug />,
            color: '#d66a6a',
            bcg: '#ffeeee'
        }
    ]
    return (
        <Wrapper>
            {defaultStats.map((item, index) => <StatsItem key={index} {...item} />)}
        </Wrapper>)
}

export default StatsContainer