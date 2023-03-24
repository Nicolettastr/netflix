import React, { useRef } from "react";
import "../css/signUpScreen.css"
import { Link } from "react-router-dom";
import { auth } from '../firebase.js'
import Button from "../components/button";
import { useNavigate } from 'react-router-dom';

const SignUpScreen = () => {

    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const navigate = useNavigate()


    const signIn = (ev) => {
        ev.preventDefault()
        auth.signInWithEmailAndPassword(
            emailRef.current.value,
            passwordRef.current.value
        ).then((authUser) => {
            console.log(authUser)
        }).catch((error) => alert(error.message))
    };

    return (
        <div className="signUpScreen">
            <h1>Sign In</h1>
            <form>
                <input ref={emailRef} type="email" placeholder="Email" />
                <input ref={passwordRef} type="password" placeholder="Password" />
                <Button type='submit' onClick={signIn} text='Sign In' />
                <div className="signUpScreen_checkbox">
                    <div>
                        <input className="checked" type="checkbox" />
                        <span>Remember me</span>
                    </div>
                    <span>Need help?</span>
                </div>
                <div className="signUpScreen_info">
                    <h4>New to Netflix?
                        <span onClick={() => navigate('/register')}>Sign up now.</span>
                    </h4>
                    <p>
                        This page is protected by Google reCAPTCHA to ensure you're not a bot.
                        <Link to=""> Learn more.</Link>
                    </p>
                </div>
            </form>
        </div>
    )
};

export default SignUpScreen;