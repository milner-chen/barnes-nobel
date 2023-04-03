import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import { NavLink } from "react-router-dom";

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
            <ul>
                <NavLink exact to="/">Home</NavLink>
                <ProfileButton />
            </ul>
        </>
    )
}

export default Navigation;