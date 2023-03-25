import React, { useRef, useState } from "react";
import { auth } from "../firebase";
import { useLocation } from "react-router-dom";
import NavReg from "../components/navReg";
import '../css/register.css'
import Button from "../components/button";
import StepOne from "../components/stepOne.jsx";

const Register = () => {

    const emailValue = useRef(null);
    const passwordValue = useRef(null);
    const location = useLocation()
    const email = new URLSearchParams(location.search).get('email');
    const [passwordValidation, setPasswordValidation] = useState("")
    const [invalid, setInvalid] = useState(false)
    const [step, setStep] = useState(1)

    const register = (ev) => {
        //when clicked, we want to create an user account
        if (ev) ev.preventDefault();
        //set up the auth created in the firebase.js file 
        auth
            .createUserWithEmailAndPassword(
                //it takes the value of whatever emailRef and passwordRef is pointing
                emailValue.current.value,
                passwordValue.current.value
            ).then((authUser) => {
                console.log(authUser)
            }).catch(error => {
                alert(error.message)
            })
    }

    const handlePassword = (ev) => {
        setPasswordValidation(ev.target.value)
    }

    const handleNextStep = (ev) => {
        ev.preventDefault();

        setPasswordValidation(ev.target.value)
        if (passwordValidation === "") {
            setInvalid(true)
            setTimeout(() => {
                setInvalid(false)
            }, 2000)
        } else if (passwordValidation.length < 6) {
            alert('Password must have at least 6 characters')
        } else {
            register()
        }
    }

    const handleStep = () => {
        setStep(step + 1)
    }

    return (
        <>
            <div>
                <div>
                    <NavReg />
                </div>
            </div>
            {step === 1 ? (
                <div className="stepOne_section">
                    <StepOne handleStep={handleStep} />
                </div>
            ) : step === 2 ? (
                <section className="register_section">
                    <div className="register_infoContainer">
                        <div>
                            <p>
                                STEP <strong>1</strong> OF <strong>3</strong>
                            </p>
                            <h2>
                                Create a password to start your membership
                            </h2>
                            <p>
                                Just a few more steps and you're done!
                            </p>
                            <p>
                                We hate paperwork, too.
                            </p>
                        </div>
                        <form>
                            <input ref={emailValue} id='email' name="Email" type="email" placeholder="Enter Your Email" defaultValue={email} />
                            <input ref={passwordValue} className={`password_input ${invalid ? 'invalid' : ''}`} id="password" name="Password" type="password" placeholder="Add a Password" value={passwordValidation} onChange={handlePassword} />
                            {invalid ? (
                                <span className="span">
                                    Password is required!
                                </span>
                            ) : ""}
                            <div className="register_checkbox">
                                <input type="checkbox" /><span>Please do not email me Netflix special offers.</span>
                            </div>
                            <Button text='Next' className='nextStep_btn' onClick={handleNextStep} />
                        </form>
                    </div>
                </section>
            ) : (
                ""
            )
            }
        </>
    )
};

export default Register;