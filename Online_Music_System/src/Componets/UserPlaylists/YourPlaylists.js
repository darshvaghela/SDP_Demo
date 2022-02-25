import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, useNavigate, Switch, Route, Link, useLocation, useParams } from 'react-router-dom';
import Sidebar from '../Sidebar';
import Navbar from '../Navbar'
import EmptyPlaylist from '../../static/empty-playlist.jpg'

export default function YourPlaylists(props) {
    const nav = useNavigate();
    const account = JSON.parse(localStorage.getItem("account"))
    const [userPlaylists, setUserPlaylists] = useState([]);

    const fetchuserPlaylists = async () => {
        let response = await fetch(`http://localhost:4099/playlist/fetchuserplaylists`,
            {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'token': account.token },
            }
        );
        response = await response.json();
        if (response.success) {
            setUserPlaylists(response.playlists)
        }
    }
    const handleDeleteClick = async (id) => {
        const playlist = userPlaylists.find(p => p._id === id)
        if(window.confirm(`Are you sure you want to delete "${playlist.playlistName}"?`)) {

            let response = await fetch("http://localhost:4099/playlist/deleteuserplaylist",
            {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id })
            }
            );
            response = await response.json();
            fetchuserPlaylists();
        }
        
    }
    const handleOnClick = (p) => {
        nav('/viewplaylist', { state: { playlist: p } })
    }
    useEffect(() => {
        fetchuserPlaylists();
    }, [])
    return (
        <>

            <div className="container-fluid w-100 min-vh-100 bg-dark">
                <div className="row h-100">
                    <div className="col-2 p-0 h-100 position-fixed" style={{ backgroundColor: "black" }}>
                        <Sidebar currentSong={props.currentSong} />

                    </div>
                    <div className="col-10 offset-2 p-0 h-100 ">
                        <Navbar />
                        <div className="container text-light my-4" style={props.currentSong ? { height: '81vh', overflow: 'auto' } : { height: '92.48vh', overflow: 'auto' }}>


                            <div className="my-2">
                                <h2>Your Playlists</h2>
                                <hr />
                                <div className="row row-cols-6 g-4 mb-3">
                                    {
                                        userPlaylists.map((p, index) => {
                                            return (
                                                <div className="col" key={p._id}>
                                                    <div className="card h-100 text-light mycard">
                                                        {p.songs[0] ?
                                                        <img src={p.songs[0].imageLink} className="card-img-top" onClick={() => handleOnClick(p)}/>
                                                        :
                                                        <img src={EmptyPlaylist} className="card-img-top" onClick={() => handleOnClick(p)} />

                                                    }
                                                        <div className="card-footer h-25 d-flex justify-content-between">
                                                            <p className="card-title" >{p.playlistName}</p>
                                                            <div className="btn-group dropend">
                                                                    <button className="btn btn-dark shadow-none" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                                                        <i className="fa fa-ellipsis-h" style={{ fontSize: "15px", color: "grey", cursor: "pointer" }}></i>
                                                                    </button>
                                                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                                                        <li><Link className="dropdown-item" to="/yourplaylist" onClick={() => handleDeleteClick(p._id)}>Delete Playlist</Link></li>
                                                                        <li><Link className="dropdown-item" to="/">Add Song</Link></li>
                                                                    </ul>
                                                                </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>

                            </div>



                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
