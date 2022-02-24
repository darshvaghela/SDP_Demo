import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, useNavigate, Switch, Route, Link, useLocation, useParams } from 'react-router-dom';
import Sidebar from '../Sidebar';
import Navbar from '../Navbar'

export default function ViewPlaylist(props) {
    const location = useLocation()
    const nav = useNavigate();
    const account = JSON.parse(localStorage.getItem("account"))
    const [playlist, setPlaylist] = useState(location.state.playlist);

    return (
        <>
            <div className="container-fluid w-100 min-vh-100 bg-dark">
                <div className="row h-100">
                    <div className="col-2 p-0 h-100 position-fixed" style={{ backgroundColor: "black" }}>
                        <Sidebar currentSong={props.currentSong} />

                    </div>
                    <div className="col-10 offset-2 p-0 h-100 ">
                        <Navbar />
                        <div className="container my-4 bg-dark" style={props.currentSong ? { height: '81vh', overflow: 'auto' } : { height: '92.48vh', overflow: 'auto' }}>
                            <div className="d-flex">
                                <div className="mx-4">
                                    <img src={playlist.songs[0].imageLink} className="rounded" style={{ width: '250px', height: '250px' }} />
                                </div>
                                <div className="d-flex flex-column justify-content-center my-4 text-light">
                                    <span className="display-5 mb-2" style={{ fontFamily: "Mochiy Pop P One, sans-serif" }}>{playlist.playlistName}</span>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </>
    )
}
