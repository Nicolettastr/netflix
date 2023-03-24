import React, { useState } from 'react';
import logo from '../img/logo.png'
import '../css/login.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import SignUpScreen from './signUpScreen';
import Button from '../components/button.jsx'
import { auth } from '../firebase.js'
import { useNavigate } from 'react-router-dom';
import Register from './register.jsx';

const Login = () => {

    const [signIn, setSignIn] = useState(false);
    const [email, setEmail] = useState(null);
    const [emailExists, setEmailExists] = useState(false)
    const navigate = useNavigate();
    const [invalid, setInvalid] = useState(false)
    const getStarted = document.querySelector('#getStarted')

    const handleEmail = (ev) => {

        setEmail(ev.target.value)

        auth.fetchSignInMethodsForEmail(ev.target.value)
            .then((signInMethods) => {
                setEmailExists(signInMethods.length > 0);
            })
            .catch((error) => {
                console.log(error)
            });
    }

    const handleSignIn = () => {
        setSignIn(true)
    }

    const handleGetStarted = (ev) => {
        ev.preventDefault()
        if (emailExists) {
            setSignIn(true)
            setEmail("")
            getStarted.classList.remove('valid')
        } else if (email === "" || email === null || email === undefined) {
            setInvalid(true)
        } else {
            navigate('/register')
            setEmail("")
            getStarted.classList.remove('valid')
        }

    }

    if (invalid) {
        getStarted.classList.add('invalid')
        setTimeout(() => {
            setInvalid(false)
            getStarted.classList.remove('invalid')
        }, 10000)
    }

    if (email) {
        return <Register email={email} />
    }

    return (
        <div className='loginScreen'>
            <div className="loginScreen_background">
                <img className='loginScreen_logo' src={logo} alt='' />
                <Button text="Sign In" onClick={handleSignIn} className={'loginScreen_btn'} />
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
                                <div className='loginScreen_input_container'>
                                    <input id='getStarted' className='' type='email' placeholder='Email Address' value={email} onChange={handleEmail} />
                                    {invalid ? (
                                        <span>
                                            <FontAwesomeIcon icon={faCircleXmark} />The email address is required.
                                        </span>
                                    ) : ""}
                                </div>
                                <Button text='Get Started' onClick={handleGetStarted} className={'loginScreen_getStarted'}
                                    fontIcon={<FontAwesomeIcon icon={faChevronRight} />} />
                            </form>
                        </div>
                    </div>
                }

            </div>
        </div>
    )
};

export default Login;
