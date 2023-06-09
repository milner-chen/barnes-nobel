import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { Redirect } from "react-router-dom";
import * as sessionActions from '../../store/session';
import './LoginForm.css';
import SignupFormModal from "../SignupFormModal";
import SignupForm from "../SignupFormModal/SignupForm";

const LoginForm = ({closeModal}) => {

    const [currModal, setCurrModal] = useState('login');
    // get the current user stored in the session slice of state
    const dispatch = useDispatch();
    // debugger;
    const currentUser = useSelector(state => {
        const testing = state.session.user;
        // console.log(testing); // console log current user
        return testing;
    });
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);
    
    // if user is already logged in, redirect to homepage
    // if (currentUser) return <Redirect to="/" />;

    const handleSubmit = (e) => {
        e.preventDefault();
        // empty out errors
        setErrors([]);
            //const res = 
            dispatch(sessionActions.login({ email, password }))
            .then(data => {
                if (data.errors) setErrors(data.errors);
            })
            // .catch(async res => {
            //     const data = await res.json();
            //     if (data.errors) setErrors(data.errors);
            // });
    }

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
                    <button onClick={() => setCurrModal('signup')} className="signup-button" type="button">Create an Account</button>
                </form>
            </div>)}
            {currModal === 'signup' && (
                <SignupForm closeModal={closeModal} />
            )}
        </>
    )
}

export default LoginForm;