import csrfFetch from "./csrf";

// ACTION
const RECEIVE_SEARCH = 'search/RECEIVE_SEARCH';

// ACTION CREATOR
export const receiveSearch = (results) => {
    return ({
        type: RECEIVE_SEARCH,
        results
    });
}

// THUNK ACTION CREATOR

export const fetchSearch = (query) => async (dispatch) => {
    // console.log("search query", query);
    const res = await csrfFetch(`/api/products/search?q=${query}`);
    const data = await res.json();
    // await dispatch(receiveSearch(data));
    // console.log("data from the store", data);
    return data;
}

// REDUCER

const searchReducer = (state={}, action) => {
    switch (action.type) {
        case RECEIVE_SEARCH:
            return { ...action.results };
        default:
            return state;
    }
}

export default searchReducer;