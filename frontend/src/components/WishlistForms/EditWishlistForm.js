import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as wishlistActions from "../../store/wishlist";

const EditWishlistForm = ({ closeModal, wishlistInfo, userId }) => {
    const dispatch = useDispatch();
    let list = useSelector(state => state.wishlists[wishlistInfo.id]);
    const wishlists = useSelector(state => Object.values(state?.wishlists));

    const [name, setName] = useState(list?.name);
    const [description, setDescription] = useState(list?.description || "");
    const [errors, setErrors] = useState([]);

    // useEffect(() => {
    //     dispatch(wishlistActions.fetchWishlists(userId));
    // }, [wishlistInfo]);

    const handleChange = (type, value) => {
        if (type === "name") {
            setName(value);
        } else {
            setDescription(value);
        }
    }

    const handleDelete = () => {
        dispatch(wishlistActions.deleteWishlist(wishlistInfo?.id));
        // wishlistInfo = wishlists[0];
        closeModal();
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        // can just string on a .then() to close the modal
        await dispatch(wishlistActions.updateWishlist({
            wishlist: {
                id: list?.id,
                userId,
                name,
                description
            }
        }))
        .then(res => {
            if (res.ok) closeModal();
        })
        .catch(async res => {
            const data = await res.json();
            console.log(data);
            if (data) setErrors(data);
        })
    }

    return (
        <div className="wishlist-section">
            <div className="form-header">
                <h3>Edit Wishlist</h3>
            </div>
            <form className="wishlist-form" onSubmit={handleSubmit}>
                {!!errors.length && <div className="errors">
                    {errors.map((error, i) => <p key={i}>{error}</p>)}
                </div>}
                <p className="label">Wishlist Name</p>
                <input
                    maxLength="30"
                    type="text"
                    value={name}
                    onChange={(e) => handleChange("name", e.target.value)}
                />
                <p className="label">Wishlist description</p>
                <textarea
                    maxLength="250"
                    value={description}
                    onChange={(e) => handleChange("description", e.target.value)}
                />
                <div className="two-buttons">
                    <button type="submit" onSubmit={e => e.preventDefault()} className="button submit-button">Save</button>
                    <p onClick={closeModal} className="button cancel-button">Cancel</p>
                </div>
            </form>
            {wishlistInfo.id !== wishlists[0]?.id && (
                <div className="delete-section">
                    <p>{wishlistInfo?.id}</p>
                    <div>test</div>
                    <p onClick={handleDelete}> Delete this Wishlist</p>
                </div>
            )}
        </div>
    )
}

export default EditWishlistForm;