import React from "react";

const Button = ({ id, text, onClick, className, fontIcon, type }) => {

    const buttonClasses = `button ${className}`

    return (
        <button id={id} type={type ? type : ''} onClick={onClick} className={buttonClasses} >
            {text}
            {fontIcon}
        </button>
    )
};

export default Button;