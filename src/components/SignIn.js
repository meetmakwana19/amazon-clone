import React, { useContext, useState } from 'react';
import '../css/SignIn.css';
import { Link, useNavigate } from 'react-router-dom'
import { useStateValue } from '../context/cart-count/CartStateContext';
import themeContext from '../context/theme/ThemeContext';

export default function SignIn(props) {

    const { darkMode } = useContext(themeContext);
    const [credentials, setCredentials] = useState({ email: "", password: "" })
    let navigate = useNavigate()
    const [{ user }, dispatch] = useStateValue();
    console.log("(Don't mind this log) User is", user);

    const onChange = (e) => {
        // using spread operator with note means only those things will be changed in the note object which are defined after the spread operator.
        setCredentials({ ...credentials, [e.target.id]: e.target.value })
    }

    const onSignIn = async (e) => {
        // to prevent page reloading
        e.preventDefault()
        props.setProgress(80);
        // API Call
        const response = await fetch(`https://amizon-api.herokuapp.com/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            // sending email, password in the body
            body: JSON.stringify({ email: credentials.email, password: credentials.password }) // body data type must match "Content-Type" header
        });
        const resp = await response.json();
        if (resp.success) {
            localStorage.setItem("token", resp.authToken)

            // redirect by saving the auth-token
            // will navigate to the "/" endpoint which is the Home.js
            navigate("/")

            // props.showAlert_prop("Logged in successfully", "success")
            alert("Logged in successfully")

            const getUser = async () => {

                // console.log("Getting user details");
                // API Call
                const response = await fetch(`https://amizon-api.herokuapp.com/auth/getUser`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': localStorage.getItem("token")
                    }
                });
                const resp = await response.json();
                // console.log("User details:", resp);
                const userName = resp.name;
                // console.log("userName is", userName);
                const user_id = resp._id

                try {
                    dispatch({
                        type: "SET_USER",
                        user: userName
                    })
                    dispatch({
                        type: "SET_USER_ID",
                        user: user_id
                    })
                    // console.log("user id", user_id);
                } catch (error) {
                    console.log(error);
                }
            };
            getUser();

        }
        else {
            // alert('Invalid Credentials')
            // props.showAlert_prop("Invalid Credentials", "danger")
            alert("Invalid Credentials")
        }
    }

    const onSignUp = (e) => {
        e.preventDefault()
        navigate("/signup")
    }
    return (
        <div className='signin-div'>
            <Link to="/" className={darkMode ? "home-link text-white" : 'home-link'}>
                <img src={darkMode ? "https://www.pinclipart.com/picdir/big/57-576184_view-our-amazon-storefront-amazon-logo-white-png.png" : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/100px-Amazon_logo.svg.png"} alt="" className="amazon-logo" /> .in
            </Link>

            <div className="signin-form">
                <h2>Sign-in</h2>

                <form action="submit">

                    <h6>Email Id <span style={{ color: "red", fontWeight: "bolder" }}>*</span></h6>
                    <input className={darkMode ? 'bg-secondary text-white' : null} type="text" value={credentials.email} onChange={onChange} id='email' />
                    <h6>Password <span style={{ color: "red", fontWeight: "bolder" }}>*</span></h6>
                    <input className={darkMode ? 'bg-secondary text-white' : null} type="password" value={credentials.password} onChange={onChange} id='password' />

                    <button className='signin-btn' onClick={onSignIn} disabled={credentials.email.length < 5 || credentials.password.length < 6}>Sign-In</button>

                    <p>By continuing, you agree to Amazon clone's <a className='anchors' target="_blank" rel="noreferrer" href="https://www.amazon.in/gp/help/customer/display.html/ref=ap_signin_notification_condition_of_use?ie=UTF8&nodeId=200545940"> Conditions of Use</a> and <a className='anchors' target="_blank" rel="noreferrer" href="https://www.amazon.in/gp/help/customer/display.html/ref=ap_signin_notification_privacy_notice?ie=UTF8&nodeId=200534380">Privacy Notice.</a></p>
                </form>
            </div>

            <div className="signup-section">
                <p>New to Amazon?</p>
                <button onClick={onSignUp}>Create your Amazon account</button>
            </div>
            <hr />
            <div className="footer-guide">
                <a className='anchors' target="_blank" rel="noreferrer" href="https://www.amazon.in/gp/help/customer/display.html/ref=ap_signin_notification_condition_of_use?ie=UTF8&nodeId=200545940">Conditions of Use</a>
                <a className='anchors' target="_blank" rel="noreferrer" href="https://www.amazon.in/gp/help/customer/display.html/ref=ap_signin_notification_privacy_notice?ie=UTF8&nodeId=200534380">Privacy Notice</a>
                <a className='anchors' target="_blank" rel="noreferrer" href="https://www.amazon.in/gp/help/customer/display.html?ie=UTF8&nodeId=508510">Help</a>
            </div>
            <footer>© 1996-2022, Amazon.com, Inc. or its affiliates</footer>
        </div>
    );
}
