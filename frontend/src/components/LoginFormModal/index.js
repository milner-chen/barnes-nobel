import { useState } from "react";
import LoginForm from "./LoginForm";
import { Modal } from "../../context/Modal";
import SignupForm from "../SignupFormModal/SignupForm";

const LoginFormModal = () => {
    const [showModal, setShowModal] = useState(false);
    const [currModal, setCurrModal] = useState("loginForm");
    // local state to keep track of login form and signup form
        // on click -> set the currModal to the name of the current modal
    

    const closeLoginModal = () => {
        setShowModal(false);
    }
    return (
        <>
            <button className="dropdown-signin-button" onClick={() => setShowModal(true)}>Sign In</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false) } >
                    {currModal === "loginForm" && <LoginForm />} 
                    {currModal === "signupForm" && <SignupForm />}
                </Modal>
            )}
        </>
    )
}

export default LoginFormModal;

//closeLoginModal={closeLoginModal} 