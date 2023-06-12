
import { FaTimes } from "react-icons/fa";
import Wrapper from "../assets/wrappers/SmallSidebar";
import Logo from "./Logo";
import { useAppContext } from "../context/appContext";
import NavLinks from "./NavLinks";

const SmallSidebar = () => {

    const { showSidebar, toggleSidebar } = useAppContext();
    const handleCloseSidebar = () => {
        toggleSidebar()
    }
    return (
        <Wrapper>
            <div className={showSidebar ? "sidebar-container show-sidebar" : "sidebar-container"}>
                <div className="content">
                    <button className="close-btn" onClick={handleCloseSidebar}>
                        <FaTimes />
                    </button>
                    <header>
                        <Logo />
                    </header>
                    <NavLinks handleCloseSidebar={handleCloseSidebar} />
                </div>
            </div>
        </Wrapper>
    )
}

export default SmallSidebar;