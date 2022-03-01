import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, useNavigate, Switch, Route, Link, useLocation, useParams } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import addtoplaylist from '../static/addtoplaylist-icon.jpg';

import './custom.css';
import 'react-h5-audio-player/lib/styles.css';

export default function Player(props) {
    const location = useLocation();
    const [song, setSong] = useState(null)
    const account = JSON.parse(localStorage.getItem("account"))
    const nav = useNavigate();

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
    const handleOnClick = () => {
        if (account) {
            nav('/createplaylist')
        }
        else {
            nav('/signin')
        }
    }

    useEffect(() => {
        fetchById();
    }, [])


    return (
        <div className="container-fluid w-100 bg-dark min-vh-100">
            <div className="row h-100">
                <div className="col-2 p-0 h-100 position-fixed" style={{ backgroundColor: "black" }}>
                    <Sidebar currentSong={props.currentSong} />
                </div>
                <div className="col-10 p-0 offset-2 h-100">
                    <Navbar />
                    {song &&
                        <div className="container my-4 bg-dark" style={props.currentSong ? { height: '81vh', overflow: 'auto' } : { height: '92.48vh', overflow: 'auto' }}>
                            <div className="d-flex">
                                <div className="mx-4">
                                    <img src={song.imageLink} className="rounded" style={{ width: '250px', height: '250px' }} />
                                </div>
                                <div className="d-flex flex-column justify-content-end text-light">
                                    <span className="mb-2 fw-bold">SINGLE</span>
                                    <div className="mb-2">
                                        <span className="display-5 me-2" style={{ fontFamily: "Mochiy Pop P One, sans-serif" }}>{song.songName}</span>
                                        {
                                            (song.movieName != "AlbumSong") ?
                                                `(From "${song.movieName}")` : ""
                                        }
                                    </div>
                                    {/* <span className="">{song.singerName}</span> */}
                                    <div className="text-muted">
                                        <small>{song.singerName.split(',').join(' ● ')}</small>
                                        {" ● "}
                                        <small>1 Song</small>
                                    </div>
                                </div>
                            </div>

                            <table className="table text-light table-dark table-hover mt-4">

                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>TITLE</th>
                                        <th>ARTIST</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    <tr className="text-light" style={{ height: '50px' }}>
                                        <td style={{ width: "50px" }}>{1}</td>
                                        <td className="" style={{ width: "300px" }} >
                                            <img src={song.imageLink} className="me-3" style={{ width: "35px", height: "35px" }} />
                                            {song.songName}
                                            {
                                                (song.movieName !== "AlbumSong") ?
                                                    <span className="my-2">&nbsp;(From "{song.movieName}")</span> : <span></span>

                                            }
                                        </td>
                                        <td style={{ width: "400px" }} className="my-2">{song.singerName}</td>
                                        <td className="d-flex justify-content-center">
                                            <i style={{ fontSize: "19px", color: "white", cursor: "pointer" }} title="Add to Playlist" className="fa my-2" onClick={handleOnClick}>&#xf0fe;</i>
                                        </td>
                                    </tr>


                                </tbody>
                            </table>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}
