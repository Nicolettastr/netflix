import React from "react";

const Button = ({ text, onClick, className, fontIcon, type }) => {

    const buttonClasses = `button ${className}`

    return (
        <button type={type ? type : ''} onClick={onClick} className={buttonClasses} >
            {text}
            {fontIcon}
        </button>
    )
};

export default Button;