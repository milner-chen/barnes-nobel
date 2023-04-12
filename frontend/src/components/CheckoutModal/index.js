import { useState } from "react";
import SignupForm from "./SignupForm";
import { Modal } from "../../context/Modal";

const CheckoutModal = () => {
    const [showModal, setShowModal] = useState(false);

    const closeModal = () => {
        // can pass function down to the child + have the child use the function
        setShowModal(false);
    }

    return (
        <>
            <button  className="signup-button" onClick={() => setShowModal(true)}>Create an Account</button>
            {showModal && (
                <Modal onClose={closeModal} >
                    <h1>hi</h1>
                </Modal>
            )}
        </>
    )
}

export default CheckoutModal;