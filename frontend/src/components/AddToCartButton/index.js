import { useDispatch, useSelector } from "react-redux";
import * as cartItemActions from '../../store/cartItem';


const AddToCartButton = ({ product }) => {
    const dispatch = useDispatch();
    
    const user = useSelector(state => state.session.user);
    const cartItems = useSelector(state => Object.values(state.cartItems));

    const addItems = () => {
        if (user) {
            return addToCart();
        } else {
            return addtoLocal();
        }
    }

    const addtoLocal = () => {
        console.log('this is the adding to local function being hit');
    }

    const addToCart = () => {
        console.log('add to cart function is being reached');
        let inCart = false;
        let cartItem;
        cartItems.forEach(item => {
            if (item.productId === product.id) {
                console.log('product already exists in cart')
                inCart = true;
                cartItem = item;
                return;
            }
        } );
        if (inCart) {
            console.log('updating item that was found');
            dispatch(cartItemActions.updateCartItem({
                id: cartItem.id,
                productId: product.id,
                quantity: cartItem.quantity += 1
            }))
        } else {
            console.log('product was not found in cart so we make a new cartItem');
            const data = dispatch(cartItemActions.createCartItem({
                cartItem: {
                    userId: user.id,
                    productId: product.id,
                    quantity: 1
                }
            }));
            console.log(data);
        }
    }

    return (
        <button className="cart-button" onClick={addItems} >ADD TO CART</button>
    )
}

export default AddToCartButton;