import { useEffect } from 'react';
import * as cartItemActions from '../../store/cartItem';
import { useDispatch, useSelector } from 'react-redux';
import CartItem from '../CartItem';
import './CartPage.css';

const CartPage = () => {
    
    const dispatch = useDispatch();
    const userId = useSelector(state => state.session.user.id); // get the current user
    
    useEffect(() => {
        dispatch(cartItemActions.fetchCartItems(userId));
        // console.log(data);
    }, [userId])

    // const items = useSelector(state => state.cartItems);
    // const products = useSelector(cartItemActions.getCartItemProducts(items));
    // if (items.length) {
        //     console.log(products);
        // }
        
        const items = useSelector(state => Object.values(state?.cartItems));
        // const productIds = useSelector(state => cartItemActions.getCartItemProducts(state));
        let totalPrice = 0;
        useSelector(state => {
            items.forEach(item => totalPrice += ( state.products[item.productId]?.price * item?.quantity ))
        })
        console.log(items);
        console.log("TOTAL PRICE", totalPrice);
        let totalItems = 0;
        items?.forEach(item => totalItems += item.quantity);
        let shipping = (totalPrice * 0.1) > 40 ? 'Free' : (totalPrice * 0.1).toFixed(2);
        shipping > 40 ? shipping = '$' + (40).toFixed(2) : shipping = shipping;
        let total = (shipping instanceof Number) ? (parseInt(totalPrice) + parseInt(shipping)).toFixed(2) : totalPrice.toFixed(2);
        // console.log("PRODUCTS", productIds);
    // if (!items) return null;

    // items.map(item => <p>{item.quantity}</p>)
    // map each item to a component
    // pass as prop
    // select the corresponding product within the component

        // {items.map(item => 
        //     <p>{item.id}</p>
        // )}

    if (!total) return null;

    return (
        // <div>testing QAQ
        //     <p>user id: {userId}</p>
        //     {
        //         products.map(p => <p>{p.name}</p>)
        //     }
            
        // </div>
        <>
            <div className='cart-page'>
                <div className='cart-body'>
                    <div className='cart-content'>
                    <h1 className='cart-title'>My Shopping Cart</h1>
                        <div className='cart-holder'>
                            <h2 className='item-count'>({items.length}) Items from Barnes & Noble</h2>
                            <div className='cart-items'>
                                {items.map(item => <CartItem item={item} />)}
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
                        <button onClick={() => dispatch(cartItemActions.emptyCart())} className='checkout-button'>CHECKOUT</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CartPage;