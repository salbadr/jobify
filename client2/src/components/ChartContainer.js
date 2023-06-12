import Wrapper from "../assets/wrappers/ChartsContainer"
import BarChart from "./BarChart";
import AreaChart from "./AreaChart";
import { useState } from "react";

const ChartContainer = ({ monthlyApplications }) => {
    const [barChart, setBarChart] = useState(true);
    if (monthlyApplications.length === 0) {
        return <></>;
    }
    const handleChart = () => {
        setBarChart(!barChart);
    }
    return (
        <Wrapper>
            <h4>Monthly Applications</h4>
            <button type="button" onClick={handleChart}>
                {barChart ? 'Bar Chart' : 'Area Chart'}
            </button>
            {barChart ? <BarChart data={monthlyApplications} /> : <AreaChart data={monthlyApplications} />}

        </Wrapper>)
}

export default ChartContainer