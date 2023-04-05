import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import './ProductPage.css';

const ProductPage = () => {
    
    const { productId } = useParams();
    const product = useSelector(state => state.products[productId]);
    console.log(product);
    if (!product) return null;
    return (
        <div className="show-page">
        <div className="show-body">
            <div className="show-sidebar">stuff</div>
            <ul className="show-content">
                <h1 className="show-header">{product.name}</h1>
            </ul>
        </div>
    </div>
    )
}

export default ProductPage;