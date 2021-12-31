import React, { useState } from 'react'
import storage from './fire'

export default function Play() {
    const [song, setSong] = useState('');
    const [url, setUrl] = useState([]);
    const [data, setData] = useState([])
    const upload = () => {
        if (song == null)
            return;
        storage.ref(`/songs/${song.name}`).put(song)
            .on("state_changed", alert("success"), alert);
        

    }
    const getlink=()=> {
        storage.ref("songs").child(song.name).getDownloadURL()
            .then((url) => {
                setUrl(url);
                console.log(url)
           
            })
    }

    // const listALL = () => {
    //     storage.ref().child('/songs').listAll().getDownloadURL()
    //         .then(res => {
    //             res.items.forEach((item) => {
    //                 setData(arr => [...arr, item.name]);
    //             })
    //         })
    //         .catch(err => {
    //             alert(err.message);
    //         })

    // }
    let audio = new Audio(url)
    const Play = () => {

        audio.play()
    }
    const Pause = () => {

        audio.pause()
    }

    return (
        <div>
            <div className="App">
                <center>
                    <input type="file" onChange={(e) => { setSong(e.target.files[0]) }} />
                    <button onClick={upload}>Upload</button>
                    {/* <button onClick={listALL}>ListALL</button> */}
                    <button onClick={getlink}>getlink</button>
                    <button onClick={Play}>play</button>
                    <button onClick={Pause}>Pause</button>
                </center>
                {
                    data.map((val) => (
                        <h2>{val}</h2>
                    ))
                }
            </div>
        </div>
    )
}
