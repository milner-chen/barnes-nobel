import { useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import './ProductPage.css';
import fishImage from '../../../src/cartoon-dead-fish.png';

const ProductPage = () => {
    
    const { productId } = useParams();
    const product = useSelector(state => state.products[productId]);
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
                        <button className="cart-button">ADD TO CART</button>
                        <button className="purchase-button">Instant Purchase</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default ProductPage;