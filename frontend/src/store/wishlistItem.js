import csrfFetch from "./csrf";

// ACTIONS
const RECEIVE_WISHLIST_ITEMS = "wishlistItems/RECEIVE_WISHLIST_ITEMS";
const RECEIVE_WISHLIST_ITEM = "wishlistItems/RECEIVE_WISHLIST_ITEM";
const REMOVE_WISHLIST_ITEM = "wishlistItem/REMOVE_WISHLIST_ITEM";

// ACTION CREATORS
export const receiveWishlistItem = (wishlistItem) => ({
    type: RECEIVE_WISHLIST_ITEM,
    wishlistItem
})

export const receiveWishlistItems = (wishlistItems) => ({
    type: RECEIVE_WISHLIST_ITEMS,
    wishlistItems
})

export const removeWishlistItem = (wishlistItemId) => ({
    type: REMOVE_WISHLIST_ITEM,
    wishlistItemId
})

// THUNK ACTION CREATORS
export const fetchWishlistItems = (wishlistId) => async (dispatch) => {
    const res = await csrfFetch(`/api/wishlists/${wishlistId}/wishlist_items`);
    const data = await res.json();
    await dispatch(receiveWishlistItems(data));
    return res;
}

export const fetchWishlistItem = (wishlistItemId) => async (dispatch) => {
    const res = await csrfFetch(`/api/wishlist_items/${wishlistItemId}`);
    const data = await res.json();
    await dispatch(receiveWishlistItem(data));
    return res;
}

export const createWishlistItem = (wishlistItem) => async (dispatch) => {
    const res = await csrfFetch(`/api/wishlist_items/`, {
        method: 'POST',
        body: JSON.stringify(wishlistItem)
    });
    const data = await res.json();
    await dispatch(receiveWishlistItem(data));
    return res;
}

export const updateWishlistItem = (wishlistItemInfo) => async (dispatch) => {
    const res = await csrfFetch(`/api/wishlist_items/${wishlistItemInfo.wishlistItem.id}`, {
        method: "PATCH",
        body: JSON.stringify(wishlistItemInfo)
    });
    const data = await res.json();
    await dispatch(receiveWishlistItem(data));
    return res;
}

export const deleteWishlistItem = (wishlistItemId) => async (dispatch) => {
    const res = await csrfFetch(`/api/wishlist_items/${wishlistItemId}`, {
        method: 'DELETE'
    });
    await dispatch(removeWishlistItem(wishlistItemId));
    return res;
}

const wishlistItemReducer = (state={}, action) => {
    switch (action.type) {
        case RECEIVE_WISHLIST_ITEMS:
            return { ...action.wishlistItems };
        case RECEIVE_WISHLIST_ITEM:
            return { ...state, [action.wishlistItem.id]: action.wishlistItem };
        case REMOVE_WISHLIST_ITEM:
            const newState = { ...state };
            delete newState[action.wishlistItemId];
            return newState;
        default:
            return state;
    }
}

export default wishlistItemReducer;