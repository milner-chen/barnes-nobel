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
            let currName = value;
            setName(currName);
            // if (currName)
        } else {
            let currDescription = value;
            setDescription(currDescription);
        }
    }

    const handleSubmit = () => {
        dispatch(wishlistActions.createWishlist({
            wishlist: {
                userId,
                name,
                description
            }
        }));
    }
    
    return (
        <div>
            <div className="form-header">
                <h3>Create a New Wishlist</h3>
            </div>
            <form>
                {!!errors.length && <div className="errors">
                    {errors.map((error, i) => <p key={i}>{error}</p>)}
                </div>}
                <label>Wishlist Name
                    <input
                    type="text"
                    value={name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    />
                </label>
                <label>Wishlist description
                    <textarea
                    value={description}
                    onChange={(e) => handleChange("description", e.target.value)}
                    />
                </label>
                <div onClick={handleSubmit}>Create New Wishlist</div>
                <p onClick={closeModal}>Cancel</p>
            </form>
        </div>
    )
}

export default CreateWishlistForm;