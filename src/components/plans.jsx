import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import '../css/plans.css'
import { db } from "../firebase";

const Plans = () => {

    const details = ["Monthly price.", "Video quality.", "Resolution.", "Watch on your TV, computer, mobile phone and tablet.", "Downloads."]
    const advantages = ["Watch all you want.", "Recommendations just for you.", "Change or cancel your plan anytime."]
    const [products, setProducts] = useState([]);
    const [productNames, setProductNames] = useState([])
    const [basic, setBasic] = useState([])
    const [basicWA, setBasicWA] = useState([])
    const [standard, setStandard] = useState([])
    const [premium, setPremium] = useState([])

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

                const productData = Object.entries(products).map(([productId, productData]) => ({
                    id: productId,
                    name: productData.name,
                    description: productData.description,
                }));
                setProductNames(productData);

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

    const planTypes = [basic, basicWA, standard, premium]

    const detailsInfo = details.map((detail, index) => {
        const types = planTypes.map((element, elementIndex) => {
            return (
                <div key={elementIndex}>
                    {element.map((item) => {
                        return (
                            <span>{detail === "Video quality." ? item.description[0] : detail === "Resolution." ? item.description[1] : detail === "Watch on your TV, computer, mobile phone and tablet." ? item.description[2] : detail === "Downloads." ? item.description[3] : ""}</span>
                        )
                    })}
                </div>
            )
        })
        console.log(detail)
        return (
            <div className="productAdvantages" key={index + 1}>
                <div>
                    {detail}
                    {types}
                </div>
            </div>
        )
    })

    const productData = productNames.map((item) => {
        return (
            <div className="productName" key={item.id}>
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
                <div className="productType__container">
                    {productData}
                </div>
                <div className="product__container">
                    <div>
                        {detailsInfo}
                    </div>
                    <div>

                    </div>
                </div>
            </div>

            <button>See all plans</button>
        </>
    )
};

export default Plans;