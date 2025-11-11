import React from 'react'
import LoginComponent from '../components/logincomponent';

const LOGIN = () => {
    const handleLogin = (loginData) => {
        console.log("login data : ", loginData);
    }
    return (
        <>
            <LoginComponent onLogin={handleLogin}/>
        </>
    )
}

export default LOGIN
