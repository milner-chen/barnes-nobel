import { useDispatch, useSelector } from "react-redux";
import * as cartItemActions from '../../store/cartItem';


const AddToCartButton = ({ product }) => {
    const dispatch = useDispatch();
    
    const user = useSelector(state => state.session.user);
    // state is preloaded with localstorage cart
    let cartItems = useSelector(state => state.cartItems);

    // to determine when to allow button to work
    let doneAdding = false;
    // clicking on button will set doneAdding to false
    // after the adding logic -> set doneAdding to true

    const addItems = () => {
        if (user) {
            return addToCart();
        } else {
            return addtoLocal();
        }
    }

    // adds to cart in localstorage
    const addtoLocal = () => {
        // console.log('this is the adding to local function being hit');
        // cartItems = JSON.parse(localStorage.getItem("cart"));
        // console.log("local cart", cartItems);
        // adding logic

        let currentItem = cartItems[product.id];
        
        if (currentItem) {
            // increment quantity
            currentItem.quantity++;
        } else {
            // create new
            currentItem = {
                id: product.id,
                productId: product.id,
                quantity: 1
            };
        }

        dispatch(cartItemActions.addToLocalStorage(currentItem));

        // let currentItem = {
        //     productId: product.id,
        //     quantity: 1
        // }

        // console.log("product id", typeof product.id); // number

        // let newCart;
        // if (!cartItems) {
        //     console.log('cart does not exist');
        //     newCart = { [product.id]: currentItem };
        // } else if (!cartItems[product.id]) {
        //     console.log('there is no existing');
        //     newCart = { ...cartItems, [product.id]: currentItem };
        // } else {
        //     console.log('there is an existing key for this product');
        //     console.log('old product', cartItems[product.id]);
        //     // const oldProduct = cartItems[product.id];
        //     // console.log("product", product);
        //     currentItem = {
        //         productId: product.id,
        //         quantity: cartItems[product.id].quantity + 1
        //     }
        //     newCart = { ...cartItems, [product.id]: currentItem };
        //     // newCart = { ...cartItems, [product.id]: currentItem };
        // }
        
        // // else newCart = { ...cartItems, [product.id]: currentItem };
        // localStorage.setItem("cart", JSON.stringify(newCart));
        // console.log("local cart after", cartItems);
    }

    // adds to cart in slice of state
    const addToCart = () => {
        console.log('add to cart function is being reached');
        // let inCart = false;
        // let cartItem;
        // cartItems.forEach(item => {
        //     if (item.productId === product.id) {
        //         console.log('product already exists in cart')
        //         inCart = true;
        //         cartItem = item;
        //         return;
        //     }
        // } );
        // if (inCart) {
        //     console.log('updating item that was found');
        //     dispatch(cartItemActions.updateCartItem({
        //         id: cartItem.id,
        //         productId: product.id,
        //         quantity: cartItem.quantity += 1
        //     }))
        // } else {
            // console.log('product was not found in cart so we make a new cartItem');
            const data = dispatch(cartItemActions.createCartItem({
                // cartItem: {
                    userId: user.id,
                    productId: product.id,
                    quantity: 1
                // }
            }));
            // console.log(data);
        // }
        doneAdding = true;
    }

    const handleClick = () => {
        doneAdding = false;
        return addItems();
    }
    // console.log(doneAdding);
    return (
        <button disabled={doneAdding} className="cart-button" onClick={handleClick} >ADD TO CART</button>
    )
}

export default AddToCartButton;