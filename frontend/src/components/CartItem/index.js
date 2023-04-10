import { useDispatch, useSelector } from "react-redux";
import fishImage from '../../../src/cartoon-dead-fish.png';
import './CartItem.css';
import { useEffect, useState } from "react";
import * as cartItemActions from '../../store/cartItem';
import { NavLink } from "react-router-dom";

const CartItem = ({item}) => {

    const dispatch = useDispatch();
    const product = useSelector(state => state.products[item.productId]);
    console.log("PRODUCT", product);
    const [quantity, setQuantity] = useState(item.quantity);

    useEffect(() => {
        dispatch(cartItemActions.updateCartItem({
            id: item.id,
            productId: item.productId,
            quantity: quantity
        }));
        console.log("QUANTITY EWVNQWOVI", quantity);
    }, [quantity])

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
                        <button onClick={() => dispatch(cartItemActions.deleteCartItem(item.id))}>Remove</button>
                    </div>
                </div>
                <div className="pricing">
                    <p className="item-price">${product.price}</p>
                    <select
                    onChange={e => setQuantity(e.target.value)}
                    value={quantity}
                    >
                        <option selected={quantity === 1} >1</option>
                        <option selected={quantity === 2} >2</option>
                        <option selected={quantity === 3} >3</option>
                        <option selected={quantity === 4} >4</option>
                        <option selected={quantity === 5} >5</option>
                        <option selected={quantity === 6} >6</option>
                        <option selected={quantity === 7} >7</option>
                        <option selected={quantity === 8} >8</option>
                        <option selected={quantity === 9} >9</option>
                        <option selected={quantity === 10} >10</option>
                    </select>
                    <p className="total-item-price">${product.price * item.quantity}</p>
                </div>
            </div>
            
        </div>
    )
}

export default CartItem;