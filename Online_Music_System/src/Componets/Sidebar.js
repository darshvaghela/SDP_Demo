import React from 'react'
import { BrowserRouter as Router, useNavigate, Switch, Route, Link } from 'react-router-dom';
import home from '../static/home-icon.png';

export default function Sidebar() {
    return (
        <div>
            <div className="container my-2">
                <h3>Web Name</h3>

                <div className="my-3">
                    <div className="mb-3">
                        <Link to="/" className="text-decoration-none text-light">
                            <i className="fa fa-home mx-1" style={{ "font-size": "24px", "color": "white" }}></i>
                            <span>Home</span>
                        </Link>
                    </div>
                    <div className="mb-3">
                        <Link to="/search" className="text-decoration-none text-light">
                            <i class="fa fa-search mx-1" style={{ "font-size": "24px", "color": "white" }}></i>
                            <span>Search</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
