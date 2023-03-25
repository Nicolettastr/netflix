import React from "react";
import Button from "./button";
import '../css/stepOne.css';
import devices from '../img/sizes.jpg'

const StepOne = ({ handleStep }) => {

    const handleStepOne = () => {
        handleStep()
    }

    return (
        <>
            <section className="stepOne_container">
                <div>
                    <img src={devices} alt="diferent devices sizes such as laptops, desktop, mobile and tablet" />
                </div>
                <div>
                    <p>Step <strong>1</strong> of <strong>3</strong></p>
                    <h2>Finish setting up your account</h2>
                    <p>Netflix is personalized for you.</p>
                    <p>Create a password to watch on any device at any time.</p>
                    <Button text='Next' className='nextStep_btn'
                        onClick={handleStepOne} />
                </div>
            </section>
        </>
    )
};

export default StepOne;