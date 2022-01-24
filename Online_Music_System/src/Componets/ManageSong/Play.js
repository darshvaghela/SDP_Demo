import React, { useState } from 'react'
import storage from '../fire'
import ProgressBar from "@ramonak/react-progress-bar";
import Navbar from '../Navbar';
import { BrowserRouter as Router, useNavigate, Switch, Route, Link } from 'react-router-dom';



export default function Play() {
    const [song, setSong] = useState("");
    const [url, setUrl] = useState([]);
    const [data, setData] = useState({ songName: "", movieName: "", singerName: "", link: "" });

    const [progress, setProgress] = useState(0)
    const upload = () => {
        const uploadTask = storage.ref(`/songs/${song.name}`).put(song);
        uploadTask.on(
            "state_changed",
            snapshot => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress);
            },
            error => {
                console.log(error);
            },
            () => {
                storage
                    .ref("songs")
                    .child(song.name)
                    .getDownloadURL()
                    .then(url => {
                        setUrl(url);
                        setData({ link: url })
                        console.log(url)
                    });
            }
        );

    }
    const handleOnChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    }
    const addSong = async () => {
        let response = await fetch("http://localhost:4099/song/addsong",
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            }
        );
        response = await response.json();
        if (response.success) {
            setData({ songName: "", movieName: "", singerName: "", link: "" })
            setProgress(0)
            setSong([0])
        }
        return response;
    }


    return (


        <div>
            <Navbar />
            <div className="container my-4" >
                <h2>Add Song</h2>
                <hr />
                <div className="row">
                    <div className="col-5">
                        <input type="file" className="form-control" onChange={(e) => { setSong(e.target.files[0]) }} />
                    </div>
                    <div className="col-4 mx-2">
                        <ProgressBar completed={progress} bgColor="blue" className="w-75" />
                    </div>
                    <div className="col-2">
                        <button className="btn btn-primary rounded" onClick={upload}>Upload</button>
                    </div>
                </div>

                <div className="mb-3 row my-4">
                    <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Song Name</label>
                    <div className="col-sm-10">
                        <input type="text" name="songName" className="form-control w-50" value={data.songName} onChange={handleOnChange} aria-label="songName" aria-describedby="basic-addon1" />
                    </div>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Movie Name</label>
                    <div className="col-sm-10">
                        <input type="text" name="movieName" className="form-control w-50" value={data.movieName} onChange={handleOnChange} aria-label="movieName" aria-describedby="basic-addon1" />
                    </div>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Singer</label>
                    <div className="col-sm-10">
                        <input type="text" name="singerName" className="form-control w-50" value={data.singerName} onChange={handleOnChange} aria-label="singerName" aria-describedby="basic-addon1" />
                    </div>
                </div>

                <Link to="/managesong" >
                    <button type="button" className="btn btn-dark  mb-4 mx-auto" onClick={addSong}>Add</button>
                </Link>
            </div>



        </div>



    )
}
