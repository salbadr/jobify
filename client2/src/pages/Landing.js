import main from '../assets/images/main.svg';
import Wrapper from '../assets/wrappers/LandingPage';
import { Logo } from '../components/';
import { Link } from 'react-router-dom';

const Landing = () => {
    return (
        <Wrapper>
            <nav>
                <Logo />
            </nav>
            <div className='container page'>
                <div className='info'>
                    <h1>job <span>Tracking</span> App</h1>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas hendrerit justo consequat faucibus feugiat. Nunc vel ligula in nunc rutrum tempor sit amet in velit. Praesent ornare mollis efficitur. Nam tempor purus nunc, at facilisis odio tempor non. In sed eleifend magna, sit amet tincidunt magna. Vivamus cursus libero accumsan dictum volutpat. Duis malesuada facilisis augue. Nunc fermentum porta velit eget auctor.
                    </p>
                    <Link to="/register" className='btn btn-hero'>Login/Register</Link>
                </div>
                <img src={main} alt='job hunt' className='img main-img' />
            </div>
        </Wrapper>
    )
}

export default Landing