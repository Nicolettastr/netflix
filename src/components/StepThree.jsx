import React, { useState } from "react";
import '../css/steps.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faGift } from "@fortawesome/free-solid-svg-icons";
import { faCcAmex, faPaypal, faCcVisa, faCcMastercard } from '@fortawesome/free-brands-svg-icons';
import PaymentOpt from "./paymentOpt";

const StepThree = ({ handleStep }) => {

    const [payments, setPayments] = useState(true)
    const [debitCredit, setDebitCredit] = useState(false);
    const [paypal, setPaypal] = useState(false);
    const [giftCard, setGiftCard] = useState(false);

    const handlePaymentOpt = (id) => {
        if (id === 1) {
            setDebitCredit(true)
            setPayments(false)
        } else if (id === 2) {
            setPaypal(true)
            setPayments(false)
        } else if (id === 3) {
            setGiftCard(true)
            setPayments(false)
        }
    }

    const paymentMethods = [
        {
            id: 1,
            type: "Credit or Debit",
            desc: "Visa, MasterCard, Amex",
            icon: [faCcVisa, faCcMastercard, faCcAmex]
        },
        {
            id: 2,
            type: "PayPal",
            desc: "PayPal",
            icon: [faPaypal]
        },
        {
            id: 3,
            type: "Gift Code",
            desc: "Netflix gift card code",
            icon: [faGift]
        }
    ];

    const paymentOptions = paymentMethods.map((method, index) => {
        return (
            <div key={index + 12}
                onClick={() => handlePaymentOpt(method.id)}
                id={method.id}
                className="stepThree_payOpt">
                <div>
                    <p>{method.type}</p>
                    <div>
                        {method.icon.map((item) => {
                            return <FontAwesomeIcon className={item === faCcVisa || item === faCcAmex || item === faPaypal ? ` visa payment_icon` : `payment_icon`} icon={item} />
                        })}
                    </div>
                </div>
                <FontAwesomeIcon className="faChevronRight" icon={faChevronRight} />
            </div>
        )
    });

    return (
        <> {payments ? (
            <PaymentOpt paymentOptions={paymentOptions} />
        ) : debitCredit ? (
            ""
        ) : paypal ? (
            ""
        ) : giftCard ? (
            ""
        ) : ""}

        </>
    )
};

export default StepThree;