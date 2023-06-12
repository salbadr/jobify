import { useState } from 'react';
import Wrapper from '../../assets/wrappers/DashboardFormPage';
import { FormRow, Alert } from '../../components/';
import { useAppContext } from '../../context/appContext';


const Profile = () => {
    const { showAlert, displayAlert, isLoading, user, updateUser } = useAppContext()
    const [values, setValues] = useState(user)


    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const { name, email, lastName, location } = values;
        if (!email || !name || !lastName || !location) {
            displayAlert()
            return
        }
        updateUser({ name, email, lastName, location });
    }

    return (
        <Wrapper>
            <form className='form' onSubmit={handleSubmit}>
                <h3>Profile</h3>
                {showAlert && <Alert />}
                <div className='form-center'>
                    <FormRow type='text' name='name' value={values.name} handleChange={handleChange} />
                    <FormRow type='text' name='lastName' value={values.lastName} labelText={'Last Name'} handleChange={handleChange} />
                    <FormRow type='email' name='email' value={values.email} handleChange={handleChange} />
                    <FormRow type='text' name='location' value={values.location} handleChange={handleChange} />

                    <button type='submit' className='btn btn-block' disabled={isLoading}>
                        {isLoading ? 'Please Wait...' : 'save changes'}
                    </button>

                </div>


            </form>
        </Wrapper>
    )


};

export default Profile