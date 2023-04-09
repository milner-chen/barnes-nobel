import { useEffect } from 'react';
import * as cartItemActions from '../../store/cartItem';
import { useDispatch, useSelector } from 'react-redux';

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
    //     console.log(items);
    //     console.log(products);
    // }

    const items = useSelector(state => Object.values(state?.cartItems));
    const products = useSelector(state => cartItemActions.getCartItemProducts(state));
    console.log(products);

    if (!products) return null;

    return (
        <div>testing QAQ
            {/* {items.map(item => 
                <p>{item.id}</p>
            )} */}
            <p>user id: {userId}</p>
            {
                products.map(p => <p>{p.name}</p>)
            }{
                // items.map(item => <p>{item.quantity}</p>)
                // map each item to a component
                // pass as prop
                // select the corresponding product within the component
            }
        </div>
    )
}

export default CartPage;