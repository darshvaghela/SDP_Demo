import React, { useState } from 'react'
import { BrowserRouter as Router, useNavigate, Switch, Route, Link, useLocation, useParams } from 'react-router-dom';
import Sidebar from '../Sidebar';
import Navbar from '../Navbar'
import playlisticon from '../../static/playlist-icon.png';


export default function UserPlaylists(props) {
  const nav = useNavigate();
  const account = JSON.parse(localStorage.getItem("account"))

  const [create, setCreate] = useState(false);
  const [playlistName, setPlaylistName] = useState("");


  const handleOnChange = (event) => {
    setPlaylistName(event.target.value)
  }
  const handleOnClick = async () => {
    let response = await fetch(`http://localhost:4099/playlist/createplaylistbyuser`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'token': account.token },
        body: JSON.stringify({ playlistName, songId: props.currentSong._id })
      }
    );
    response = await response.json();
    if (response.success) {
      window.alert("playlist created")
      // nav('/admin/songs')
    }
  }
  const handleToggle = () => {
    setCreate(true)
  }
  if (!props.currentSong)
    nav('/')
  return (
    <>
        <div className="container-fluid w-100 min-vh-100 bg-dark">
          <div className="row h-100">
            <div className="col-2 p-0 h-100 position-fixed" style={{ backgroundColor: "black" }}>
              <Sidebar currentSong={props.currentSong} />
            </div>
            <div className="col-10 offset-2 p-0 h-100 ">
              <Navbar />
              <div className="container text-light">
                <div className="my-2">
                  <h2>Create new Playlist</h2>
                  <hr />
                  {!create ?
                    <div>

                      <div className="row row-cols-6 g-4 mb-3">
                        <div className="col">
                          <div className="card h-100 text-light mycard" onClick={handleToggle}>
                            <img src={playlisticon} className="card-img-top bg-success" />
                            <div className="card-footer h-25">
                              <p className="card-title" >New Playlist</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    :
                    <div>
                      <div className="form-group d-flex align-items-center mx-sm-3 mb-2">
                        <input type="text" className="form-control w-25 me-4" value={playlistName} onChange={handleOnChange} placeholder="Playlist Name" />
                        <button type="submit" className="btn btn-success" onClick={handleOnClick}>Create</button>
                      </div>
                    </div>
                  }
                </div>

              </div>
            </div>

          </div>

        </div>
    </>
  )
}
