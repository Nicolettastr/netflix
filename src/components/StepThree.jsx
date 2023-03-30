import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { useSelector } from "react-redux";
import '../css/steps.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faGift } from "@fortawesome/free-solid-svg-icons";
import { faCcAmex, faPaypal, faCcVisa, faCcMastercard } from '@fortawesome/free-brands-svg-icons';
import PaymentOpt from "./paymentOpt.jsx";
import GiftCard from "./giftCard.jsx";
import PaypalMethod from "./payPal.jsx";
import { loadStripe } from '@stripe/stripe-js';
import { selectUser } from '../features/userSlice';

const StepThree = ({ handleStep, products, selectedPlanPriceId, handleNewUser, handleUserIn }) => {

    const [payments, setPayments] = useState(true)
    const [debitCredit, setDebitCredit] = useState(false);
    const [paypal, setPaypal] = useState(false);
    const [giftCard, setGiftCard] = useState(false);
    const user = useSelector(selectUser)
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

    console.log(user)

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

    const loadCheckout = async () => {

        const docRef = db.collection('customers').doc(user.uid).collection('checkout_sessions').add({
            price: selectedPlanPriceId,
            success_url: window.location.origin,
            cancel_url: window.location.origin,
        }).then((docRef) => {
            docRef.onSnapshot(async (snap) => {
                const { error, sessionId } = snap.data();

                if (error) {
                    alert(`An error occured: ${error.message}`)
                }

                if (sessionId) {
                    handleNewUser()
                    handleUserIn()
                    const stripe = await loadStripe('pk_test_51MqJeMD7eu1wom6nIQRa6oqEDHANffTvCchpyiyFGA5ojLGD3GbstcxVEuONdSqpZZa2dtz5sTUBzuOUJ25wpmVC00jMK78Zhl');
                    stripe.redirectToCheckout({ sessionId });
                }
            })
        })
    }

    const handlePaymentOpt = (id) => {
        console.log(id)
        if (id === 1) {
            {
                Object.entries(products).map(([productId, productData]) => {
                    loadCheckout(productData.prices.priceId, productData, productId)
                })
            }
        } else if (id === 2) {
            setPaypal(true)
            setPayments(false)
        } else if (id === 3) {
            setGiftCard(true)
            setPayments(false)
        }
    }

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
        ) : paypal ? (
            <PaypalMethod />
        ) : giftCard ? (
            <GiftCard />
        ) : ""}

        </>
    )
};

export default StepThree;