import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import '../css/plans.css'
import { db } from "../firebase";

const Plans = () => {

    const details = ["Watch all you want.", "Recommendations just for you.", "Change or cancel your plan anytime."]
    const [products, setProducts] = useState([]);

    //Use an useEffect to fetch the plans from the data base, this is because the stripe extension pulls the stripe data into our firebase data and connects them.

    useEffect(() => {
        //we do this because inside of firebase we have a collection which its name is products
        db.collection('products')
            //this is to filter them, sometimes we can have multiple products, some active and some inactive but still in the database
            .where('active', '==', true)
            //this will give us a querySnapshot because we query by active, the previous line
            .get().then(querySnapshot => {
                // create an empty products object
                const products = {};
                //this will return a bunch of doc
                querySnapshot.forEach(async productDoc => {
                    //every time it goes through a productDoc it brings for each id, the product data which is the product details
                    products[productDoc.id] = productDoc.data()
                    //each price has its own details and its own price collection, to get them we do the next steps:
                    //create priceSnap variable, use the await because its async and them we go to the productDoc reference get into the collecion and this time we go to price
                    const priceSnap = await productDoc.ref.collection('prices').get();
                    //this is because theres a posibility to have more than one price, so we create an object with the price id and price data, to get the info into a object
                    priceSnap.docs.forEach(price => {
                        products[productDoc.id].prices = {
                            priceId: price.id,
                            priceData: price.data()
                        }
                    })
                });
                setProducts(products);
            });
    }, []);

    console.log(products)

    const detailsInfo = details.map((detail, index) => {
        return <li key={index + 1}> <p><FontAwesomeIcon className="faIcon faCheck" icon={faCheck} /></p> {detail}</li>
    })

    return (
        <div className="third_section_info">
            <p>STEP <strong>1</strong>of <strong>3</strong></p>
            <h2>Choose the plan that's right for you.</h2>
            <div>
                {detailsInfo}
            </div>
            <div></div>
            <div>
                <div>
                    <p>Monthly price</p>
                    <div>

                    </div>
                </div>
                <div>
                    <p>Video quality</p>
                    <div>

                    </div>
                </div>
                <div>
                    <p>Resolution</p>
                    <div>

                    </div>
                </div>
                <div>
                    <p>Watch on your TV, computer, mobile phone and tablet</p>
                    <div>

                    </div>
                </div>
                <p>Downloads</p>
                <div>

                </div>
            </div>
            <button>See all plans</button>
            <div>
            </div>
        </div>
    )
};

export default Plans;