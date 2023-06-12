import moment from 'moment';
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/appContext';
import Wrapper from '../assets/wrappers/Job';
import JobsInfo from './JobsInfo';

const Job = ({ _id, company, position, status, jobType, jobLocation, createdAt }) => {
    let date = moment(createdAt).format('MMM Do, YYYY');
    const { setEditJob, deleteJob } = useAppContext();


    const handleEditJob = () => {
        setEditJob({ _id, company, position, status, jobType, jobLocation });
    }

    const handleDeleteJob = () => {
        deleteJob(_id);
    }

    return (
        <Wrapper>
            <header>
                <div className='main-icon'>{company.charAt(0)}</div>
                <div className='info'>
                    <h5>{position}</h5>
                    <p>{company}</p>
                </div>
            </header>
            <div className='content'>
                <div className='content-center'>
                    <JobsInfo icon={<FaLocationArrow />} text={jobLocation} />
                    <JobsInfo icon={<FaCalendarAlt />} text={date} />
                    <JobsInfo icon={<FaBriefcase />} text={jobType} />
                    <div className={`status ${status}`}>{status}</div>
                </div>
                <footer>
                    <div className='actions'>
                        <Link
                            to='/add-job'
                            onClick={handleEditJob}
                            className='btn edit-btn'>
                            Edit
                        </Link>
                        <button type='button' onClick={handleDeleteJob} className='btn delete-btn'>delete</button>

                    </div>
                </footer>
            </div>

        </Wrapper>
    )
}

export default Job;