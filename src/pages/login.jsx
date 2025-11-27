import React from 'react'
import Logincomponent from '../components/logincomponent';

const LOGIN = () => {
    const handleLogin = (loginData) => {
        console.log("login data : ", loginData);
    }
    return (
        <>
            <Logincomponent onLogin={handleLogin}/>
        </>
    )
}

export default LOGIN
