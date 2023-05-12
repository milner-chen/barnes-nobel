import { useState } from "react";
import { Modal } from "../../context/Modal"
import EditWishlistForm from "./EditWishlistForm";

const EditWishlistModal = ({ wishlist, userId }) => {
    const [showModal, setShowModal] = useState(false);
    const closeModal = () => {
        setShowModal(false);
    }

    return (
        <>
        <div className="edit-wishlist-modal" onClick={() => setShowModal(true)}>
            <i className="fa-solid fa-pen"></i>
            <div className="remove-item">Edit this Wishlist</div>
            </div>
        {showModal && (
            <Modal onClose={closeModal}>
                <EditWishlistForm closeModal={closeModal} userId={userId} wishlistInfo={wishlist} />
            </Modal>
        )}
        </>
    )
}

export default EditWishlistModal;