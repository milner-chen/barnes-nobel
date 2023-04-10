import './CategoryPageItem.css';
import { useDispatch } from 'react-redux';
import fishImage from '../../../src/cartoon-dead-fish.png';
import { NavLink } from 'react-router-dom';
import PageItemInfo from '../PageItemInfo';
import * as cartItemActions from '../../store/cartItem';

const CategoryPageItem = ({ product }) => {

    const dispatch = useDispatch();
    // WILL PROBABLY HAVE TO EXTRACT ITEM-INFO INTO ANOTHER COMPONENT

    return (
        <div className="cat-page-item">
            <NavLink to={`/${product.id}`}>
            <div className='img-wrapper'>
                <i class="fa-regular fa-heart"></i>
                <img src={fishImage} alt='fish' />
            </div>
            </NavLink>
            <div className='item-left'>
                <PageItemInfo product={product} />
                <button onClick={() => dispatch(/* add or update cart item */)}>ADD TO CART</button>
            </div>
        </div>
    )
}

export default CategoryPageItem;