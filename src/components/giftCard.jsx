import React from "react";
import Button from './button.jsx'

const GiftCard = () => {

    const handleGiftCard = () => {
        console.log("click")
    }

    return (
        <>
            <section className="payment_container">
                <div>
                    <p>Step <strong>3</strong> of <strong>3</strong></p>
                    <h2>Enter your gift code</h2>
                    <input type="text" placeholder="Gift Card Pin or Code" />
                    <div>
                        <div>
                            <p>EUR17.99/month</p>
                            <p>Premium</p>
                        </div>
                        <p>change</p>
                    </div>
                    <Button text='Redeem Gift Code' className='nextStep_btn'
                        onClick={handleGiftCard} />
                    <p>This page is protected by Google reCAPTCHA to ensure you're not a bot. <span className="link">Learn more.</span></p>
                </div>
            </section>
        </>
    )
};

export default GiftCard;