import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignupForm.css';
import SignupFormModal from ".";
import LoginFormModal from "../LoginFormModal";
import LoginForm from "../LoginFormModal/LoginForm";

const SignupForm = ({closeModal}) => {

    const dispatch = useDispatch();
    const [currModal, setCurrModal] = useState('signup');
    // grabbing user from session slice of state
    // const currentUser = useSelector(state => state.session.user);

    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState([]);
    // const [showErrors, setShowErrors] = useState(false);
    // redirect to home if currentUser is found
    // if (currentUser) return <Redirect to="/" />;
    
    // const [showModal, setShowModal] = useState(false);

    // useEffect(() => {
    //     console.log(errors);
    //     // if (errors.length !== 0) setShowErrors(true)
    //     // else setShowErrors(false);
    // }, [errors])
    
    const handleSubmit = (e) => {
        // console.log('err/ors', errors);
        e.preventDefault();
        
        setErrors([]);
        // let data;
        if (password === confirmPassword && email === confirmEmail) {
            // setErrors([]);
            // const res = 
            dispatch(sessionActions.signup(
                { user: 
                    {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: password
                }
            }))
            .catch(async res => {
            const data = await res.json();
            if (data.errors) setErrors(data.errors);
            })
            
        } else {
            if (password !== confirmPassword) setErrors(["Passwords must match"]);
            if (email !== confirmEmail) setErrors(["Emails must match"]);
        }
    }

    // if (!showModal) return null;

    return (
        <>
            {currModal === "signup" && (<div className="signup-comp">
                <div className="signup-header">
                    <h3>Create an Account</h3>
                    {/* <p onClick={closeModal}>x</p> */}
                </div>
                <div className="signup-login-link">
                    <p onClick={() => setCurrModal('login') }>
                        Fill in the fields below to create a Barnes &#38; Nobel.com account. If you already have an account, please <span id="signup-links">Sign In</span>
                    </p>
                </div>
                <form onSubmit={handleSubmit} className="signup-form">
                    {!!errors.length && <div className="errors">
                        {errors.map(error => <p key={error}>{error}</p> )}
                    </div>}
                        <input
                        type="text"
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                        placeholder="First Name"
                        />
                        <input
                        type="text"
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                        placeholder="Last Name"
                        />
                        <input
                        type="text"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="Email"
                        />
                        <input
                        type="text"
                        value={confirmEmail}
                        onChange={e => setConfirmEmail(e.target.value)}
                        placeholder="Confirm Email"
                        />
                        <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Password"
                        />
                        <input
                        type="password"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        placeholder="Confirm Password"
                        />
                    <button className="signup-button" type="submit" onSubmit={e => e.preventDefault() }>Create Account</button>
                    <p onClick={closeModal} id="signup-links">Cancel</p>
                </form>
            </div>)}
            {currModal === 'login' && (
                <LoginForm />
            )}
        </>
        // when clicking to close: dispatch action to modal to change the current modal to null
        // when clicking to open: dispatch action to modal to change current modal to modal name
    )

    //onClick={() => setShowModal(false)}
}

export default SignupForm;