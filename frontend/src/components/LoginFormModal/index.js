import { useState } from "react";
import LoginForm from "./LoginForm";
import { Modal } from "../../context/Modal";

const LoginFormModal = () => {
    const [showModal, setShowModal] = useState(false);

    const closeLoginModal = () => {
        setShowModal(false);
    }
    return (
        <>
            <button className="dropdown-signin-button" onClick={() => setShowModal(true)}>Sign In</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false) } >
                    <LoginForm closeLoginModal={closeLoginModal} />
                </Modal>
            )}
        </>
    )
}

export default LoginFormModal;