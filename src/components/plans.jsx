import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faXmark, faLock } from "@fortawesome/free-solid-svg-icons";
import '../css/plans.css'
import { db } from "../firebase";
import Button from "./button.jsx";
import StepThree from "./StepThree.jsx";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";

const Plans = () => {

    const details = ["Monthly price.", "Video quality.", "Resolution.", "Watch on your TV, computer, mobile phone and tablet.", "Downloads."]
    const advantages = ["Watch all you want.", "Recommendations just for you.", "Change or cancel your plan anytime."]
    const [products, setProducts] = useState(JSON.parse(localStorage.getItem("products")) || []);
    const [productNames, setProductNames] = useState(JSON.parse(localStorage.getItem("productName")) || []);
    const [basic, setBasic] = useState([])
    const [basicWA, setBasicWA] = useState([])
    const [standard, setStandard] = useState([])
    const [premium, setPremium] = useState([])
    const [activeBA, setActiveBA] = useState(false)
    const [activeB, setActiveB] = useState(false)
    const [activeS, setActiveS] = useState(false)
    const [activeP, setActiveP] = useState(true)
    const [selectedPlan, setSelectedPlan] = useState()
    const [selectedPlanPriceId, setSelectedPlanPriceId] = useState()
    const [subscription, setSubscription] = useState(null)
    const [paymentStep, setPaymentStep] = useState(() => {
        const storePaymentStep = sessionStorage.getItem('paymentStep');
        return storePaymentStep !== null ? parseInt(storePaymentStep) : 1;
    });
    const user = useSelector(selectUser)

    useEffect(() => {
        sessionStorage.setItem('paymentStep', paymentStep);
    }, [paymentStep]);

    const handPaymentStep = (num = 1) => {
        setPaymentStep(paymentStep + 1);
        localStorage.setItem("paymentStep", paymentStep + 1);
        // if (paymentStep < 1 || paymentStep > 9) {
        //     return <Login />
        // }
        window.history.pushState({ paymentStep: paymentStep + 1 }, "", "");
    }

    useEffect(() => {
        const handlePopState = () => {
            setPaymentStep((prevStep) => prevStep - 1);
        };

        window.addEventListener("popstate", handlePopState);
        return () => window.removeEventListener("popstate", handlePopState);
    }, []);

    useEffect(() => {
        // fetch products from firebase
        db.collection('products')
            .where('active', '==', true)
            .get()
            .then(querySnapshot => {
                const products = {};
                querySnapshot.forEach(async productDoc => {
                    products[productDoc.id] = productDoc.data();
                    const priceSnap = await productDoc.ref.collection('prices').get();
                    priceSnap.docs.forEach(price => {
                        products[productDoc.id].prices = {
                            priceId: price.id,
                            priceData: price.data(),
                        };
                    });
                });
                setProducts(products);
                localStorage.setItem("products", JSON.stringify(products));

                const productData = Object.entries(products).map(([productId, productData]) => ({
                    id: productId,
                    name: productData.name,
                    description: productData.description,
                }));
                setProductNames(productData);
                localStorage.setItem("productName", JSON.stringify(productNames));

                productNames.map((item) => {
                    console.log("item", item)
                    const id = item.id;
                    if (id === "prod_NbXCjRGeUK6wM3") {
                        setBasicWA([{
                            id: item.id,
                            price: 5.49,
                            description: item.description
                        }])
                    } else if (id === "prod_NbXD8ij76WI8nh") {
                        setBasic([{
                            id: item.id,
                            price: 7.99,
                            description: item.description
                        }])
                    } else if (id === "prod_NbXEfymdNwnKLm") {
                        setStandard([{
                            id: item.id,
                            price: 12.99,
                            description: item.description
                        }])
                    } else if (id === "prod_NbXGmt0rwlsTlm") {
                        setPremium([{
                            id: item.id,
                            price: 17.99,
                            description: item.description
                        }])
                    }
                })
            });
    }, []);

    useEffect(() => {
        db.collection('customers').doc(user.uid).collection('subscription').get().then(querySnapshot => {
            querySnapshot.forEach(async subscription => {
                setSubscription({
                    role: subscription.data().role,
                    current_period_start: subscription.data().current_period_start.seconds,
                    current_period_end: subscription.data().current_period_end.seconds,
                })
            })
        })
    }, [user.uid])

    const advantagesDesc = advantages.map((item, index) => {
        return (
            <li key={index + 4}>
                <FontAwesomeIcon icon={faCheck} /> {item}
            </li>
        )
    })

    const planTypes = [basicWA, basic, standard, premium]

    const handleActiveProduct = (id) => {
        setSelectedPlan(id)
        if (id === "prod_NbXCjRGeUK6wM3") {
            setActiveBA(true)
            setActiveB(false)
            setActiveS(false)
            setActiveP(false)
        } else if (id === "prod_NbXD8ij76WI8nh") {
            setActiveB(true)
            setActiveBA(false)
            setActiveS(false)
            setActiveP(false)
        } else if (id === "prod_NbXEfymdNwnKLm") {
            setActiveS(true)
            setActiveBA(false)
            setActiveB(false)
            setActiveP(false)
        } else if (id === "prod_NbXGmt0rwlsTlm") {
            setActiveP(true)
            setActiveBA(false)
            setActiveB(false)
            setActiveS(false)
        }
    }


    const detailsInfo = details.map((detail, index) => {
        const types = planTypes.map((element, elementIndex) => {
            return (
                <span className={
                    activeBA ? "activeBA span_container" : activeB ? "activeB span_container" : activeS ? "activeS span_container" : activeP ? "activeP span_container" : "span_container"} key={elementIndex}>
                    {element.map((item) => {
                        return (
                            <span>
                                {
                                    detail === "Monthly price." ? item.price :
                                        detail === "Video quality." ? item.description[0] :
                                            detail === "Resolution." ? item.description[1]
                                                :
                                                detail === "Watch on your TV, computer, mobile phone and tablet." ? (
                                                    <FontAwesomeIcon icon={item.description[2] === true ? faCheck : faXmark} />
                                                )
                                                    :
                                                    detail === "Downloads."
                                                        ? (
                                                            <FontAwesomeIcon icon={item.description[3] === true ? faCheck : faXmark} />
                                                        ) : ""
                                }</span>
                        )
                    })}
                </span>
            )
        })
        return (
            <div className="productAdvantages" key={index + 1}>
                <tr className="advantageKey">
                    <td>{detail}</td>
                </tr>
                <tr className="advantageValue">
                    <td>{types}</td>
                </tr>
            </div>
        )
    })

    const handleProduct = (item) => {
        planTypes.map((type) => {
            type.map((element) => {
                if (element.id === item.id) {
                    handleActiveProduct(item.id)
                }
            })
        })
    }

    useEffect(() => {
        Object.entries(products).map(([productId, productData]) => {
            if (selectedPlan) {
                if (productId === selectedPlan) {
                    setSelectedPlanPriceId(
                        productData.prices.priceId
                    )
                }
            }

        })
    })

    const productData = productNames.map((item) => {
        return (
            <div onClick={() => handleProduct(item)} className="productName" key={item.id}>
                <div>{item.name}</div>
            </div>
        )
    })

    console.log(subscription)

    return (
        <>
            {paymentStep === 1 ? (
                <>
                    <div className="third_section_info">
                        <p>STEP <strong>1</strong> of <strong>3</strong></p>
                        <h2>Choose the plan that's right for you.</h2>
                        <ul>
                            {advantagesDesc}
                        </ul>
                        <table align="right">
                            <div>{productData}</div>
                            <tbody>
                                {detailsInfo}
                            </tbody>
                        </table>
                        <div className="advise_section">
                            <span>
                                <FontAwesomeIcon icon={faLock} />
                            </span>
                            <p>
                                If you are on an ad-supported plan, you will have a limited number of movies and TV shows unavailable due to licensing restrictions. Some location and device restrictions also apply. <span className="link"> Learn more.</span>
                            </p>
                        </div>
                        <p className="advise_info">
                            If you select an ad-supported plan, you will be required to provide your date of birth for ads personalization and other purposes consistent with the Netflix <span className="link">Privacy Statement.</span>
                        </p>
                        <p className="advise_info">
                            HD (720p), Full HD (1080p), Ultra HD (4K) and HDR availability subject to your internet service and device capabilities. Not all content is available in all resolutions. See our <span className="link"> Terms of Use </span>for more details.
                        </p>
                        <p className="advise_info">
                            Only people who live with you may use your account. Add 1 extra member with Standard or up to 2 with Premium.  <span className="link"> Learn more.</span> Watch on 4 different devices at the same time with Premium, 2 with Standard and 1 with Basic or Basic with ads.
                        </p>
                    </div>
                    <div className="btn_planSection">
                        <Button text='Next' className='nextStep_btn' onClick={handPaymentStep} />
                    </div>
                </>
            ) : paymentStep === 2 ? (
                <StepThree products={products} selectedPlanPriceId={selectedPlanPriceId} />
            ) : ""}

        </>
    )
};

export default Plans;