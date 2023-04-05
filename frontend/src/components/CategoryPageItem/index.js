import './CategoryPageItem.css';
import fishImage from '../../../src/cartoon-dead-fish.png';
import { NavLink } from 'react-router-dom';

const CategoryPageItem = ({ product }) => {

    // WILL PROBABLY HAVE TO EXTRACT ITEM-INFO INTO ANOTHER COMPONENT

    return (
        <div className="cat-page-item">
                <NavLink to={`/${product.id}`}>
                    <img src={fishImage} alt='fish' />
                </NavLink>
                <div className='item-info'>
                <NavLink to={`/${product.id}`}>
                    <h2 className='title'>{product.name}</h2>
                </NavLink>
                    <p>by {product.seller}</p>
                        <p className='price'>${product.price}</p>
                </div>
            </div>
    )
}

export default CategoryPageItem;