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
    const products = useSelector(productActions.getCategoryProducts(category));
    // console.log(products);
    
    if (!products) return null;
    return (
        <div className="cat-page">
            <div className="cat-body">
                <ul className="cat-content">
                    <h1 className="cat-header">{category}</h1>
                    {products.map(product => <CategoryPageItem key={product.id} product={product} />)}
                </ul>
            </div>
        </div>
    )
}

export default CategoryPage;