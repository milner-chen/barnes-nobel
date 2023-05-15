// import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import * as productActions from "../../store/product";
// import { useParams } from "react-router-dom";
import CategoryPageItem from "../CategoryPageItem";
// import * as wishlistActions from "../../store/wishlist";
// import * as searchActions from "../../store/search";
import '../CategoryPage/CategoryPage.css'
import { useState } from "react";

const SearchPage = () => {
    // const { category } = useParams();
    // const dispatch = useDispatch();
    // const products = useSelector(productActions.getCategoryProducts(category));
    const search = useSelector(state => Object.values(state.search));
    // console.log("search results", search);
    const user = useSelector(state => state.session?.user);

    // const [results, setResults] = useState(search);

    // useEffect(() => {
    //     dispatch(productActions.fetchProducts());
    //     dispatch(wishlistActions.fetchWishlists(user?.id));
    // }, [user?.id])
    
    if (!search) return null;
    return (
        <div className="cat-page">
            <div className="cat-body">
                <ul className="cat-content">
                    <h1 className="cat-header">{!!search.length ? "Search Results" : "No Results Found"}</h1>
                    {!!search.length && search.map(product => <CategoryPageItem key={product?.id} product={product} user={user?.id} />)}
                </ul>
            </div>
        </div>
    )
}

export default SearchPage;