import { useState } from "react";
import CreateWishlistForm from "./CreateWishlistForm";
import { Modal } from "../../context/Modal";

const CreateWishlistModal = ({userId}) => {
    const [showModal, setShowModal] = useState(false);

    const closeModal = () => {
        setShowModal(false);
    }

    return (
        <>
        <div onClick={() => setShowModal(true)}>+ Create New Wishlist</div>
            {showModal && (
                <Modal onClose={closeModal}>
                    <CreateWishlistForm closeModal={closeModal} userId={userId} />
                </Modal>
            )}
        </>
    )
}

export default CreateWishlistModal;