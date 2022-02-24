import React from 'react'
import { BrowserRouter as Router, useNavigate, Switch, Route, Link } from 'react-router-dom';
import Beatzz from '../static/Beatzz.jpg';




export default function Sidebar(props) {
    const nav = useNavigate();
    const handleOnClick = () => {
        nav('/createplaylist')
    }
    return (
        <div className="d-flex align-items-start flex-column h-100" style={{ zIndex: -1 }}>

            <div className="container">
                <div className="my-3">
                    <img src={Beatzz} className="mx-auto d-block" style={{ "width": "150px", "height": "70px" }} />
                </div>

                <div className="my-3">
                    <div className="mb-3">
                        <Link to="/" className="text-decoration-none text-light">
                            <i className="fa fa-home me-2" style={{ fontSize: "24px", color: "white" }}></i>
                            <span>Home</span>
                        </Link>
                    </div>
                    <div className="mb-3">
                        <Link to="/search" className="text-decoration-none text-light">
                            <i className="fa fa-search me-2" style={{ fontSize: "24px", color: "white" }}></i>
                            <span>Search</span>
                        </Link>
                    </div>
                    <div className="mb-4">
                        <Link to="/yourplaylist" className="text-decoration-none text-light">
                            <i className="fa fa-music me-2" style={{ fontSize: "24px", color: "white" }}></i>
                            <span>Your Playlists</span>
                        </Link>
                    </div>
                </div>
                {props.currentSong &&
                    <div className="align-self-end">
                        <img src={props.currentSong.imageLink} className="w-100 mt-4" />
                        <div className="d-flex justify-content-between mt-2">
                            <div>
                                <span className="text-light mt-4">{props.currentSong.songName}</span>
                            </div>
                            <div title="Add to Playlist">
                                <i style={{ fontSize: "22px",color: "white",cursor: "pointer" }} className="fa" onClick={handleOnClick}>&#xf0fe;</i>
                            </div>

                        </div>
                        <span className="w-100" style={{ color: "#777777", fontSize: "14px" }}>{props.currentSong.singerName}</span>
                    </div>
                }
            </div>
        </div>
    )
}
