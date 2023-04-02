// retrieve and store CSRFToken
export const storeCSRFToken = async (res) => {
    // cannot access res like a js object, use get()
    const token = res.headers.get('X-CSRF-Token');
    // check if a token has been passed
    // null will be stringified if stored -> not a falsey value
    if (token) sessionStorage.setItem('X-CSRF-Token', token);
}

// retrieve CSRFToken or create a new one -> moved to session.js
// export const restoreCSRF = async () => {
//     // just a get request to generate a csrftoken
//     const res = await csrfFetch('/api/session');
//     storeCSRFToken(res);
//     return res;
// }

// assumes that there is already a csrf token in sessionStorage
const csrfFetch = async (url, options={}) => {
    options.method ||= 'GET';
    options.headers ||= {};

    // adjusting headers if not a GET request
    if (options.method.toUpperCase() !== 'GET') {
        options.headers['Content-Type'] ||= 'application/json';
        options.headers['X-CSRF-Token'] = sessionStorage.getItem('X-CSRF-Token');
    }
    // call regular fetch
    const res = await fetch(url, options);

    // if there is an error, throw it
    if (res.status >= 400) throw res;

    // return to allow for chaining
    return res;
}

export default csrfFetch;
