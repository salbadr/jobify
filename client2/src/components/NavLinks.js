import links from "../utils/links";
import { NavLink } from "react-router-dom";

const NavLinks = ({ handleCloseSidebar }) => {
    return (
        <div className="nav-links">
            {links.map((link) =>
                <NavLink
                    key={link.id}
                    to={link.path}
                    className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                    onClick={handleCloseSidebar}
                >
                    <span className="icon">{link.icon}</span>
                    {link.text}
                </NavLink>)}
        </div>
    );
}

export default NavLinks;