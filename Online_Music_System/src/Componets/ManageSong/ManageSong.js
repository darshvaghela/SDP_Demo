import React, { useState, useEffect } from 'react'
import Navbar from '../Navbar'
import { BrowserRouter as Router, useNavigate, Switch, Route, Link } from 'react-router-dom';

export default function ManageSong() {
    const [song, setSong] = useState([])
    const [sname, setSname] = useState()
    const fetchSong = async () => {
        let response = await fetch(`http://localhost:4099/song/fetchallsongs/${"all"}`,
            {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },

            }
        );
        response = await response.json();

        if (response.success) {
            setSong(response.songs);
        }
        return response;
    }

    const handleOnClick = async (id) => {

        let response = await fetch("http://localhost:4099/song/deletesong",
            {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id })
            }
        );
        response = await response.json();
        fetchSong();
        return response;

    }
    const nav = useNavigate();

    const navigate = (id) => {
        nav('/editsong', { state: { id: id } })
    }

    useEffect(() => {
        const account = JSON.parse(localStorage.getItem("account"))
        if (!account) {

            nav('/signin')
        }
        if (account && account.user.isAdmin === false) {
            nav('/')
        }
        fetchSong();
    }, [])
    return (
        <div>
            <Navbar />
            <div className="container">
                <Link to="/song" >
                    <button className="btn btn-success  my-4 mx-auto">+ Add New Song</button>
                </Link>
                <hr />


                <table className="table table-dark table-hover text-muted">
                    <thead>
                        <tr>
                            <th className="text-light">#</th>
                            <th className="text-light">Song Name</th>
                            <th className="text-light">Artist</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>

                        {song.map((s, index) => {

                            return (
                                <tr key={s._id}>
                                    <td>{index + 1}</td>
                                    <td scope="row">{s.songName}</td>
                                    <td>{s.singerName}</td>
                                    <td><button className="btn btn-link link-danger text-decoration-none p-0 btn shadow-none" onClick={() => handleOnClick(s._id)} >Delete</button></td>
                                    <td><button className="btn btn-link link-success text-decoration-none p-0 btn shadow-none" onClick={() => navigate(s._id)} >Edit</button></td>

                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
