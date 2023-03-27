import React from "react";
import Button from "./button";
import '../css/steps.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const StepTwo = ({ handleStep }) => {

    const handleStepTwo = () => {
        handleStep()
    }

    const details = ["No commitments, cancel anytime.", "Endless entertaiment for one low price.", "Enjoy Netflix on all your devices."]

    const detailsInfo = details.map((detail, index) => {
        return <li key={index + 1}> <p><FontAwesomeIcon className="faIcon faCheck" icon={faCheck} /></p> {detail}</li>
    })

    return (
        <>
            <section className="step_container">
                <div>
                    <FontAwesomeIcon className="faIcon faCircleCheck" icon={faCircleCheck} />
                </div>
                <div className='stepTwo_container' >
                    <p>Step <strong>2</strong> of <strong>3</strong></p>
                    <h2>Choose your plan.</h2>
                    <ul>
                        {detailsInfo}
                    </ul>
                    <Button text='Next' className='nextStep_btn stepTwo_btn'
                        onClick={handleStepTwo} />
                </div>
            </section>
        </>
    )
};

export default StepTwo;