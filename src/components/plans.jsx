import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faXmark, faLock } from "@fortawesome/free-solid-svg-icons";
import '../css/plans.css'
import { db } from "../firebase";
import Button from "./button.jsx";

const Plans = ({ handleStep }) => {

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

    //Use an useEffect to fetch the plans from the data base, this is because the stripe extension pulls the stripe data into our firebase data and connects them.

    // useEffect(() => {
    //     //we do this because inside of firebase we have a collection which its name is products
    //     db.collection('products')
    //         //this is to filter them, sometimes we can have multiple products, some active and some inactive but still in the database
    //         .where('active', '==', true)
    //         //this will give us a querySnapshot because we query by active, the previous line
    //         .get().then(querySnapshot => {
    //             // create an empty products object
    //             const products = {};
    //             //this will return a bunch of doc
    //             querySnapshot.forEach(async productDoc => {
    //                 //every time it goes through a productDoc it brings for each id, the product data which is the product details
    //                 products[productDoc.id] = productDoc.data()
    //                 //each price has its own details and its own price collection, to get them we do the next steps:
    //                 //create priceSnap variable, use the await because its async and them we go to the productDoc reference get into the collecion and this time we go to price
    //                 const priceSnap = await productDoc.ref.collection('prices').get();
    //                 //this is because theres a posibility to have more than one price, so we create an object with the price id and price data, to get the info into a object
    //                 priceSnap.docs.forEach(price => {
    //                     products[productDoc.id].prices = {
    //                         priceId: price.id,
    //                         priceData: price.data()
    //                     }
    //                 })
    //             });
    //             setProducts(products);
    //         });
    // }, []);


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
                    const id = item.id;
                    if (id === "prod_NbXCjRGeUK6wM3") {
                        setBasicWA([{
                            id: item.id,
                            description: item.description
                        }])
                    } else if (id === "prod_NbXD8ij76WI8nh") {
                        setBasic([{
                            id: item.id,
                            description: item.description
                        }])
                    } else if (id === "prod_NbXEfymdNwnKLm") {
                        setStandard([{
                            id: item.id,
                            description: item.description
                        }])
                    } else if (id === "prod_NbXGmt0rwlsTlm") {
                        setPremium([{
                            id: item.id,
                            description: item.description
                        }])
                    }
                })
            });
    }, []);

    const advantagesDesc = advantages.map((item, index) => {
        return (
            <li key={index + 4}>
                <FontAwesomeIcon icon={faCheck} /> {item}
            </li>
        )
    })

    const handleActiveProduct = (id) => {
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

    const planTypes = [basicWA, basic, standard, premium]

    const detailsInfo = details.map((detail, index) => {
        const types = planTypes.map((element, elementIndex) => {
            return (
                <span className={
                    activeBA ? "activeBA span_container" : activeB ? "activeB span_container" : activeS ? "activeS span_container" : activeP ? "activeP span_container" : "span_container"} key={elementIndex}>
                    {element.map((item) => {
                        console.log(item.description[3])
                        return (
                            <span>
                                {
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
        console.log(detail)
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

    const productData = productNames.map((item) => {
        return (
            <div onClick={() => handleProduct(item)} className="productName" key={item.id}>
                <div>{item.name}</div>
            </div>
        )
    })

    return (
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
                <Button text='Next' className='nextStep_btn' onClick={handleStep} />
            </div>
        </>
    )
};

export default Plans;