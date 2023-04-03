import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignupForm.css';

const SignupFormPage = () => {

    const dispatch = useDispatch();
    // grabbing user from session slice of state
    const currentUser = useSelector(state => state.session.user);

    const [lName, setLName] = useState('');
    const [fName, setFName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState([]);

    // redirect to home if currentUser is found
    // if (currentUser) return <Redirect to="/" />;
    
    const handleSubmit = (e) => {
        e.preventDefault();
        // let data;
        if (password === confirmPassword && email === confirmEmail) {
            // setErrors([]);
            // const res = 
            dispatch(sessionActions.signup(
                { user: 
                    {
                    fName: fName,
                    lName: lName,
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
        <form onSubmit={handleSubmit} className="signup-form">
            <div>
                {errors.map(error => <p key={error}>{error}</p> )}
            </div>
            <label>First Name
                <input
                type="text"
                value={fName}
                onChange={e => setFName(e.target.value)}
                />
            </label>
            <label>Last Name
                <input
                type="text"
                value={lName}
                onChange={e => setLName(e.target.value)}
                />
            </label>
            <label>Email
                <input
                type="text"
                value={email}
                onChange={e => setEmail(e.target.value)}
                />
            </label>
            <label>Confirm Email
                <input
                type="text"
                value={confirmEmail}
                onChange={e => setConfirmEmail(e.target.value)}
                />
            </label>
            <label>Password
                <input
                type="text"
                value={password}
                onChange={e => setPassword(e.target.value)}
                />
            </label>
            <label>Confirm Password
                <input
                type="text"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                />
            </label>
            <button type="submit">Submit</button>
        </form>
    )
}

export default SignupFormPage;