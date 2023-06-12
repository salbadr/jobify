import { useEffect } from "react";
import { useAppContext } from "../../context/appContext";
import { StatsContainer, Loading, ChartContainer } from '../../components';

const Stats = () => {
    const { showStats, job, isLoading } = useAppContext()

    const { stats, monthlyApplications } = job;
    useEffect(() => {
        showStats();
    },
        // eslint-disable-next-line
        []);
    if (isLoading) {
        return <><Loading center /></>
    }
    return (
        <>
            <StatsContainer stats={stats} />
            <ChartContainer monthlyApplications={monthlyApplications} />
        </>
    )
};

export default Stats