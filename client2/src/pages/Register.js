import { useEffect, useState } from 'react';
import Wrapper from '../assets/wrappers/RegisterPage';
import { Logo, FormRow, Alert } from '../components/';
import { useAppContext } from '../context/appContext';
import { useNavigate } from 'react-router-dom';

const initialState = {
    name: '',
    password: '',
    email: '',
    isMember: true,
}

const Register = () => {
    const { showAlert, displayAlert, registerUser, loginUser, isLoading, user } = useAppContext()
    const navigate = useNavigate();

    const [values, setValues] = useState(initialState)

    useEffect(() => {
        if (user) {
            setTimeout(() => {
                navigate('/')
            }, 3000)
        }
    }, [user, navigate]);

    const toogleMember = () => {
        setValues({ ...values, isMember: !values.isMember })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const { name, email, password, isMember } = values;
        if (!email || !password || (!isMember && !name)) {
            displayAlert()
            return
        }
        if (isMember) {
            loginUser({ email, password })
        }
        else {
            registerUser({ name, email, password });
        }

    }
    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }
    return (
        <Wrapper className='full-page'>
            <form className='form' onSubmit={handleSubmit}>
                <Logo />
                <h3>{values.isMember ? 'Login' : 'Register'}</h3>
                {showAlert && <Alert />}
                <div>
                    {!values.isMember && <FormRow type='text' name='name' value={values.name} handleChange={handleChange} />}
                    <FormRow type='email' name='email' value={values.email} handleChange={handleChange} />
                    <FormRow type='password' name='password' value={values.password} handleChange={handleChange} />

                    <button type='submit' className='btn btn-block' disabled={isLoading}>submit</button>

                </div>

                <p>
                    {values.isMember ? 'Not a member yet?' : 'Already a member?'}
                    <button type='button' onClick={toogleMember} className='member-btn'>
                        {values.isMember ? 'Register' : 'Login'}
                    </button>

                </p>


            </form>
        </Wrapper>
    )
}

export default Register