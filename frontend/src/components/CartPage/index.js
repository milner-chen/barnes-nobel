import { useEffect } from 'react';
import * as cartItemActions from '../../store/cartItem';
import { useDispatch, useSelector } from 'react-redux';
import CartItem from '../CartItem';
import './CartPage.css';

const CartPage = () => {
    
    const dispatch = useDispatch();
    const userId = useSelector(state => state.session.user.id); // get the current user
    
    useEffect(() => {
        const data = dispatch(cartItemActions.fetchCartItems(userId));
        console.log(data);
    }, [])

    // const items = useSelector(state => state.cartItems);
    // const products = useSelector(cartItemActions.getCartItemProducts(items));
    // if (items.length) {
        //     console.log(products);
        // }
        
        const items = useSelector(state => Object.values(state?.cartItems));
        // const products = useSelector(state => cartItemActions.getCartItemProducts(state));
        // console.log(products);
        console.log(items);

    // if (!items) return null;

    // items.map(item => <p>{item.quantity}</p>)
    // map each item to a component
    // pass as prop
    // select the corresponding product within the component

        // {items.map(item => 
        //     <p>{item.id}</p>
        // )}

    return (
        // <div>testing QAQ
        //     <p>user id: {userId}</p>
        //     {
        //         products.map(p => <p>{p.name}</p>)
        //     }
            
        // </div>
        <>
            <h2>My Shopping Cart</h2>
            <div className='cart-page'>
                <div className='cart-body'>
                    <div className='cart-content'>
                        <h2 className='item-count'>({items.length}) Items from Barnes & Noble</h2>
                        {items.map(item => <CartItem item={item} />)}
                    </div>
                    <div className='cart-side-bar'>
                        <h1>Order Summary</h1>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CartPage;