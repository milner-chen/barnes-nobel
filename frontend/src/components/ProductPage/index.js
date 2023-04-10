import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import * as cartItemActions from '../../store/cartItem';
import './ProductPage.css';
import fishImage from '../../../src/cartoon-dead-fish.png';

const ProductPage = () => {
    
    const dispatch = useDispatch();
    const { productId } = useParams();
    const userId = useSelector(state => state.session.user.id);
    const cartItems = useSelector(state => Object.values(state.cartItems));
    const product = useSelector(state => state.products[productId]);

    const addToCart = () => {
        console.log('add to cart function is being reached');
        let inCart = false;
        let cartItem;
        cartItems.forEach(item => {
            if (parseInt(item.productId) === productId) {
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
                productId,
                quantity: cartItem.quantity += 1
            }))
        } else {
            console.log('product was not found in cart so we make a new cartItem');
            const data = dispatch(cartItemActions.createCartItem({
                cartItem: {
                    userId,
                productId,
                quantity: 1
                }
            }));
            console.log(data);
        }
    }

    console.log(product);
    if (!product) return null;
    return (
        <div className="show-page">
        <div className="show-body">
            <div className="show-content">
                <div className="img-wrapper">
                    <img src={fishImage} />
                    <div className="wishlist-button">
                        <i class="fa-regular fa-heart"></i>
                        <NavLink to={"/"}><p>Add to Wishlist</p></NavLink>
                    </div>
                </div>
                <div className="product-info">
                    <h2>{product.name}</h2>
                    <p>by <span>{product.seller}</span></p>
                    <p>
                    <i className="fa-solid fa-star" />
                    <i className="fa-solid fa-star" />
                    <i className="fa-solid fa-star" />
                    <i className="fa-solid fa-star" />
                    </p>
                    <div className="line"></div>
                    <p className="format">Placeholder</p>
                    <p className="price">${product.price}</p>
                    <div className="line"></div>
                    <h2 className="italic">Overview</h2>
                    <div className="description">
                        {product.description}
                    </div>
                    <div className="show-buttons">
                        <button onClick={addToCart} className="cart-button">ADD TO CART</button>
                        <button className="purchase-button">Instant Purchase</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default ProductPage;