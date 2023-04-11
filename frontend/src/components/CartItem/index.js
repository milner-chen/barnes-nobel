import { useDispatch, useSelector } from "react-redux";
import fishImage from '../../../src/cartoon-dead-fish.png';
import './CartItem.css';
import { useEffect, useState } from "react";
import * as cartItemActions from '../../store/cartItem';
import { NavLink } from "react-router-dom";

const CartItem = ({item, user}) => {

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
        if (user) dispatch(cartItemActions.deleteCartItem(item.id))
        else {
            // const newCart = { ...cart };
            // delete newCart[item.productId];
            // localStorage.setItem('cart', JSON.stringify(newCart));
        }
    }

    const handleChange = (e) => {
        // debugger;
        const currentQuantity = e.target.value;
        setQuantity(currentQuantity);
        const currentItem = {
            ...item,
            quantity: parseInt(currentQuantity)
        }
        if (user) {
            console.log("heloooooooo");
            console.log(quantity);
            dispatch(cartItemActions.updateCartItem(currentItem));
        } else {

            // const updatedItem = {
            //     id: item.productId,
            //     productId: item.productId,
            //     quantity: parseInt(quantity)
            // }
            // const newCart = { ...cart, [item.productId]: updatedItem };
            // localStorage.setItem('cart', JSON.stringify(newCart));
            dispatch(cartItemActions.addToLocalStorage(currentItem));
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
                        <img src={fishImage} />
                        <p>{product.format}</p>
                    </NavLink>
                    <div className="cart-remove-button">
                        <button onClick={handleRemove}>Remove</button>
                    </div>
                </div>
                <div className="pricing">
                    <p className="item-price">${product.price}</p>
                    <select
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
                    </select>
                    <p className="total-item-price">${(product.price * item.quantity).toFixed(2)}</p>
                </div>
            </div>

        </div>
    )
}

export default CartItem;