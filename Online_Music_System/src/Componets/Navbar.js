import React from 'react'
import { BrowserRouter as Router, useLocation, useNavigate, Switch, Route, Link } from 'react-router-dom';


export default function Navbar(props) {
    const nav = useNavigate();
    const location = useLocation();
    const account = JSON.parse(localStorage.getItem("account"))
    const handleOnClick = () => {
        localStorage.removeItem("account")
        nav('/')
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark w-100" style={{ "backgroundColor": "#151313" }}>
                <div className="container">
                    <ul className="navbar-nav ms-auto">
                        {props.btns}
                        {(account && account.user.isAdmin) &&
                            <>
                                {location.pathname.startsWith("/admin") ?
                                    <li className="nav-item ms-auto">
                                        <Link to="/" className="nav-link" style={{ letterSpacing: 2, cursor: "pointer" }}>Home</Link>
                                    </li>
                                    :
                                    <>
                                    
                                        <li className="nav-item ms-auto">
                                            <Link to="/admin/songs" className="nav-link" style={{ letterSpacing: 2, cursor: "pointer" }}>Admin</Link>
                                        </li>
                                    </>
                                }
                            </>
                        }
                        {account ?
                            <li className="nav-item me-auto">
                                <span className="nav-link" style={{ letterSpacing: 2, cursor: "pointer" }} onClick={handleOnClick}>Logout ({account.user.name})</span>
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
