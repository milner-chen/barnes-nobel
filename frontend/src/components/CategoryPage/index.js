import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as productActions from "../../store/product";
import * as categoryActions from "../../store/category";
import { useParams } from "react-router-dom";
import CategoryPageItem from "../CategoryPageItem";
import './CategoryPage.css'

const CategoryPage = () => {
    const { category } = useParams();
    const dispatch = useDispatch();
    // const productIds = useSelector(state => state.category[category]);
    // const products = useSelector(state => state.products);
    // console.log(productIds);
    // console.log(products);
    const products = useSelector(productActions.getCategoryProducts(category));
    console.log(products);
    // useEffect(() => {
    //     dispatch(categoryActions.fetchCategories());
    //     dispatch(productActions.fetchProducts());
    // }, [])

    // before useEffect
    // if (!productIds) return null;
    if (!products) return null;
    return (
        // <ul>{ productIds.map(id => <li>{products[id].name}</li>) }</ul>
        <div className="cat-page">
            <div className="cat-body">
                {/* <div className="cat-sidebar">stuff</div> */}
                <ul className="cat-content">
                    <h1 className="cat-header">{category}</h1>
                    {products.map(product => <CategoryPageItem product={product} />)}
                </ul>
            </div>
        </div>
    )
}

export default CategoryPage;

    // const {category} = useParams();
    // // make a fetch every single time for every category?
    // console.log(category);
    // const dispatch = useDispatch();
    // // const 
    // // i guess i need to have a product slice of state after all
    // // have another 
    // const products = useSelector(state => state.products[category]);
    
    // useEffect(() => {
    //     dispatch(productActions.fetchProducts(category));
    //     // console.log("products", products);
    // }, []); // fetch once on mount
    
    // // useEffect will run after initial render
    // // must create condition for 
    // if (!products) return null;

    // return (
    //     <ul>
    //         { products.map(product => <li key={product.id}>{product.name}</li>) }
    //     </ul>
    // )