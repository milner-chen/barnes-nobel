import csrfFetch from './csrf';
// import 

// ACTIONS
const RECEIVE_CART_ITEM = 'cart_items/RECEIVE_CART_ITEM';
const RECEIVE_CART_ITEMS = 'car_items/RECEIVE_CART_ITEMS';
const REMOVE_CART_ITEM = 'cart_items/REMOVE_CART_ITEM';
const CHECKOUT_CART = 'cart_items/CHECKOUT_CART';

// ACTION CREATORS
const receiveCartItem = (cartItem) => {
    return ({
        type: RECEIVE_CART_ITEM,
        cartItem
        })
}

export const receiveCartItems = (cartItems) => {
    return ({
        type: RECEIVE_CART_ITEMS,
        cartItems
    })
}

const removeCartItem = (cartItemId) => {
    return ({
        type: REMOVE_CART_ITEM,
        cartItemId
    })
}

const checkoutCart = () => {
    return ({
        type: CHECKOUT_CART
    })
}

// custom selectors

export const getCartItemProducts = (state) => {
    // const productIds = Object.values(cartItems).map(item => item.productId);
    // console.log(productIds);
    // console.log('poducts slice of state');
    // const products = productIds.map(id => state.products[id]);
    // console.log(products);
    // return products;
    const productIds = state?.cartItems ? Object.values(state.cartItems).map(item => item.productId) : [];
    const products = productIds.length ? productIds.map(id => state.products[id]) : null;
    console.log(productIds);
    // const test = Object.values(state.cartItems).map(item => item.productId);
    // console.log(test);
    return productIds;
}


// THUNK ACTION CREATORS
export const fetchCartItems = (userId) => async (dispatch) => {
    const res = await csrfFetch(`/api/users/${userId}/cart_items`);
    const data = await res.json();
    dispatch(receiveCartItems(data));
    return data;
}

export const fetchCartItem = (cartItemId) => async (dispatch) => {
    const res = await csrfFetch(`/api/cart_items/${cartItemId}`);
    const data = await res.json();
    dispatch(receiveCartItem(data));
    return res;
}

export const createCartItem = (cartItem) => async (dispatch) => {
    // might change the route for this later...
    const res = await csrfFetch(`/api/users/${cartItem.userId}/cart_items`, {
        method: 'POST',
        body: JSON.stringify(cartItem)
    });
    const data = await res.json();
    await console.log("data", data);
    await console.log("data.cartItem", data.cartItem);
    dispatch(receiveCartItem(data));
    return data;
}

export const updateCartItem = (cartItem) => async (dispatch) => {
    const res = await csrfFetch(`/api/cart_items/${cartItem.id}`, {
        method: 'PATCH',
        body: JSON.stringify(cartItem)
    });
    const data = await res.json();
    dispatch(receiveCartItem(data));
}

export const deleteCartItem = (cartItemId) => async (dispatch) => {
    const res = await csrfFetch(`/api/cart_items/${cartItemId}`, {
        method: 'DELETE'
    });
    dispatch(removeCartItem(cartItemId));
    return res;
}

export const emptyCart  = () => async (dispatch) => {
    const res = await csrfFetch("/api/checkout", {
        method: 'DELETE'
    });
    dispatch(checkoutCart());
}


// adding to cart logic

const addToCart = () => {
    
}


// REDUCER

const cartItemReducer = (state={}, action) => {
    switch (action.type) {
        case RECEIVE_CART_ITEM:
            return { ...state, [action.cartItem.id]: action.cartItem };
        case RECEIVE_CART_ITEMS:
            return { ...action.cartItems };
        case REMOVE_CART_ITEM:
            const newState = { ...state };
            delete newState[action.cartItemId];
            return newState;
        case CHECKOUT_CART:
            return {};
        default:
            return state;
    }
}

export default cartItemReducer;