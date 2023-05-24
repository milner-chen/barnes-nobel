import { useState } from "react";
import { useDispatch } from "react-redux";
import * as wishlistActions from "../../store/wishlist";

const CreateWishlistForm = ({closeModal, userId}) => {
    const dispatch = useDispatch();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [errors, setErrors] = useState([]);

    const handleChange = (type, value) => {
        if (type === "name") {
            setName(value);
        } else {
            setDescription(value);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        const otherRes = await dispatch(wishlistActions.createWishlist({
            wishlist: {
                userId,
                name,
                description
            }
        }))
        .then(data => {
            if (data.errors) setErrors(data.errors);
            else closeModal();
        })
        // .catch(async res => {
        //     const data = await res.json();
        //     // console.log(data);
        //     if (data) setErrors(data);
        // });
        // if (otherRes.ok) closeModal();
    }
    
    return (
        <div className="wishlist-section">
            <div className="form-header">
                <h3>Create a New Wishlist</h3>
            </div>
            <form className="wishlist-form" onSubmit={handleSubmit}>
                {!!errors.length && <div className="errors">
                    {errors.map((error, i) => <p key={i}>{error}</p>)}
                </div>}

                <p className="label">Wishlist Name</p>
                    <input
                    maxLength="30"
                    // placeholder="Wishlist Name"
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
                    <button type="submit" onSubmit={e => e.preventDefault()} className="button submit-button">Create New Wishlist</button>
                    <p onClick={closeModal} className="button cancel-button">Cancel</p>
                </div>
            </form>
        </div>
    )
}

export default CreateWishlistForm;