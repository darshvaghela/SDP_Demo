import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, useNavigate, Switch, Route, Link, useLocation, useParams } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import './custom.css';
import 'react-h5-audio-player/lib/styles.css';

export default function Player(props) {
    const location = useLocation();
    const [song, setSong] = useState([])

    const fetchById = async () => {
        let response = await fetch(`http://localhost:4099/song/fetchbyid/${location.state.id}`,
            {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            }
        );
        response = await response.json();
        setSong(response.song)
        props.setCurrentSong(response.song);
    }
    
    
    useEffect(() => {
        fetchById();
    }, [])


    return (
        <div className="container-fluid w-100 bg-dark min-vh-100">
            <div className="row h-100">
                <div className="col-2 p-0 h-100 position-fixed" style={{ backgroundColor: "black" }}>
                    <Sidebar currentSong={props.currentSong}/>
                </div>
                <div className="col-10 p-0 offset-2 h-100">
                    <Navbar />
                    <div className="container my-4 bg-dark" style={props.currentSong ? {height : '81vh', overflow : 'auto'} : {height : '92.48vh', overflow: 'auto'} }>
                        <div className="d-flex">
                            <div className="mx-4">
                                <img src={song.imageLink} className="rounded" style={{width: '250px', height: '250px'}} />
                            </div>
                            <div className="d-flex flex-column justify-content-center my-4 text-light">
                                <span className="display-5 mb-2" style={{ "font-family": "Mochiy Pop P One, sans-serif" }}>{song.songName}</span>
                                {
                                    (song.movieName != "AlbumSong") ?
                                        <span className="">From "{song.movieName}"</span> : <span></span>

                                }
                                <span className="">{song.singerName}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
