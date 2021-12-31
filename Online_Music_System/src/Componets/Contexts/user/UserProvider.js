import React from 'react'
import UserContext from './UserContext'

export default function UserProvider(props) {


    const signUp = async (name, email, password) => {
        let response = await fetch("http://localhost:4099/auth/signup",
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password })
            }
        );
        response = await response.json();
        return response;
    }
    const signIn = async (email, password) => {
        let response = await fetch("http://localhost:4099/auth/signin",
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
        response = await response.json();
        return response;
    }
    const resetpassword = async (email, password) => {
        let response = await fetch("http://localhost:4099/auth/resetpassword",
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
        response = await response.json();
        return response;
    }


    return (
        <UserContext.Provider value={{ signUp,signIn,resetpassword }}>
            {props.children}
        </UserContext.Provider>
    )
}
