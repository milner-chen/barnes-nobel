import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { Redirect } from "react-router-dom";
import * as sessionActions from '../../store/session';
import '../LoginFormModal/LoginForm.css';
import './GuestModal.css';
import CheckoutModal from ".";

const CheckoutLogin = ({closeModal, type}) => {
    // console.log('typeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', type);

    const loginDemo = async () => {
        await dispatch(sessionActions.login({ email: 'demo@user.io', password: 'password' }));
        closeModal();
    }

    const [currModal, setCurrModal] = useState(type);
    // get the current user stored in the session slice of state
    const dispatch = useDispatch();
    // debugger;
    const currentUser = useSelector(state => {
        const testing = state.session.user;
        // console.log(testing); // console log current user
        return testing;
    });

    // const products = useSelector(state => state?.cartItems);
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);
    
    // if user is already logged in, redirect to homepage
    // if (currentUser) return <Redirect to="/" />;

    const handleSubmit = async (e) => {
        e.preventDefault();
        // empty out errors
        setErrors([]);
            // MUST ASYNC/AWAIT dispatches
            await dispatch(sessionActions.login({ email, password }))
            .then(data => {
                if (data.errors) setErrors(data.errors);
                else closeModal();
            })
            // .catch(async res => {
            //     const data = await res.json();
            //     if (data.errors) setErrors(data.errors);
            // });
        // if login was successful, close modal
        // if (res?.ok) closeModal();
    }

    const handleGuest = () => {
        setCurrModal('guest');
        localStorage.setItem('cart', null);
        dispatch(sessionActions.logout());
        // closeModal();
    }

    // disabled={} 

    return (
        <>
            {currModal === "login" && (<div className="login-comp">
                <div className="login-header">
                    <h3>Sign in or Create an Account</h3>
                    {/* <p onClick={closeLoginModal}>x</p> */}
                </div>
                <form className="login-form" onSubmit={handleSubmit}>
                    {!!errors.length && <div className="errors">
                        {errors.map(error => <li key={error}>{error}</li> )}
                    </div>}
                    {/* <label>Email: */}
                        <input type="text" value={email} placeholder="Email Address"
                        onChange={e => setEmail(e.target.value)} />
                    {/* </label> */}

                    {/* <label>Password: */}
                        <input type="password" value={password} placeholder="Password"
                        onChange={e => setPassword(e.target.value)} />
                    {/* </label> */}
                    <button className="login-button" type="submit" >Log In &#38; Continue</button>
                    <button onClick={handleGuest} className="signup-button" type="button" >Checkout as Guest</button>
                    <p id="signup-links" onClick={loginDemo}>Demo Login</p>
                </form>
            </div>)}
            {currModal === 'guest' && (
                <CheckoutModal />
            )}
        </>
    )
}

export default CheckoutLogin;