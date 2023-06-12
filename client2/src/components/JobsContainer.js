import { useEffect } from "react";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/JobsContainer"
import { Loading, Job, PageContainer } from './';

const JobsContainer = () => {

    const { getJobs, isLoading, job } = useAppContext()
    const { jobs, page, totalJobs, numOfPages, search, searchStatus, sort, searchType } = job;
    useEffect(() => {
        getJobs();
    },
        // eslint-disable-next-line
        [search, searchStatus, searchType, sort, page]);

    if (isLoading) {
        return <Loading center />
    }

    if (jobs.length === 0) {
        return (
            <Wrapper>
                <h2>No jobs to display...</h2>
            </Wrapper>)
    }

    return (
        <Wrapper>
            <h5>{totalJobs} job{jobs.length > 1 && 's'} found</h5>
            <div className="jobs">
                {jobs.map((job) => {
                    return <Job key={job._id}{...job} />
                })}

            </div>
            {numOfPages > 1 && <PageContainer />}
        </Wrapper>
    )
}

export default JobsContainer