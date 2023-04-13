import csrfFetch from "./csrf"

// ACTIONS
const RECEIVE_PRODUCT_DETAIL = 'products/RECEIVE_PRODUCT_DETAIL';
const RECEIVE_PRODUCTS = 'products/RECEIVE_PRODUCTS';
const RECEIVE_CATEGORY_PRODUCTS = 'products/RECEIVE_CATEGORY_PRODUCTS';

// ACTION CREATORS

// show -> receives a whole product
// const receiveProductDetail = (product) => {
//     return ({
//         type: RECEIVE_PRODUCT_DETAIL,
//         product
//     })
// }

// index of category
const receiveProducts = (products) => {
    return ({
        type: RECEIVE_PRODUCTS,
        products
    })
}

// const receiveCategoryProducts = (category) => {
//     return ({
//         type: RECEIVE_CATEGORY_PRODUCTS,
//         category
//     })
// }

export const getCategoryProducts = (category) => (state) => {
    const productIds = state?.category[category] ? state.category[category] : [];
    // console.log("ids", productIds);
    // will throw error if you try to map over null/undef
    const products = state?.products[1] ? productIds.map(id => state.products[id])
    : null;
    // console.log("products", products);
    // if (!products) return false;
    return products;

    // can just do category.products in back end...
}


// THUNK ACTION CREATORS

// export const fetchProductDetail = (productId) => async (dispatch) => {
//     const res = await csrfFetch(`/api/products/${productId}`);
//     const data = await res.json();
//     // returns a product that we pass into store
//     dispatch(receiveProductDetail(data));
//     return res;
// }

// index by category
// export const fetchProducts = (category) => async (dispatch) => {
//     const res = await csrfFetch(`/api/products?category=${category}`);
//     const data = await res.json();
//     console.log("data", data);
//     dispatch(receiveProducts(category, data));
//     return res;
// }

export const fetchProducts = () => async (dispatch) => {
    const res = await csrfFetch('/api/products');
    const data = await res.json();
    dispatch(receiveProducts(data));
    return res;
}

// REDUCER

const productReducer = (state={}, action) => {
    switch (action.type) {
        // case RECEIVE_PRODUCT_DETAIL:
        //     return { ...state, [action.product.id]: action.product };
        case RECEIVE_PRODUCTS:
            return { ...action.products };
        // case RECEIVE_CATEGORY_PRODUCTS:
        //     const productIds = state[action.category]
        //     console.log(productIds);
        //     const products = productIds.map(id => state.products[id])
        //     console.log(products);
        //     return {  }
        default:
            return state;
    }
}

export default productReducer;