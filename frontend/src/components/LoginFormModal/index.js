import { useState } from "react";
import LoginForm from "./LoginForm";
import { Modal } from "../../context/Modal";
import SignupForm from "../SignupFormModal/SignupForm";
import SignupFormModal from "../SignupFormModal";

const LoginFormModal = () => {
    const [showModal, setShowModal] = useState(false);
    // const [currModal, setCurrModal] = useState("loginForm");
    // local state to keep track of login form and signup form
        // on click -> set the currModal to the name of the current modal
    
    const closeModal = () => {
        // can pass function down to the child + have the child use the function
        setShowModal(false);
    }

    // clicking on the initial sign in button will open the loginForm
    // const handleClick = () => {
    //     setCurrModal("loginForm");
    //     setShowModal(true);
    // }

    // 
    // const closeLoginModal = () => {
    //     setShowModal(false);
    //     setCurrModal('signupForm');
    //     setShowModal(true);
    // }

    return (
        <>
            <button className="dropdown-signin-button" onClick={() => setShowModal(true)}>Sign In</button>
            {showModal && (
                <Modal onClose={closeModal} >
                    <LoginForm closeModal={closeModal} />
                </Modal>
            )}
            {/* {showModal && (
                <Modal onClose={() => setShowModal(false) } >
                    {currModal === "loginForm" && (
                        // help from sean abbas
                        <>
                            <LoginForm />
                            <button onClick={closeLoginModal}>
                                <SignupFormModal />
                            </button>
                        </>
                    
                    )} 
                    {currModal === "signupForm" && <SignupForm />}
                </Modal>
            )} */}
        </>
    )


}

export default LoginFormModal;

//closeLoginModal={closeLoginModal} 