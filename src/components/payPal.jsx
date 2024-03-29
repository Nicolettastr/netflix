import React from "react";
import Button from './button.jsx'
import '../css/payment.css'

const PaypalMethod = () => {

    const handlePaylPal = () => {
        window.location.href = 'https://www.paypal.com';
    }

    return (
        <>
            <section className="payment_container">
                <div>
                    <p>Step <strong>3</strong> of <strong>3</strong></p>
                    <h2>Set up your PayPal</h2>
                    <div>
                        <div>
                            <p>EUR17.99/month</p>
                            <p>Premium</p>
                        </div>
                        <p>change</p>
                    </div>
                    <p>To finish signup, click the <strong>Continue to PayPal</strong> button and log in to PayPal using your email and password.</p>
                    <Button text='Continue To Paypal' className='nextStep_btn'
                        onClick={handlePaylPal} />
                </div>
            </section>
        </>
    )
};

export default PaypalMethod;