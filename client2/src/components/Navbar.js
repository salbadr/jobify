
import Wrapper from "../assets/wrappers/Navbar";
import { FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa';
import { useState } from "react";
import Logo from './Logo';
import { useAppContext } from '../context/appContext';

const Navbar = () => {
    const { user, toggleSidebar, logoutUser } = useAppContext();
    const [showMenu, setShowMenu] = useState(false);

    const handleMenuDisplay = () => {
        setShowMenu(!showMenu);
    }

    const handleSidebarDisplay = () => {
        toggleSidebar();
    }

    const handleLogout = () => {
        logoutUser();
    }
    return (
        <Wrapper>
            <div className="nav-center">
                <button
                    className="toggle-btn"
                    onClick={handleSidebarDisplay}
                >
                    <FaAlignLeft />
                </button>
                <div>
                    <Logo />
                    <h3 className="logo-text">dashboard</h3>
                </div>
                <div className="btn-container">
                    <button className="btn" onClick={handleMenuDisplay}>
                        <FaUserCircle />
                        {user?.name}
                        <FaCaretDown />
                    </button>
                    <div className={showMenu ? "dropdown show-dropdown" : 'dropdown'}>
                        <button
                            onClick={handleLogout}
                            className="dropdown-btn"
                        >Logout</button>
                    </div>

                </div>
            </div>
        </Wrapper>
    )
}

export default Navbar;