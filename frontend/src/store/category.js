import csrfFetch from "./csrf";

// ACTIONS
// const RECEIVE_CATEGORY = 'categories/RECEIVE_CATEGORY';
const RECEIVE_CATEGORIES = 'categories/RECEIVE_CATEGORIES';

// ACTION CREATORS

// returns a list of categories
export const receiveCategories = (categories) => {
    return({
        type: RECEIVE_CATEGORIES,
        categories
    })
}


// THUNK ACTION CREATORS

export const fetchCategories = () => async (dispatch) => {
    const res = await csrfFetch('/api/categories');
    const data = await res.json();
    // await console.log(data);
    dispatch(receiveCategories(data));
    return data;
}


const categoryReducer = (state={}, action) => {
    switch (action.type) {
        case RECEIVE_CATEGORIES:
            return { ...action.categories };
        default:
            return state;
    }
}

export default categoryReducer;