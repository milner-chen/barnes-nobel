import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as wishlistActions from "../../store/wishlist";
import * as wishlistItemActions from "../../store/wishlistItem";
import "../WishlistForms/WishlistForms.css";

const AddToWishlistForm = ({ closeModal, product }) => {

    
    const dispatch = useDispatch();
    
    const [showDrop, setShowDrop] = useState(false);
    const [errors, setErrors] = useState([]);
    const userId = useSelector(state => state.session?.user?.id);
    const wishlists = useSelector(state => Object.values(state?.wishlists));
    // const inCart = useSelector(state => state?.cartItems[product?.id]);
    const [list, setList] = useState(wishlists[0]);
    // console.log("initialList", list);
    // console.log("first wishlist, supposedly:", wishlists);
    // let message = "Add Item";
    const [message, setMessage] = useState("Add Item");

    const changeMessage = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const handleSubmit = async () => {
        setErrors([]);
        // console.log("wishlists", wishlists);
        // console.log("list", list);
        // console.log("productId", product);
        const result = await dispatch(wishlistItemActions.createWishlistItem({
            wishlistItem: {
                wishlistId: list ? list?.id : wishlists[0]?.id,
                productId: product.id,
                // inCart: false
            },
            userId
        }))
        .then(async data => {

            if (data.errors) {
                setErrors(data.errors);
            } else {
                setMessage("Item Added");
                await changeMessage(1000);
                setMessage("Add Item");
                closeModal();
            }
        })
        // .catch(async res => {
        //     const data = await res.json();
        //     if (data) setErrors(data);
        // });
        // if (result.ok) closeModal();
    }

    // useEffect(() => {
    //     dispatch(wishlistActions.fetchWishlists(userId));
    // }, [wishlists]);

    return (
        <div className="wishlist-section">
            <div className="form-header">
                <h3>Add an item to a wishlist</h3>
            </div>
            <div className="wishlist-form">
            
            {!!errors.length && <div className="errors">
                    {errors.map((error, i) => <p key={i}>{error}</p>)}
                </div>}
            <div className="product-preview">
                <img src={`${product.photoUrl}`} />
                <div>
                    <p className="title">{product?.name}</p>
                    <p>by {product?.seller}</p>
                    <p>{product?.format}</p>
                    <p className="price">${product?.price}</p>
                </div>
            </div>
            <div>
                <p>Select a wishlist</p>
                <div className="wishlist-holder" onClick={() => setShowDrop(!showDrop)}>
                    <p>{list?.name || wishlists[0]?.name}</p>
                    <i className="fa-solid fa-angle-down"></i>
                </div>
                {showDrop && (
                    <div className="wishlist-dropdown">
                        {wishlists.map(list => {
                            return <p onClick={() => {setList(list); setShowDrop(false)}} key={list.id} >{list.name}</p>
                        })}
                    </div>
                )}
                <div className="two-buttons">
                    <button onClick={handleSubmit} className={`button submit-button ${message === "Item Added" ? "added-item" : ""}`} >{message}</button>
                    <p onClick={closeModal} className="button cancel-button">Cancel</p>
                </div>
            </div>
            </div>
        </div>
    )
}

export default AddToWishlistForm;