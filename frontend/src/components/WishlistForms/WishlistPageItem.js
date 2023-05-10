import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
// import "../CategoryPageItem/CategoryPageItem.css";
import "./WishlistPageItem.css";
import AddToCartButton from "../AddToCartButton";
import CheckoutModal from "../CheckoutModal";
import { Modal } from "../../context/Modal";
import { useState } from "react";

const WishlistPageItem = ({ product, item }) => {

    const [showModal, setShowModal] = useState(false);
    const closeModal = () => {
        setShowModal(false);
    }

    const inCart = useSelector(state => Object.values(state?.cartItems).find(cart => cart?.productId === product?.id));
    console.log(`is ${product?.name}`, inCart);

    return (
     <div className="wishlist-page-item">
        <NavLink to={`/${product?.id}`}>
            <div className='img-wrapper'>
                <img src={product?.photoUrl} alt={`${product?.photoUrl}`} />
            </div>
        </NavLink>
        <div className="page-item-left">
                <NavLink to={`/${product?.id}`}>
                    <h2 className='title'>{product?.name}</h2>
                </NavLink>
                <p className="author">by <span>{product?.seller}</span></p>
                <p>
                    <i className="fa-solid fa-star" />
                    <i className="fa-solid fa-star" />
                    <i className="fa-solid fa-star" />
                    <i className="fa-solid fa-star" />
                </p>
                <p className="bold">{product?.format}</p>
                <p className="bold">${product?.price}</p>
                <div className="item-buttons">
                {   inCart
                    ? (
                        <div className="show-buttons">
                            <button className="purchase-button in-cart">
                                <i className="fa-solid fa-check" />ADDED TO CART
                            </button>
                            <NavLink to="/cart">
                                <button className="purchase-button">View Cart</button>
                            </NavLink>
                        </div>
                        )
                    : (
                        <div className="show-buttons">
                            <AddToCartButton product={product} />
                            <button className="purchase-button" onClick={() => setShowModal(true)}>Instant Purchase</button>
                            {showModal && (
                                <Modal onClose={closeModal} >
                                    <CheckoutModal closeModal={closeModal} />
                                </Modal>
                            )}
                        </div>
                    )
                }
                </div>
        </div>
     </div>   
    )
}

export default WishlistPageItem;