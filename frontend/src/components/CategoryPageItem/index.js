import './CategoryPageItem.css';
import fishImage from '../../../src/cartoon-dead-fish.png';

const CategoryPageItem = ({ product }) => {
    return (
        <div className="cat-page-item">
            <img src={fishImage} />
            <p>{product.name}</p>
            <p>{product.author}</p>
            <p>{product.price}</p>
        </div>
    )
}

export default CategoryPageItem;