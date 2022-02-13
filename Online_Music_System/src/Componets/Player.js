import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, useNavigate, Switch, Route, Link, useLocation, useParams } from 'react-router-dom';
import Navbar from './Navbar';
import AudioPlayer from 'react-h5-audio-player';
import ReactAudioPlayer from 'react-audio-player';
import { Video, DefaultUi } from '@vime/react';
import './custom.css';
import 'react-h5-audio-player/lib/styles.css';



export default function Player() {
    const location = useLocation();
    const [song, setSong] = useState([])

    console.log(location.state.id);
    const fetchById = async () => {
        let response = await fetch(`http://localhost:4099/song/fetchbyid/${location.state.id}`,
            {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            }
        );
        response = await response.json();
        setSong(response.song)
        console.log(song)
        return response;
    }
    let url = song.songLink
    useEffect(() => {
        fetchById();
    }, [])


    return <div className="bg-dark text-light">
        <Navbar />
        <div className="container my-4">
            <div className="d-flex">
                <div className="mx-4">
                    <img src={song.imageLink} className="rounded" />
                </div>
                <div className="d-flex flex-column justify-content-center my-4">
                    <span className="display-5 mb-2" style={{ "font-family": "Mochiy Pop P One, sans-serif" }}>{song.songName}</span>
                    {
                        (song.movieName != "AlbumSong") ?
                            <span className="">From "{song.movieName}"</span> : <span></span>

                    }
                    <span className="">{song.singerName}</span>
                </div>
            </div>

            <AudioPlayer className="my-4"
                autoPlay
                src={url}
                onPlay={e => console.log("onPlay")}
            />

        </div>
    </div >
}
