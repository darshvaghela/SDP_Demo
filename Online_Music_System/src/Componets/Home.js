import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import './custom.css'
import { BrowserRouter as Router, useNavigate, Switch, Route, Link } from 'react-router-dom';
import Sidebar  from './Sidebar';

export default function Home() {
    const [songsByGenre, setSongsByGenre] = useState(new Map())
    const genres = ["Punjabi", "Bollywood", "Romance", "Indian-Classical", "Holiday", "Netflix", "Party", "Instrumental", "Workout", "Rock", "Jazz", "Pop", "Hip-Hope and Rap"];

    const fetchSongs = async () => {
        let response = await fetch(`http://localhost:4099/song/fetchallsongs/${"all"}`,
            {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },

            }
        );
        response = await response.json();

        if (response.success) {
            let temp = new Map()
            for (let i = 0; i < genres.length; i++) {
                var count = 0;
                let t = []
                for (let j = 0; j < response.songs.length; j++) {
                    if (response.songs[j].genre == genres[i] && count < 6) {
                        t.push(response.songs[j])
                        count++
                    }
                }
                temp.set(genres[i], t);
            }
            setSongsByGenre(temp)
        }
        return response;
    }
    const nav = useNavigate();

    const navigateWithId = (id) => {
        nav('/player', { state: { id: id } })
    }

    const navigateWithGenre = (genre) => {
        nav('/songs', { state: { genre: genre } })
    }

    useEffect(() => {
        fetchSongs();
    }, [])

    return (
        <div>
            <div className="container-fluid w-100">
                <div className="row h-100">
                    <div className="col-2 p-0 h-100 position-fixed sidebar" style={{ backgroundColor: "black"}}>
                       <Sidebar />
                    </div>
                    <div className="col-10 offset-2 p-0 h-100 ">
                        <Navbar />
                        {
                            [...songsByGenre.keys()].map(g => {
                                if (songsByGenre.get(g).length != 0)
                                    return (
                                        <>
                                            <div className="container">
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <h3 className="my-3">{g}</h3>
                                                    <span onClick={() => navigateWithGenre(g)} className="hovereffect" style={{letterSpacing:1}}>See All</span>
                                                </div>
                                                <div className="row row-cols-6 g-4">
                                                    {
                                                        songsByGenre.get(g).map((s) => {
                                                            return (
                                                                <div className="col">
                                                                    <div className="card h-100 text-light mycard" onClick={() => navigateWithId(s._id)}>
                                                                        <img src={s.imageLink} className="card-img-top" />
                                                                        <div className="card-footer h-25">
                                                                            <p className="card-title" >{s.songName}</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </div>
                                        </>
                                    )
                            })
                        }
                    </div>
                </div>


            </div>
        </div>
    )
}
