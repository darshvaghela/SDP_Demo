import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, useNavigate, Switch, Route, Link } from 'react-router-dom';

export default function Playlists() {
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
            <div className="container">
                <Link to="/createplaylist">
                    <button className="btn btn-success  my-4 mx-auto">+ Create PlayList</button>
                </Link>
            </div>
            <div>
            </div>
        </div>
    )
}
