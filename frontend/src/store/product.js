import csrfFetch from "./csrf"

// ACTIONS
const RECEIVE_PRODUCT_DETAIL = 'products/RECEIVE_PRODUCT_DETAIL';
const RECEIVE_PRODUCTS = 'products/RECEIVE_PRODUCTS';

// ACTION CREATORS

// show -> receives a whole product
const receiveProductDetail = (product) => {
    return ({
        type: RECEIVE_PRODUCT_DETAIL,
        product
    })
}

// index of category
const receiveProducts = (category, products) => {
    return ({
        type: RECEIVE_PRODUCTS,
        category,
        products
    })
}


// THUNK ACTION CREATORS

export const fetchProductDetail = (productId) => async (dispatch) => {
    const res = await csrfFetch(`/api/products/${productId}`);
    const data = await res.json();
    // returns a product that we pass into store
    dispatch(receiveProductDetail(data));
    return res;
}

// index by category
export const fetchProducts = (category) => async (dispatch) => {
    const res = await csrfFetch(`/api/products?category=${category}`);
    const data = await res.json();
    console.log("data", data);
    dispatch(receiveProducts(category, data));
    return res;
}

// REDUCER

const productReducer = (state={}, action) => {
    switch (action.type) {
        // case RECEIVE_PRODUCT_DETAIL:
        //     return { ...state, [action.product.category.id]: action.product };
        case RECEIVE_PRODUCTS:
            return { ...state, [action.category]: Object.values(action.products) };
        default:
            return state;
    }
}

export default productReducer;