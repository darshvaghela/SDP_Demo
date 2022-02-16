import React from 'react'
import { BrowserRouter as Router, useNavigate, Switch, Route, Link } from 'react-router-dom';


export default function Navbar() {
    const nav = useNavigate();
    const account = JSON.parse(localStorage.getItem("account"))
    const handleOnClick = ()=> {
        localStorage.removeItem("account")
        nav('/')
    }
    
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark" style={{ "backgroundColor": "#151313" }}>
                <div className="container pl-5">
                    <ul className="navbar-nav ms-auto">
                        {account ?
                            <li className="nav-item me-auto">
                                <span className="nav-link" style={{ letterSpacing: 2,cursor:"pointer" }} onClick={handleOnClick}>Logout</span>
                            </li>
                            :
                            <>
                                <li className="nav-item me-auto">
                                    <Link to="/signup" className="nav-link" style={{ letterSpacing: 2 }}>Sign Up</Link>
                                </li>

                                <li className="nav-item ms-2">
                                    <Link to="/signin" className="nav-link" style={{ letterSpacing: 2 }}>Sign In</Link>
                                </li>
                            </>
                        }
                    </ul>
                </div>
            </nav>
        </div>
    )
}
