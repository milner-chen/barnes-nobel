import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";


const ProfileButton = () => {
    const currentUser = useSelector(state => state.session.user);

    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    }

    const closeMenu = () => {
        if (!showMenu) return;
        setShowMenu(false);
    }

    // useEffect(() => {
    //     if (!showMenu) return;

    //     const closeMenu = () => {
    //         setShowMenu(false);
    //     };
        
    //     document.addEventListener('mouseenter', setShowMenu(false));

    // })

    const loginDemo = () => {
        dispatch(sessionActions.login({ email: 'demo@user.io', password: 'password' }));
    }

    let buttons;

    currentUser ? buttons = (
        <button onClick={() => dispatch(sessionActions.logout())}>Log Out</button>
    ) : buttons = (
        <>
            <LoginFormModal />
            {/* <button >Login</button> */}
            <SignupFormModal />
            {/* <button >Sign up</button> */}
            <button className="demo-user" onClick={loginDemo}>Demo</button>
        </>
    )
// onMouseLeave={closeMenu}
// onMouseOver={openMenu}
    return (
        <div className="acc-block">
            <div  className="account-bar" >
                <i className="fa-solid fa-user" />
                {/* <i className="fa-light fa-circle-user" /> */}
                <p id="my-acc">MY ACCOUNT</p>
            </div>
            {/* {showMenu && ( */}
                <ul className="profile-dropdown">
                    {buttons}
                </ul>
            {/* )} */}
        </div>
    );
}

export default ProfileButton;