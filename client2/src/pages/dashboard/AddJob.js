import Wrapper from '../../assets/wrappers/DashboardFormPage';
import { FormRow, FormRowSelect, Alert } from '../../components/';
import { useAppContext } from '../../context/appContext';


const AddJob = () => {
    const { showAlert, displayAlert, isLoading, handleJobChange, clearJobValues, job, createJob } = useAppContext()

    const handleChange = (e) => {
        handleJobChange({ name: e.target.name, value: e.target.value })
    }

    const handleClear = (e) => {
        e.preventDefault();
        clearJobValues()
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const { position, company, jobLocation, jobType, status, editJobId } = job;

        if (!position || !company || !jobLocation) {
            displayAlert()
            return
        }

        createJob({ position, company, jobLocation, jobType, status, editJobId })
    }

    return (
        <Wrapper>
            <form className='form' onSubmit={handleSubmit}>
                <h3>{job.isEditing ? 'edit job' : 'add job'}</h3>
                {showAlert && <Alert />}
                <div className='form-center'>
                    <FormRow type='text' name='position' value={job.position} handleChange={handleChange} />
                    <FormRow type='text' name='company' value={job.company} handleChange={handleChange} />
                    <FormRow type='text' name='jobLocation' labelText={'Job Location'} value={job.jobLocation} handleChange={handleChange} />
                    <FormRowSelect name="status" value={job.status} list={job.statusOptions} handleChange={handleChange} />
                    <FormRowSelect name="jobType" value={job.jobType} labelText={'Job Type'} list={job.jobTypeOptions} handleChange={handleChange} />
                    <div className='btn-container'>
                        <button type='submit' className='btn btn-block' disabled={isLoading}>
                            {isLoading ? 'Please Wait...' : 'save changes'}
                        </button>
                        <button type='button' className='btn btn-block clear-btn' onClick={handleClear} >
                            clear
                        </button>
                    </div>
                </div>
            </form>
        </Wrapper>
    )
};

export default AddJob