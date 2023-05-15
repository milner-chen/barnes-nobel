import './CategoryPageItem.css';
import { useDispatch, useSelector } from 'react-redux';
import fishImage from '../../../src/cartoon-dead-fish.png';
import { NavLink } from 'react-router-dom';
import PageItemInfo from '../PageItemInfo';
import * as cartItemActions from '../../store/cartItem';
import CartItem from '../CartItem';
import AddToCartButton from '../AddToCartButton';
import AddToWishlistForm from '../WishlistForms/AddToWishlistForm';
import { Modal } from '../../context/Modal';
import { useState } from 'react';
import LoginForm from '../LoginFormModal/LoginForm';

const CategoryPageItem = ({ product, user }) => {

    // const dispatch = useDispatch();
    // WILL PROBABLY HAVE TO EXTRACT ITEM-INFO INTO ANOTHER COMPONENT
    // const user = useSelector(state => state.session.user);
    // const cartItems = useSelector(state => Object.values(state.cartItems));
    // console.log("CART ITEMS FROM CATEGORY", cartItems)
    
    // const addToCart = () => {
    //     console.log('add to cart function is being reached');
    //     let inCart = false;
    //     let cartItem;
    //     cartItems.forEach(item => {
    //         if (item.productId === product.id) {
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
    //             productId: product.id,
    //             quantity: cartItem.quantity += 1
    //         }))
    //     } else {
    //         console.log('product was not found in cart so we make a new cartItem');
    //         const data = dispatch(cartItemActions.createCartItem({
    //             cartItem: {
    //                 userId: user.id,
    //                 productId: product.id,
    //                 quantity: 1
    //             }
    //         }));
    //         console.log(data);
    //     }
    // }

    const [showList, setShowList] = useState(false);
    const closeList = () => {
        setShowList(false);
    }

    return (
        <div className="cat-page-item">
            <div className='img-wrapper'>
                <i className="fa-regular fa-heart" onClick={() => {setShowList(true)}} />
                {showList && user && (
                            <Modal onClose={closeList} >
                                {/* <CheckoutModal closeModal={closeList} /> */}
                                <AddToWishlistForm closeModal={closeList} product={product} />
                            </Modal>
                )}
                {showList && !user && (
                            <Modal onClose={closeList} >
                                {/* <CheckoutModal closeModal={closeList} /> */}
                                <LoginForm />
                            </Modal>
                )}
                <NavLink to={`/${product.id}`}>
                    <img src={product.photoUrl} alt={`${product.photoUrl}`} />
                </NavLink>
            </div>
            <div className='item-left'>
                <PageItemInfo product={product} />
                {/* <button onClick={addToCart}>ADD TO CART</button> */}
                <AddToCartButton product={product} />
            </div>
        </div>
    )
}

export default CategoryPageItem;