import React from 'react'
import { BrowserRouter as Router, useNavigate, Switch, Route, Link } from 'react-router-dom';
import Beatzz from '../static/Beatzz.jpg';

export default function Sidebar(props) {
    return (
        <div style={{zIndex : -1}}>
            <div className="container my-2">
                <div className="my-3">
                    <img src={Beatzz} className="mx-auto d-block" style={{"width":"150px","height":"70px"}} />
                </div>

                <div className="my-3">
                    <div className="mb-3">
                        <Link to="/" className="text-decoration-none text-light">
                            <i className="fa fa-home mx-1" style={{ fontSize: "24px", color: "white" }}></i>
                            <span>Home</span>
                        </Link>
                    </div>
                    <div className="mb-3">
                        <Link to="/search" className="text-decoration-none text-light">
                            <i className="fa fa-search mx-1" style={{ fontSize: "24px", color: "white" }}></i>
                            <span>Search</span>
                        </Link>
                    </div>
                </div>
                {props.currentSong && <img src={props.currentSong.imageLink} className="w-100"/>}
            </div>
        </div>
    )
}
