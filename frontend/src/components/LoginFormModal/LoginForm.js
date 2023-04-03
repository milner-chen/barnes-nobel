import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { Redirect } from "react-router-dom";
import * as sessionActions from '../../store/session';
import './LoginForm.css';
import SignupFormModal from "../SignupFormModal";

const LoginForm = () => {

    // get the current user stored in the session slice of state
    const dispatch = useDispatch();
    // debugger;
    const currentUser = useSelector(state => {
        const testing = state.session.user;
        console.log(testing); // console log current user
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
            .catch(async res => {
                const data = await res.json();
                if (data.errors) setErrors(data.errors);
            });
    }

    return (
        <>
            <h1></h1>
            <form onSubmit={handleSubmit} className="login-form">
                <ul>
                    {errors.map(error => <li key={error}>{error}</li> )}
                </ul>
                <label>Email:
                    <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
                </label>

                <label>Password:
                    <input type="text" value={password} onChange={e => setPassword(e.target.value)} />
                </label>
                <button type="submit" >Log In &#38; Continue</button>
                <SignupFormModal />
            </form>
        </>
    )
}

export default LoginForm;