import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, useNavigate, Switch, Route, Link, useLocation, useParams } from 'react-router-dom';
import Sidebar from '../Sidebar';
import Navbar from '../Navbar'
import EmptyPlaylist from '../../static/empty-playlist.jpg'



export default function ViewPlaylist(props) {
    const location = useLocation()
    const nav = useNavigate();
    const account = JSON.parse(localStorage.getItem("account"))
    const [playlist, setPlaylist] = useState(location.state.playlist);

    const handleRemoveClick = async (id) => {

        let response = await fetch("http://localhost:4099/playlist/removesong",
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ songId: id, playlistId: playlist._id })
            }
        );
        response = await response.json();
    }

    const handleOnClick= (s)=>{
        props.setCurrentSong(s)
        console.log("Song Added")
    }

    const handleOnDelete = async (id) => {
        if (window.confirm(`Are you sure you want to delete "${playlist.playlistName}"?`)) {

            let response = await fetch("http://localhost:4099/playlist/deleteuserplaylist",
                {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id })
                }
            );
            response = await response.json();
            // fetchPlaylists();
        }
    }

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
                                    {playlist.songs[0] ?
                                        <img src={playlist.songs[0].imageLink} className="rounded" style={{ width: '250px', height: '250px' }} />
                                        :
                                        <img src={EmptyPlaylist} className="rounded" style={{ width: '250px', height: '250px' }} />

                                    }
                                </div>
                                <div className="d-flex flex-column justify-content-center my-4 text-light">
                                    <span className="display-5 mb-2" style={{ fontFamily: "Mochiy Pop P One, sans-serif" }}>{playlist.playlistName}</span>
                                </div>
                            </div>
                            <div className="my-4 mx-4">

                                {!playlist.songs[0] ?
                                    <div className="btn-group dropend">
                                        <button className="btn btn-dark shadow-none" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                            <i className="fa fa-ellipsis-h" style={{ fontSize: "22px", color: "grey", cursor: "pointer" }}></i>
                                        </button>
                                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                            <li><Link className="dropdown-item" to="/">Add Song</Link></li>
                                            <li><Link className="dropdown-item" to="/yourplaylist" onClick={() => handleOnDelete(playlist._id)}>Delete Playlist</Link></li>
                                        </ul>
                                    </div>
                                    :
                                    // <span></span>

                                    <table className="table text-light table-dark table-hover">

                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Title</th>
                                                <th>Artist</th>
                                                <th></th>
                                                {/* <th></th> */}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                playlist.songs.map((s, index) => {
                                                    return (
                                                        <tr key={s._id}>
                                                            <td  onClick={() =>handleOnClick(s)}>{index + 1}</td>
                                                            <td  onClick={() =>handleOnClick(s)} style={{width:"300px"}} >
                                                                {s.songName}
                                                                {
                                                                    (s.movieName !== "AlbumSong") ?
                                                                        <span className="">&nbsp;(From "{s.movieName}")</span> : <span></span>

                                                                }
                                                            </td>
                                                            <td  onClick={() =>handleOnClick(s)} style={{width:"400px"}} className="">{s.singerName}</td>
                                                            <td className="d-flex justify-content-center">
                                                                <div className="btn-group dropend">
                                                                    <button className="btn btn-dark shadow-none" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                                                        <i className="fa fa-ellipsis-h" style={{ fontSize: "22px", color: "grey", cursor: "pointer" }}></i>
                                                                    </button>
                                                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                                                        <li><Link className="dropdown-item" to="/yourplaylist" onClick={() => handleRemoveClick(s._id)}>Remove</Link></li>
                                                                    </ul>
                                                                </div>
                                                            </td>
                                                            {/* <td><button className="btn btn-link link-success text-decoration-none p-0 btn shadow-none" onClick={() => handleEditClick(s._id)}>Edit</button></td> */}

                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
