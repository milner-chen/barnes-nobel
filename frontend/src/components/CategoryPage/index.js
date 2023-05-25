import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as productActions from "../../store/product";
import * as categoryActions from "../../store/category";
import { useHistory, useParams } from "react-router-dom";
import CategoryPageItem from "../CategoryPageItem";
import * as wishlistActions from "../../store/wishlist";
import './CategoryPage.css'
import NotFoundPage from "../NotFoundPage";

const CategoryPage = () => {
    const { category } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const products = useSelector(productActions.getCategoryProducts(category));
    const isCategory = useSelector(state => state.category[category]);
    const user = useSelector(state => state.session?.user);
    // console.log(products);

    // const fetchFunc = async () => {
    //     await dispatch(productActions.fetchProducts());
    //     await dispatch(wishlistActions.fetchWishlists(user?.id));
    // }

    useEffect(() => {
        dispatch(productActions.fetchProducts());
        dispatch(wishlistActions.fetchWishlists(user?.id));
        // fetchFunc();
    }, [user?.id])
    
    // if (!isCategory && products?.length) {
    //     // console.log(isCategory);
    //     // console.log(products);
    //     history.push('/404')
    // };

    if (!products) return null;

    return (
        <>
        {isCategory ? (<div className="cat-page">
            <div className="cat-body">
                <ul className="cat-content">
                    <h1 className="cat-header">{category}</h1>
                    {products.map(product => <CategoryPageItem key={product?.id} product={product} user={user?.id} />)}
                </ul>
            </div>
        </div>) : (
            <NotFoundPage />
        )}
        </>
    )
}

export default CategoryPage;