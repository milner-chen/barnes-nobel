import { useState } from "react";
import SignupForm from "./SignupForm";
import { Modal } from "../../context/Modal";

const SignupFormModal = () => {
    const [showModal, setShowModal] = useState(false);
    return (
        <>
            <button  className="signup-button" onClick={() => setShowModal(true)}>Create an Account</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false) } >
                    <SignupForm />
                </Modal>
            )}
        </>
    )
}

export default SignupFormModal;