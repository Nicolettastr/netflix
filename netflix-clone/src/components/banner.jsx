import React from "react";
import '../css/banner.css'

const Banner = () => {
    return (
        <header className="banner" style={{
            backgroundSize: 'cover',
            backgroundImage: `url('https://d1csarkz8obe9u.cloudfront.net/posterpreviews/netflix-entertainment-poster-template-design-7bcb489fc724e24ae5918a915769aecc_screen.jpg?ts=1587213240')`,
            backgroundPosition: 'center center',
        }}>

            <div className="banner_content">
                <h1 className="banner_title"> Movie Name</h1>
                <div className="banner_buttons">
                    <button className="banner_button">Play</button>
                    <button className="banner_button">My list</button>
                </div>
                <h1 className="banner_description">
                    this is a test description
                </h1>
            </div>
            <div className="banner--fadeButton"/>
        </header>
    )
};

export default Banner;