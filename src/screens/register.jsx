import React, { useRef, useState, useEffect } from "react";
import { auth } from "../firebase";
import { useLocation } from "react-router-dom";
import NavReg from "../components/navReg";
import '../css/register.css'
import StepOne from "../components/stepOne.jsx";
import StepOneForm from "../components/stepOneForm";
import StepTwo from "../components/stepTwo.jsx";
import StepThree from "../components/StepThree.jsx";
import Login from "./login.jsx"
import Plans from "../components/plans";

const Register = ({ handleRegisterUser }) => {

    const emailValue = useRef(null);
    const passwordValue = useRef(null);
    const location = useLocation()
    const email = new URLSearchParams(location.search).get('email');
    const [passwordValidation, setPasswordValidation] = useState("")
    const [invalid, setInvalid] = useState(false)

    const [step, setStep] = useState(() => {
        const storedStep = sessionStorage.getItem('step');
        return storedStep !== null ? parseInt(storedStep) : 1;
    });

    useEffect(() => {
        sessionStorage.setItem('step', step);
    }, [step]);

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

        handleRegisterUser()
        handleStep()
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

    const handleStep = (num = 1) => {
        setStep(step + 1);
        localStorage.setItem("step", step + 1);
        if (step < 1 || step > 9) {
            return <Login />
        }
        window.history.pushState({ step: step + 1 }, "", "");
    }

    useEffect(() => {
        const handlePopState = () => {
            setStep((prevStep) => prevStep - 1);
        };

        window.addEventListener("popstate", handlePopState);
        return () => window.removeEventListener("popstate", handlePopState);
    }, []);

    console.log(step)

    return (
        <>
            <div>
                <div>
                    <NavReg />
                </div>
            </div>
            {step === 1 ? (
                <div className="step_section">
                    <StepOne handleStep={handleStep} />
                </div>
            ) : step === 2 ? (
                <StepOneForm passwordValidation={passwordValidation} emailValue={emailValue} passwordValue={passwordValue} email={email} invalid={invalid} handlePassword={handlePassword} handleNextStep={handleNextStep} />
            ) : step === 3 ? (
                <div className="step_section">
                    <StepTwo handleStep={handleStep} />
                </div>
            ) : step === 4 ? (
                <div className="step_section">
                    <Plans handleStep={handleStep} />
                </div>
            ) : step === 5 ? (
                <div className="step_section">
                    <StepThree handleStep={handleStep} step={step} />
                </div>
            ) :
                // its repeat so it can be send to the payment type page, this is because I used 3 state variables, debit, paypal and giftCard initialized as false, that when clicked turns true, aditionally, I state that if the state variable is true and step === 6, show me each page, did it this way to be able to use the popstate, you can go backwards with the browser
                <div className="step_section">
                    <StepThree handleStep={handleStep} step={step} />
                </div>
            }
        </>
    )
};

export default Register;