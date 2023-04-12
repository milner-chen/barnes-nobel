// import { useState } from "react";
// import SignupForm from "./SignupForm";
// import { Modal } from "../../context/Modal";
import './GuestModal.css';

const CheckoutModal = () => {
    return (
        <div className="guest-modal">
            <h1>
                Thank you for your order!
            </h1>
            <p>
                Unfortunately, I can neither take your money, nor provide any books.
            </p>
            <p>Please order from us again! c:</p>
        </div>
    )
}


export default CheckoutModal;