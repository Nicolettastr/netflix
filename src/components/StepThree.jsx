import React, { useState, useEffect } from "react";
import '../css/steps.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faGift } from "@fortawesome/free-solid-svg-icons";
import { faCcAmex, faPaypal, faCcVisa, faCcMastercard } from '@fortawesome/free-brands-svg-icons';
import PaymentOpt from "./paymentOpt.jsx";
import DebitCredit from "./debitCredit.jsx";
import GiftCard from "./giftCard.jsx";
import PaypalMethod from "./payPal.jsx";

const StepThree = ({ handleStep, step }) => {

    const [payments, setPayments] = useState(true)
    const [debitCredit, setDebitCredit] = useState(false);
    const [paypal, setPaypal] = useState(false);
    const [giftCard, setGiftCard] = useState(false);

    const handlePaymentOpt = (id) => {
        handleStep()
        console.log(id)
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

    useEffect(() => {
        const handleBackButton = () => {
            if (debitCredit || paypal || giftCard) {
                setDebitCredit(false);
                setPaypal(false);
                setGiftCard(false);
                setPayments(true);
            }
        };
        window.addEventListener("popstate", handleBackButton);
        return () => {
            window.removeEventListener("popstate", handleBackButton);
        };
    }, [debitCredit, paypal, giftCard]);

    return (
        <> {payments ? (
            <PaymentOpt handleStep={handleStep} paymentOptions={paymentOptions} />
        ) : debitCredit && step === 6 ? (
            <DebitCredit />
        ) : paypal && step === 6 ? (
            <PaypalMethod />
        ) : giftCard && step === 6 ? (
            <GiftCard />
        ) : ""}

        </>
    )
};

export default StepThree;