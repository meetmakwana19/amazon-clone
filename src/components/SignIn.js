import React, { useState } from 'react';
import '../css/SignIn.css';
import { Link, useNavigate } from 'react-router-dom'
import { useStateValue } from '../context/cart-count/CartStateContext';

export default function SignIn() {

    const [credentials, setCredentials] = useState({ email: "", password: "" })
    let navigate = useNavigate()
    const [{ user }, dispatch] = useStateValue();
    console.log("User in signIn component", user);

    const onChange = (e) => {
        // using spread operator with note means only those things will be changed in the note object which are defined after the spread operator.
        setCredentials({ ...credentials, [e.target.id]: e.target.value })
    }

    const onSignIn = async (e) => {
        // to prevent page reloading
        e.preventDefault()
        // API Call
        const response = await fetch(`http://localhost:8080/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            // sending email, password in the body
            body: JSON.stringify({ email: credentials.email, password: credentials.password }) // body data type must match "Content-Type" header
        });
        const resp = await response.json();
        console.log("Login response:", resp);
        if (resp.success) {
            localStorage.setItem("token", resp.authToken)

            // redirect by saving the auth-token
            // will navigate to the "/" endpoint which is the Home.js
            navigate("/")

            // props.showAlert_prop("Logged in successfully", "success")
            alert("Logged in successfully")

            const getUser = async () => {

                console.log("Getting user details");
                // API Call
                const response = await fetch(`http://localhost:8080/auth/getUser`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': localStorage.getItem("token")
                    }
                });
                const resp = await response.json();
                console.log("User details:", resp);
                const userName = resp.name;
                console.log("userName is", userName);

                try {
                    console.log("tyring dispatch");
                    dispatch({
                        type: "SET_USER",
                        user: userName
                    })
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
            <Link to="/" className='home-link'>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/100px-Amazon_logo.svg.png" alt="" className="amazon-logo" /> .in
            </Link>

            <div className="signin-form">
                <h2>Sign-in</h2>
                <form action="submit">

                    <h6>Email Id <span style={{ color: "red", fontWeight: "bolder" }}>*</span></h6>
                    <input type="text" value={credentials.email} onChange={onChange} id='email' />
                    <h6>Password <span style={{ color: "red", fontWeight: "bolder" }}>*</span></h6>
                    <input type="password" value={credentials.password} onChange={onChange} id='password' />

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
