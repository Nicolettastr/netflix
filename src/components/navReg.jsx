import React from 'react';
import Button from '../components/button';
import logo from '../img/logo.png'
import '../css/navReg.css'

const NavReg = () => {

    const handleSignUp = () => {
        console.log('click')
    }

    return (
        <div className='register_background'>
            <img className='regiser_logo' src={logo} alt='' />
            <Button text='Sign In' onClick={handleSignUp} className={'register_btn'} />
        </div>
    )
};

export default NavReg;