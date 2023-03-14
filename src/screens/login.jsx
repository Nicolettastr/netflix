import React, { useState } from 'react';
import logo from '../img/logo.png'
import '../css/login.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import SignUpScreen from './signUpScreen';

const Login = () => {

    const [signIn, setSignIn] = useState(false);


    return (
        <div className='loginScreen'>
            <div className="loginScreen_background">
                <img className='loginScreen_logo' src={logo} alt='' />
                <button onClick={() => setSignIn(true)} className='loginScreen_btn'>
                    Sign In
                </button>

                <div className="loginScreen_gradient"></div>
            </div>
            <div className='loginScreen_container'>
                {signIn ? (
                    <SignUpScreen />
                ) :
                    <div className='loginScreen_body'>
                        <h1>Unlimited movies, Tv shows and more.</h1>
                        <h2>Watch anywhere. Cancel anytime</h2>
                        <h3>Ready to watch? Enter your email to create or restart your membership.</h3>

                        <div className="loginScreen_input">
                            <form>
                                <input type="email" placeholder='Email Address' />
                                <button
                                    onClick={() => setSignIn(true)} className='loginScreen_getStarted'>Get Started <FontAwesomeIcon icon={faChevronRight} /></button>
                            </form>
                        </div>
                    </div>
                }

            </div>
        </div>
    )
};

export default Login;