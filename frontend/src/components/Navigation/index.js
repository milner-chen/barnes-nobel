import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import { NavLink } from "react-router-dom";
import './Navigation.css'

const Navigation = () => {
    // const currentUser = useSelector(state => state.session.user);

    // let links;
    // currentUser ? links = <ProfileButton user={ currentUser } />
    //             : links = (
    //                 <>
    //                     <NavLink to="/login">Log In</NavLink>
    //                     <NavLink to="/signup">Sign Up</NavLink>
    //                 </>
    //             )
    return (
        <>
            <div className="top-slider"></div>
            <ul className="mid-nav-bar">
                <ProfileButton />
            </ul>
            <ul>
                <NavLink exact to="/">Barnes &#38; Noble</NavLink>
            </ul>
        </>
    )
}

export default Navigation;