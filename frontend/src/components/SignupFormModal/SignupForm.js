import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignupForm.css';

const SignupForm = () => {

    const dispatch = useDispatch();
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
    
    const [showModal, setShowModal] = useState(false);

    // useEffect(() => {
    //     console.log(errors);
    //     // if (errors.length !== 0) setShowErrors(true)
    //     // else setShowErrors(false);
    // }, [errors])
    
    const handleSubmit = (e) => {
        e.preventDefault();
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
            setErrors([]);
            if (password !== confirmPassword) setErrors([...errors, "Passwords must match"]);
            if (email !== confirmEmail) setErrors([...errors, "Emails must match"]);
        }
    }

    return (
        <div className="signup-comp">
            <p>Create an Account</p>
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
                    type="text"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Password"
                    />
                    <input
                    type="text"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    placeholder="Confirm Password"
                    />
                <button className="signup-button" type="submit">Create Account</button>
                <p onClick={() => setShowModal(false)} id="cancel-signup">Cancel</p>
            </form>
        </div>
    )
}

export default SignupForm;