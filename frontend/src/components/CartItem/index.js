import { useSelector } from "react-redux";

const CartItem = ({item}) => {

    const product = useSelector(state => state.products[item.productId]);

    if (!product) return null;

    return (
        <div>
            <p>{item.quantity}</p>
            <p>{product.name}</p>
        </div>
    )
}

export default CartItem;