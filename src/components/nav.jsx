import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import '../css/nav.css'

const Nav = () => {

    const [show, setShow] = useState(false);

    const transitionNavBar = () => {
        if (window.scrollY > 100) {
            setShow(true);
        } else {
            setShow(false)
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', transitionNavBar);
        return () => window.removeEventListener('scroll', transitionNavBar)
    }, [])

    return (
        <div className={`nav ${show && `nav_black`}`}>
            <div className='nav_content'>
                <img
                    className='nav_logo'
                    src='https://1000marcas.net/wp-content/uploads/2020/01/Logo-Netflix.png' alt='netflix logo' />
                <img
                    className='nav_avatar'
                    src='https://i.pinimg.com/736x/db/70/dc/db70dc468af8c93749d1f587d74dcb08.jpg' alt='avatar picture' />
            </div>
        </div>
    )
};

export default Nav;