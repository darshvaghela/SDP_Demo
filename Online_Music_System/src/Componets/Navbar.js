import React from 'react'
import { BrowserRouter as Router, useNavigate, Switch, Route, Link } from 'react-router-dom';


export default function Navbar() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark" style={{ "backgroundColor": "#151313" }}>
                <div className="container pl-5">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item me-auto">
                            <Link to="/signin" className="nav-link" aria-current="page">Sign In</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/signup" className="nav-link" aria-current="page">Sign Up</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}
