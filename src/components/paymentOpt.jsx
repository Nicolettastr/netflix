import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock } from "@fortawesome/free-solid-svg-icons";

const PaymentOpt = ({ paymentOptions }) => {
    return (
        <section className="step_container">
            <div>
                <FontAwesomeIcon className="faIcon faLock" icon={faLock} />
            </div>
            <div className="stepThree_info">
                <p>Step <strong>3</strong> of <strong>3</strong></p>
                <h2>Choose how to pay</h2>
                <p>Your payment is encrypted and you can change how you pay anytime.</p>
                <p><strong>Secure for peace of mind.</strong></p>
                <p><strong>Cancel easily online.</strong></p>
                <span>End-to.end encrypted <FontAwesomeIcon className="faIcon_encrypted" icon={faLock} /> </span>
                {paymentOptions}
            </div>
        </section>
    )
};

export default PaymentOpt;