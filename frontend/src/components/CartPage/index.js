import { useEffect, useState } from 'react';
import * as cartItemActions from '../../store/cartItem';
import { useDispatch, useSelector } from 'react-redux';
import CartItem from '../CartItem';
import { Modal } from "../../context/Modal";
import './CartPage.css';
import LoginForm from "../LoginFormModal/LoginForm";
import LoginFormModal from '../LoginFormModal';
import CheckoutLogin from '../CheckoutModal/checkoutLogin';

const CartPage = () => {
    // let type = 'login';
    const [type, setType] = useState('login');
    const [showModal, setShowModal] = useState(false);
    const closeModal = () => {
        setShowModal(false);
    }
    let buttonText = "Cart Empty";
    let isEmpty = true;
    let buttonColor = 'gray';
    let cursorType = 'initial';
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user); // get the current user
    const count = useSelector(cartItemActions.getItemsCount);
    // let localCart = Object.values(JSON.parse(localStorage.getItem('cart')));
    // const items = useSelector(state => state.cartItems);
    // const products = useSelector(cartItemActions.getCartItemProducts(items));
    // if (items.length) {
        //     console.log(products);
        // }
    // const [localCart, setLocalCart] = useState(Object.values(JSON.parse(localStorage.getItem('cart'))));
        
        const items = useSelector(state => Object.values(state.cartItems));
        // let items ;
        // user ? items = realCart : items = localCart;
        // const productIds = useSelector(state => cartItemActions.getCartItemProducts(state));
        let totalPrice = 0;
        useSelector(state => {
            items.forEach(item => totalPrice += ( state.products[item.productId]?.price * item?.quantity ))
        })
        // console.log(items);
        // console.log("TOTAL PRICE", totalPrice);
        let totalItems = 0;
        items?.forEach(item => totalItems += item.quantity);
        let shipping = (totalPrice * 0.1) > 40 ? 'Free' : '$' + (totalPrice * 0.1).toFixed(2);
        shipping > 40 ? shipping = '$' + (40).toFixed(2) : shipping = shipping;
        
        let total = (shipping instanceof Number) ? (parseInt(totalPrice) + parseInt(shipping)).toFixed(2) : totalPrice.toFixed(2);

            
    useEffect(() => {
        // console.log(user);
        if (user) {
            // console.log('asdfghjkl why is it not fetching');
            dispatch(cartItemActions.fetchCartItems(user.id));
        } else {
            // setLocalCart(Object.values(JSON.parse(localStorage.getItem('cart'))));
        }
        // console.log(data);
    }, [user])

    // console.log('total', total);
    if (total > 0) {
        buttonText = "CHECKOUT";
        isEmpty = false;
        buttonColor = 'teal';
        cursorType = 'pointer';
    }

    const handleCheckout = () => {
        if (user) {
            setType('guest');
            setShowModal(true);
            dispatch(cartItemActions.emptyCart());
        }
        else {// i need to open my login modal
            setShowModal(true);
        }
        // console.log("drcfvgbnmlk,;cctfvgbnj,klfcfgvbnmkl type", type);
    }

    if (!total) return null;

    return (
        <>
            <div className='cart-page'>
                <div className='cart-body'>
                    <div className='cart-content'>
                    <h1 className='cart-title'>My Shopping Cart</h1>
                        <div className='cart-holder'>
                            <h2 className='item-count'>({items.length}) Items from Barnes &#38; Nobel</h2>
                            <div className='cart-items'>
                                {items.map(item => <CartItem key={item.id} item={item} user={user} />)}
                            </div>
                        </div>
                    </div>
                    <div className='cart-side-bar'>
                        <h1>Order Summary</h1>
                        <div className='checkout-side-bar'>
                            <p>Subtotal ({totalItems} items)</p>
                            <p>${totalPrice.toFixed(2)}</p>
                        </div>
                        <div className='checkout-side-bar'>
                            <p>Estimated Shipping</p>
                            <p>{shipping}</p>
                        </div>
                        <div className='checkout-side-bar'>
                            <p>Estimated Tax</p>
                            <p>$0.00</p>
                        </div>
                        <div className='line' />
                        <div className='bold checkout-side-bar'>
                            <h2>Order Total:</h2>
                            <h2>${total}</h2>
                        </div>
                        <button onClick={handleCheckout} className='checkout-button' disabled={isEmpty} style={{ backgroundColor: buttonColor, cursor: cursorType }} >{buttonText}</button>
                        {showModal && (
                            <Modal onClose={closeModal } >
                                {/* {console.log('checking type before it gets passed to the child', type)} */}
                                <CheckoutLogin closeModal={closeModal} type={type} />
                            </Modal>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default CartPage;