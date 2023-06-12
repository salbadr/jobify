import Wrapper from '../assets/wrappers/ErrorPage';
import img from '../assets/images/not-found.svg';
import { Link } from 'react-router-dom';

const Error = () => {
    return (
        <Wrapper className='full-page'>
            <div>
                <img src={img} alt='not found' />
                <h3>Ohh! page not found</h3>
                <p>We can't seem to find what you are looking for</p>
                <Link to={'/'}>Go Back Home</Link>
            </div>
        </Wrapper>
    )
}

export default Error