import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as productActions from "../../store/product";
import * as categoryActions from "../../store/category";
import { useHistory, useParams } from "react-router-dom";
import CategoryPageItem from "../CategoryPageItem";
import * as wishlistActions from "../../store/wishlist";
import './CategoryPage.css'

const CategoryPage = () => {
    const { category } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const products = useSelector(productActions.getCategoryProducts(category));
    const isCategory = useSelector(state => state.category[category]);
    const user = useSelector(state => state.session?.user);
    // console.log(products);

    useEffect(() => {
        dispatch(productActions.fetchProducts());
        dispatch(wishlistActions.fetchWishlists(user?.id));
    }, [user?.id])
    
    if (!isCategory) history.push('/404');
    if (!products) return null;

    return (
        <div className="cat-page">
            <div className="cat-body">
                <ul className="cat-content">
                    <h1 className="cat-header">{category}</h1>
                    {products.map(product => <CategoryPageItem key={product?.id} product={product} user={user?.id} />)}
                </ul>
            </div>
        </div>
    )
}

export default CategoryPage;