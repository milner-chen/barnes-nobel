import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as productActions from "../../store/product";
import { useParams } from "react-router-dom";

const ProductCategory = () => {
    const {category} = useParams();
    // make a fetch every single time for every category?
    console.log(category);
    const dispatch = useDispatch();
    // const 
    // i guess i need to have a product slice of state after all
    // have another 
    const products = useSelector(state => state.products[category]);
    
    useEffect(() => {
        dispatch(productActions.fetchProducts(category));
        // console.log("products", products);
    }, []); // fetch once on mount
    
    // useEffect will run after initial render
    // must create condition for 
    if (!products) return null;

    return (
        <ul>
            { products.map(product => <li key={product.id}>{product.name}</li>) }
        </ul>
    )
}

export default ProductCategory;