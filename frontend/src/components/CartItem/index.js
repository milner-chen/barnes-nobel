import { useDispatch, useSelector } from "react-redux";
import fishImage from '../../../src/cartoon-dead-fish.png';
import './CartItem.css';
import { useEffect, useState } from "react";
import * as cartItemActions from '../../store/cartItem';
import { NavLink } from "react-router-dom";

const CartItem = ({item, user}) => {
    // console.log("what item looks like for the local cart", item);
    const dispatch = useDispatch();
    const product = useSelector(state => state.products[item.productId]);
    // console.log("PRODUCT", product);
    const [quantity, setQuantity] = useState(item.quantity);
    // const cart = JSON.parse(localStorage.getItem('cart'));
    // const 

    // useEffect(() => {
    //     // console.log("is user logged in?", user);
    //     console.log("item", item);
    //     if (user) {
    //         console.log("heloooooooo");
    //         console.log(quantity);
    //         dispatch(cartItemActions.updateCartItem({
    //             id: item?.id,
    //             productId: item.productId,
    //             quantity: quantity
    //         }));
    //     } 
    //     // else {
    //     //     const updatedItem = {
    //     //         productId: item.productId,
    //     //         quantity: parseInt(quantity)
    //     //     }
    //     //     const newCart = { ...cart, [item.productId]: updatedItem };
    //     //     localStorage.setItem('cart', JSON.stringify(newCart));
    //     // }
    //     // console.log("QUANTITY EWVNQWOVI", quantity);
    // }, [quantity]);

    // useEffect(() => {
    //     if (!user) {
    //         const updatedItem = {
    //             id: item.productId,
    //             productId: item.productId,
    //             quantity: parseInt(quantity)
    //         }
    //         const newCart = { ...cart, [item.productId]: updatedItem };
    //         localStorage.setItem('cart', JSON.stringify(newCart));
    //         // dispatch(cartItemActions.receiveCartItem(updatedItem));
    //     }
    // }, [cart]);

    const handleRemove = () => {
        if (user) dispatch(cartItemActions.deleteCartItem(item.id));
        else {
            // const newCart = { ...cart };
            // delete newCart[item.productId];
            // localStorage.setItem('cart', JSON.stringify(newCart));
            dispatch(cartItemActions.removeFromLocalStorage(item.id));
        }
    }

    const updateWithValue = (currentItem) => {
        if (user) {
            dispatch(cartItemActions.updateCartItem(currentItem));
        } else {
            dispatch(cartItemActions.addToLocalStorage(currentItem));
        }
    }

    const handleChange = (e) => {
        // debugger;
        let currentQuantity = e.target.value;
        // if (currentQuantity > 10) currentQuantity = 10;
        // if (currentQuantity <= 0) currentQuantity = 1;
        if (Number(currentQuantity) || currentQuantity.length === 0) {
            // if (!Number.isInteger(currentQuantity)) currentQuantity = Math.floor(currentQuantity);
            setQuantity(currentQuantity);
            if (currentQuantity.length > 0) {
                const currentItem = {
                    ...item,
                    quantity: parseInt(currentQuantity)
                }
                updateWithValue(currentItem);
                // if (user) {
                //     console.log("heloooooooo");
                //     console.log(quantity);
                //     dispatch(cartItemActions.updateCartItem(currentItem));
                // } else {

                //     // const updatedItem = {
                //     //     id: item.productId,
                //     //     productId: item.productId,
                //     //     quantity: parseInt(quantity)
                //     // }
                //     // const newCart = { ...cart, [item.productId]: updatedItem };
                //     // localStorage.setItem('cart', JSON.stringify(newCart));
                //     dispatch(cartItemActions.addToLocalStorage(currentItem));
                // }
            }
        }
    };

    const handleBlur = e => {
        let val = e.target.value;
        if (val.length === 0 || !Number.isInteger(val)) {
            val = val.length === 0 ? 1 : Math.floor(val);
            if (val === 0) val = 1;
            setQuantity(val);
            const currentItem = {
                ...item,
                quantity: val
            }
            updateWithValue(currentItem);
        }
    }

    if (!product) return null;

    return (
        <div className="cart-item">
            <div className="header">
                <NavLink to={`/${product.id}`}>
                    <h2>{product.name}</h2>
                    <p>by {product.seller}</p>
                </NavLink>
            </div>
            <div className="cart-item-content">
                <div className="img-wrapper">
                    <NavLink to={`/${product.id}`}>
                        <img src={product.photoUrl} />
                        <p>{product.format}</p>
                    </NavLink>
                    <div className="cart-remove-button">
                        <button onClick={handleRemove}>Remove</button>
                    </div>
                </div>
                <div className="pricing">
                    <p className="item-price">${product.price}</p>
                    {/* <select
                    onChange={handleChange}
                    value={quantity}
                    >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select> */}
                    <input
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="number"
                        // min={1}
                        value={quantity}
                    ></input>
                    <p className="total-item-price">${(product.price * item.quantity).toFixed(2)}</p>
                </div>
            </div>

        </div>
    )
}

export default CartItem;