import React from 'react';
import Button from '../components/button';
import logo from '../img/logo.png'
import '../css/navReg.css'
import SignUpScreen from '../screens/signUpScreen.jsx'
import { useNavigate } from 'react-router-dom';

const NavReg = () => {

    const navigate = useNavigate()

    const handleSignUp = () => {
        navigate('/')
    }

    return (
        <div className='register_background'>
            <img className='regiser_logo' src={logo} alt='' />
            <Button text='Sign In' onClick={handleSignUp} className={'register_btn'} />
        </div>
    )
};

export default NavReg;