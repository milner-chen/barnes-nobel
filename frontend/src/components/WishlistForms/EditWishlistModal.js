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
        <div onClick={() => setShowModal(true)}>Edit this Wishlist</div>
        {showModal && (
            <Modal onClose={closeModal}>
                <EditWishlistForm closeModal={closeModal} userId={userId} wishlistInfo={wishlist} />
            </Modal>
        )}
        </>
    )
}

export default EditWishlistModal;