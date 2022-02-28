import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, useNavigate, Switch, Route, Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar'

export default function Search(props) {

  const nav = useNavigate();
  const [songs, setSongs] = useState([])
  const [query, setQuery] = useState("")
  const [searchResult, setSearchResult] = useState([])

  const fetchSongs = async () => {
    let response = await fetch(`http://localhost:4099/song/fetchallsongs/${"all"}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }
    );
    response = await response.json();
    if (response.success) {
      setSongs(response.songs)
    }
  }

  const handleSearch = (event) => {
    setQuery(event.target.value)
    setSearchResult(k => {
      if (event.target.value.length === 0)
        return []
      return songs.filter(s => s.songName.toLowerCase().includes(event.target.value.toLowerCase()));
    })
  }

  const navigateWithId = (id) => {
    nav('/player', { state: { id: id } })
  }

  useEffect(() => {
    fetchSongs();
  })

  return (
    <div className="container-fluid w-100 bg-dark min-vh-100">
      <div className="row h-100">
        <div className="col-2 p-0 h-100 position-fixed" style={{ backgroundColor: "black" }}>
          <Sidebar currentSong={props.currentSong} />
        </div>
        <div className="col-10 p-0 offset-2 h-100">
          <Navbar search={<input onChange={handleSearch} value={query} className="form-control ms-2 h-75 my-auto rounded-pill" type="text" placeholder="Search" style={{ width: "500px" }} />} />
          <div style={props.currentSong ? { height: '81vh', overflow: 'auto' } : { height: '92.48vh', overflow: 'auto' }} >
            <div className="container">
              <div className="d-flex align-items-center">
                <h3 className="my-3 text-light">Top Results</h3>
              </div>
              <div className="row row-cols-6 g-4 mb-4">
                {
                  searchResult.map((s) => {
                    return (
                      <div className="col" key={s._id}>
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
          </div>
        </div>
      </div>
    </div>
  )
}
