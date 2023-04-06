import './CategoryPageItem.css';
import fishImage from '../../../src/cartoon-dead-fish.png';
import { NavLink } from 'react-router-dom';
import PageItemInfo from '../PageItemInfo';

const CategoryPageItem = ({ product }) => {

    // WILL PROBABLY HAVE TO EXTRACT ITEM-INFO INTO ANOTHER COMPONENT

    return (
        <div className="cat-page-item">
            <NavLink to={`/${product.id}`}>
                <img src={fishImage} alt='fish' />
            </NavLink>
            <div className='item-left'>
                <PageItemInfo product={product} />
                <button>ADD TO CART</button>
            </div>
        </div>
    )
}

export default CategoryPageItem;