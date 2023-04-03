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
        
    //     // document.addEventListener('mouseout', setShowMenu(false));

    // })

    let buttons;

    currentUser ? buttons = (
        <button onClick={() => dispatch(sessionActions.logout())}>Log Out</button>
    ) : buttons = (
        <>
            <LoginFormModal />
            {/* <button >Login</button> */}
            <SignupFormModal />
            {/* <button >Sign up</button> */}
        </>
    )

    return (
        <div className="acc-block" onMouseLeave={closeMenu}>
            <div  className="account-bar" onMouseOver={openMenu}>
                <i className="fa-solid fa-user" />
                {/* <i className="fa-light fa-circle-user" /> */}
                <p id="my-acc">My Account</p>
            </div>
            {showMenu && (
                <ul className="profile-dropdown">
                    {buttons}
                </ul>
            )}
        </div>
    );
}

export default ProfileButton;