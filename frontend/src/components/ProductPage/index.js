import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import './ProductPage.css';
import AddToCartButton from "../AddToCartButton";
import { useState } from "react";
import { Modal } from "../../context/Modal";
import CheckoutModal from "../CheckoutModal";
import * as wishlistActions from "../../store/wishlist";
import * as wishlistItemActions from "../../store/wishlistItem";
import AddToWishlistForm from "../WishlistForms/AddToWishlistForm";
import { useEffect } from "react";
import LoginForm from "../LoginFormModal/LoginForm";

const ProductPage = () => {

    const [showModal, setShowModal] = useState(false);
    const closeModal = () => {
        setShowModal(false);
    }

    const [showList, setShowList] = useState(false);
    const closeList = () => {
        setShowList(false);
    }
    
    const dispatch = useDispatch();
    const { productId } = useParams();
    // const cartItems = useSelector(state => Object.values(state.cartItems));
    const product = useSelector(state => state.products[productId]);
    const user = useSelector(state => state.session?.user);

    // const addToCart = () => {
    //     console.log('add to cart function is being reached');
    //     let inCart = false;
    //     let cartItem;
    //     cartItems.forEach(item => {
    //         if (parseInt(item.productId) === parseInt(productId)) {
    //             console.log('product already exists in cart')
    //             inCart = true;
    //             cartItem = item;
    //             return;
    //         }
    //     } );
    //     if (inCart) {
    //         console.log('updating item that was found');
    //         dispatch(cartItemActions.updateCartItem({
    //             id: cartItem.id,
    //             productId,
    //             quantity: cartItem.quantity += 1
    //         }))
    //     } else {
    //         console.log('product was not found in cart so we make a new cartItem');
    //         const data = dispatch(cartItemActions.createCartItem({
    //             cartItem: {
    //             userId,
    //             productId,
    //             quantity: 1
    //             }
    //         }));
    //         console.log(data);
    //     }
    // }

    // const addItems = () => {
        
    // }

    const handleHeart = () => {

    }

    useEffect(() => {
        dispatch(wishlistActions.fetchWishlists(user?.id));
    }, [user?.id]);

    // console.log(product);
    if (!product) return null;
    return (
        <div className="show-page">
        <div className="show-body">
            <div className="show-content">
                <div className="img-wrapper">
                    <img src={product.photoUrl} alt={`${product.photoUrl}`} />
                    <div className="wishlist-button" onClick={() => {setShowList(true)}}>
                        <i className="fa-regular fa-heart"></i>
                        <p>Add to Wishlist</p>
                    </div>
                    {showList && user?.id && (
                            <Modal onClose={closeList} >
                                {/* <CheckoutModal closeModal={closeList} /> */}
                                <AddToWishlistForm closeModal={closeList} product={product} />
                            </Modal>
                    )}
                    {showList && !user?.id && (
                            <Modal onClose={closeList} >
                                {/* <CheckoutModal closeModal={closeList} /> */}
                                <LoginForm />
                            </Modal>
                    )}
                </div>
                <div className="product-info">
                    <h2>{product.name}</h2>
                    <p>by <span>{product.seller}</span></p>
                    <p>
                    <i className="fa-solid fa-star" />
                    <i className="fa-solid fa-star" />
                    <i className="fa-solid fa-star" />
                    <i className="fa-solid fa-star" />
                    </p>
                    <div className="line"></div>
                    <p className="format">{product.format}</p>
                    <p className="price">${product.price}</p>
                    <div className="line"></div>
                    <h2 className="italic">Overview</h2>
                    <div className="description">
                        {product.description}
                    </div>
                    <div className="show-buttons">
                        {/* <button onClick={addToCart} className="cart-button">ADD TO CART</button> */}
                        <AddToCartButton product={product} />
                        <button className="purchase-button" onClick={() => setShowModal(true)}>Instant Purchase</button>
                        {showModal && (
                            <Modal onClose={closeModal} >
                                <CheckoutModal closeModal={closeModal} />
                            </Modal>
                        )}
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default ProductPage;