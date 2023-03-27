import React from "react";
import Button from "../components/button";

const StepOneForm = ({ handlePassword, passwordValidation, emailValue, email, passwordValue, invalid, handleNextStep }) => {
    return (
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
    )
};

export default StepOneForm;