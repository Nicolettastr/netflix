import React, { useRef } from "react";
import "../css/signUpScreen.css"
import { Link } from "react-router-dom";
// import { auth } from './firebase.js'

const SignUpScreen = () => {

    // const emailRef = useRef(null);
    // const passwordRef = useRef(null);

    const register = (ev) => {
        //when clicked, we want to create an user account
        // ev.preventDefault()
        // //set up the auth created in the firebase.js file 
        // auth
        //     .createUserWithEmailAndPassword(
        //         //it takes the value of whatever emailRef and passwordRef is pointing
        //         emailRef.current.value,
        //         passwordRef.current.value
        //     ).then((authUser) => {
        //         console.log(authUser)
        //     }).catch(error => {
        //         alert(error.message)
        //     })
    }

    const signIn = (ev) => {
        ev.preventDefault()
    }

    return (
        <div className="signUpScreen">
            <h1>Sign In</h1>
            <form>
                <input type="email" placeholder="Email" />
                <input type="password" placeholder="Password" />
                <button onClick={signIn} type="submit">Sign In</button>
                <div className="signUpScreen_checkbox">
                    <div>
                        <input className="checked" type="checkbox" />
                        <span>Remember me</span>
                    </div>
                    <span>Need help?</span>
                </div>
                <div className="signUpScreen_info">
                    <h4>New to Netflix?
                        <span onClick={register}>Sign up now.</span>
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