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
        <p className="create-wish-modal" onClick={() => setShowModal(true)}>+ Create New Wishlist</p>
            {showModal && (
                <Modal onClose={closeModal}>
                    <CreateWishlistForm closeModal={closeModal} userId={userId} />
                </Modal>
            )}
        </>
    )
}

export default CreateWishlistModal;