import React, { useState, useEffect } from 'react'
import Navbar from '../Navbar';
import { BrowserRouter as Router, useNavigate, Switch, Route, Link, useLocation, useParams } from 'react-router-dom';



export default function EditSong() {
    const location = useLocation();
    // const [song, setSong] = useState("");
    // const [progress, setProgress] = useState(0)
    // const [data, setData] = useState({ songName: "", movieName: "", singerName: "" });
    const id = location.state.id;
    const [song, setSong] = useState({id:"", songName: "", movieName: "", singerName: "" })
    
    
    const fetchById = async () => {
        let response = await fetch(`http://localhost:4099/song/fetchbyid/${id}`,
            {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            }
        );
        response = await response.json();
        setSong({ 
            id:id,
            songName:response.song.songName, 
            movieName:response.song.movieName, 
            singerName:response.song.singerName
        })
        return response;
    }
    const editSong = async () => {
        let response = await fetch("http://localhost:4099/song/editsong",
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(song)
            }
        );
        response = await response.json();
        return response;
    }

    useEffect(() => {
        fetchById();
    }, [])
    const handleOnChange = (event) => {
        setSong({ ...song, [event.target.name]: event.target.value });
        
    }
    
    return (
        <div>
            <Navbar />
            <div className="container my-4" >
                <h2>Edit Song</h2>
                <hr />
                <h1>{id}</h1>
                <div className="mb-3 row my-4">
                    <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Song Name</label>
                    <div className="col-sm-10">
                        <input type="text" name="songName" className="form-control w-50" value={song.songName} onChange={handleOnChange} aria-label="songName" aria-describedby="basic-addon1" />
                    </div>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Movie Name</label>
                    <div className="col-sm-10">
                        <input type="text" name="movieName" className="form-control w-50" value={song.movieName} onChange={handleOnChange} aria-label="movieName" aria-describedby="basic-addon1" />
                    </div>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Singer</label>
                    <div className="col-sm-10">
                        <input type="text" name="singerName" className="form-control w-50" value={song.singerName} onChange={handleOnChange} aria-label="singerName" aria-describedby="basic-addon1" />
                    </div>
                </div>

                <Link to="/managesong" >
                    <button type="button" className="btn btn-dark  mb-4 mx-auto" onClick={editSong} >Edit</button>
                </Link>
            </div>
        </div>
    )
}
