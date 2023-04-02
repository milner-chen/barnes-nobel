import csrfFetch from "./csrf";

// ACTIONS
// nest under the name of the slice
const SET_USER = 'session/SET_USER';
const REMOVE_USER = 'session/REMOVE_USER';

// ACTION CREATORS

const setUser = (user) => {
    return ({
        type: SET_USER,
        user
    })
}

const removeUser = () => {
    return ({
        type: REMOVE_USER
    })
}

// THUNK ACTION CREATORS

export const login = (user) => async (dispatch) => {
    // request to backend
    const res = await csrfFetch('/api/session', {
        // headers taken care of in csrfFetch
        method: 'POST',
        body: JSON.stringify(user)
    });
    const data = await res.json();
    // update frontend
    dispatch(setUser(data));
    // for error handling?
    return res;
}

// initial state
const initialState = { user: null };

// SESSION REDUCER

const sessionReducer = (state=initialState, action) => {
    Object.freeze(state);
    switch(action.type) {
        case SET_USER:
            // set key of user to user from backend
            return { ...state, user: action.user };
        case REMOVE_USER:
            return { ...state, user: null };
        default:
            return state;
    }
};

export default sessionReducer;