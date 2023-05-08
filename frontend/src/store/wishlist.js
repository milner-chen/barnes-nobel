import csrfFetch from "./csrf";

// ACTIONS
const RECEIVE_WISHLISTS = "wishlists/RECEIVE_WISHLISTS";
const RECEIVE_WISHLIST = "wishlists/RECEIVE_WISHLIST";
const REMOVE_WISHLIST = "wishlists/REMOVE_WISHLIST";

// ACTION CREATORS
export const receiveWishlist = (wishlist) => ({
    type: RECEIVE_WISHLIST,
    wishlist
})

const receiveWishlists = (wishlists) => ({
    type: RECEIVE_WISHLISTS,
    wishlists
})

const removeWishlist = (wishlistId) => ({
    type: REMOVE_WISHLIST,
    wishlistId
})

// THUNK ACTION CREATORS

export const fetchWishlists = (userId) => async (dispatch) => {
    const res = await csrfFetch(`/api/users/${userId}/wishlists`);
    const data = await res.json();
    dispatch(receiveWishlists(data));
    return res;
}

export const fetchWishlist = (wishlistId) => async (dispatch) => {
    const res = await csrfFetch(`/api/wishlists/${wishlistId}`);
    const data = await res.json();
    dispatch(receiveWishlist(data));
    return res;
}

export const createWishlist = (wishlistInfo) => async (dispatch) => {
    const res = await csrfFetch(`/api/wishlists`, {
        method: 'POST',
        body: JSON.stringify(wishlistInfo)
    });
    const data = await res.json();
    dispatch(receiveWishlist(data));
    return res;
}

export const updateWishlist = (wishlistInfo) => async (dispatch) => {
    const res = await csrfFetch(`/api/wishlists/${wishlistInfo.id}`, {
        method: 'PATCH',
        body: JSON.stringify(wishlistInfo)
    });
    const data = await res.json();
    dispatch(receiveWishlist(data));
    return res;
}

export const deleteWishlist = (wishlistId) => async (dispatch) => {
    const res = await csrfFetch(`/api/wishlists/${wishlistId}`, {
        method: 'DELETE'
    });
    dispatch(removeWishlist(wishlistId));
    return res;
}

// REDUCER

const wishlistReducer = (state={}, action) => {
    switch (action.type) {
        case RECEIVE_WISHLISTS:
            return { ...action.wishlists};
        case RECEIVE_WISHLIST:
            return {...state, [action.wishlist.id]: action.wishlist};
        case REMOVE_WISHLIST:
            const newState = {...state};
            delete newState[action.wishlistId];
            return newState;
        default:
            return state;
    }
}

export default wishlistReducer;