import React from "react";
import '../css/homeScreen.css'
import Nav from "./nav.jsx";
import Banner from "./banner.jsx";

const HomeScreen = () => {
    return (
        <>
            <div className="homeScreen">
                <Nav/>    
                <Banner/>            
            </div>
        </>
    )
};

export default HomeScreen;