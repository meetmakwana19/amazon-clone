import React, { useState } from 'react';
import '../css/SignIn.css';
import { Link, useNavigate } from 'react-router-dom'

export default function SignUp() {

    const [credentials, setCredentials] = useState({ name: "", email: "", password: "" })

    let navigate = useNavigate()

    const onChange = (e) => {
        // using spread operator with note means only those things will be changed in the note object which are defined after the spread operator.
        setCredentials({ ...credentials, [e.target.id]: e.target.value })
    }

    const onSignIn = async (e) => {
        // to prevent page reloading
        e.preventDefault()
        // remove them out from credentials using destructuring
        const { name, email, password } = credentials;
        // API Call
        const response = await fetch(`http://localhost:8080/auth/createUser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            // sending email, password in the body
            body: JSON.stringify({ name, email, password }) // body data type must match "Content-Type" header
            // body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password }) // body data type must match "Content-Type" header
        });
        const resp = await response.json();
        // console.log(resp);
        if (resp.success) {
            // redirect by saving the auth-token
            localStorage.setItem("token", resp.authToken)
            // will navigate to the "/" endpoint which is the Home.js
            navigate("/")
            alert("Account created successfully")

            // DISPATCH
        }
        else {
            // alert('User already exists with this email')
            // props.showAlert_prop("User already exists with this email", "danger")
            alert("User already exists with this email")
        }
    }


    return (
        <div className='signin-div'>
            <Link to="/" className='home-link'>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/100px-Amazon_logo.svg.png" alt="" className="amazon-logo" /> .in
            </Link>

            <div className="signin-form">
                <h2>Create Account</h2>
                <form action="submit">

                    <h6>Your name <span style={{ color: "red", fontWeight: "bolder" }}>*</span></h6>
                    <input type="text" value={credentials.name} onChange={onChange} id='name' />
                    <div id="emailHelp" class="form-text">Name must be of minimum 3 characters.</div>
                    <h6>Email Id <span style={{ color: "red", fontWeight: "bolder" }}>*</span></h6>
                    <input type="text" value={credentials.email} onChange={onChange} id='email' />
                    <h6>Password <span style={{ color: "red", fontWeight: "bolder" }}>*</span></h6>
                    <input type="password" value={credentials.password} onChange={onChange} id='password' />
                    <div id="emailHelp" class="form-text">Password must be of minimum 5 characters.</div>

                    <button disabled={credentials.name.length < 3 || credentials.email.length < 5 || credentials.password.length < 6} className='signin-btn' onClick={onSignIn}>Sign-up</button>

                    <p>By continuing, you agree to Amazon clone's <a className='anchors' target="_blank" rel="noreferrer" href="https://www.amazon.in/gp/help/customer/display.html/ref=ap_signin_notification_condition_of_use?ie=UTF8&nodeId=200545940"> Conditions of Use</a> and <a className='anchors' target="_blank" rel="noreferrer" href="https://www.amazon.in/gp/help/customer/display.html/ref=ap_signin_notification_privacy_notice?ie=UTF8&nodeId=200534380">Privacy Notice.</a></p>

                    <p className='already'>Already have an account? <Link to="/signin" className='signin-link'>Sign in ►</Link></p>
                </form>
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