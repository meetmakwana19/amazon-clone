import React, { useState } from 'react';
import '../css/SignIn.css';
import { Link } from 'react-router-dom'

export default function SignIn() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSignIn = (e) => {
        // to prevent page reloading
        e.preventDefault()
    }

    const onSignUp = (e) => {
        e.preventDefault()
    }
    return (
        <div className='signin-div'>
            <Link to="/" className='home-link'>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/100px-Amazon_logo.svg.png" alt="" className="amazon-logo" /> .in
            </Link>

            <div className="signin-form">
                <h2>Sign-in</h2>
                <form action="submit">
                    <h6>Email or mobile phone number</h6>
                    <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
                    <h6>Password</h6>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                    <button className='signin-btn' onClick={onSignIn}>Sign-In</button>

                    <p>By continuing, you agree to Amazon clone's <a href="https://www.amazon.in/gp/help/customer/display.html/ref=ap_signin_notification_condition_of_use?ie=UTF8&nodeId=200545940"> Conditions of Use</a> and <a href="https://www.amazon.in/gp/help/customer/display.html/ref=ap_signin_notification_privacy_notice?ie=UTF8&nodeId=200534380">Privacy Notice.</a></p>
                </form>
            </div>

            <div className="signup-section">
                <p>New to Amazon?</p>
                <button onClick={onSignUp}>Create your Amazon account</button>
            </div>
            <hr />
            <div className="footer-guide">
                <a href="https://www.amazon.in/gp/help/customer/display.html/ref=ap_signin_notification_condition_of_use?ie=UTF8&nodeId=200545940">Conditions of Use</a>
                <a href="https://www.amazon.in/gp/help/customer/display.html/ref=ap_signin_notification_privacy_notice?ie=UTF8&nodeId=200534380">Privacy Notice</a>
                <a href="https://www.amazon.in/gp/help/customer/display.html?ie=UTF8&nodeId=508510">Help</a>
            </div>
            <footer>© 1996-2022, Amazon.com, Inc. or its affiliates</footer>
        </div>
    );
}
