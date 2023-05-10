import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as wishlistActions from "../../store/wishlist";
import * as wishlistItemActions from "../../store/wishlistItem";

const AddToWishlistForm = ({ closeModal, product }) => {

    
    const dispatch = useDispatch();
    
    const [showDrop, setShowDrop] = useState(false);
    const userId = useSelector(state => state.session?.user?.id);
    const wishlists = useSelector(state => Object.values(state?.wishlists));
    const inCart = useSelector(state => state?.cartItems[product?.id]);
    const [list, setList] = useState(wishlists[0]);
    console.log(product.id);

    const handleSubmit = async () => {
        // setErrors([]);
        const result = await dispatch(wishlistItemActions.createWishlistItem({
            wishlistItem: {
                wishlistId: list.id,
                productId: product.id,
                // inCart: false
            },
            userId
        }));
    }

    // useEffect(() => {
    //     dispatch(wishlistActions.fetchWishlists(userId));
    // }, [wishlists]);

    return (
        <div className="wishlist-section">
            <div className="form-header">
                <h3>Add an item to a wishlist</h3>
            </div>
            <div className="product-preview">
                <img src={`${product.photoUrl}`} />
                {product?.name}
            </div>
            <div>
                <p>Select a wishlist</p>
                <div onClick={() => setShowDrop(!showDrop)}>{list?.name}</div>
                {showDrop && (
                    <div>
                        {wishlists.map(list => {
                            return <p onClick={() => {setList(list); setShowDrop(false)}} key={list.id} >{list.name}</p>
                        })}
                    </div>
                )}
                <div className="two-buttons">
                    <button onClick={handleSubmit} className="button submit-button">Add Item</button>
                    <p onClick={closeModal} className="button cancel-button">Cancel</p>
                </div>
            </div>
        </div>
    )
}

export default AddToWishlistForm;