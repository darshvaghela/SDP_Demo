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
      return songs.filter(s => {
        if (s.songName.toLowerCase() === event.target.value.toLowerCase())
          return true
        else if (s.songName.toLowerCase().startsWith(event.target.value.toLowerCase()))
          return true
        else if (s.singerName.toLowerCase().includes(event.target.value.toLowerCase()))
          return true
        else
          return false
      });
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
              {searchResult.length > 0 &&
                <div className="row mb-4">
                  <div className="col-4">
                    <h3 className="my-3 text-light">Top Results</h3>
                    <div className="text-light p-3 search-top" style={{height:'215px'}} onClick={() => navigateWithId(searchResult[0]._id)}>
                      <img src={searchResult[0].imageLink} className="w-25" />
                      <div className="d-flex flex-column mt-4 text-light">
                        <div className="mb-2">
                          <span className="me-2" style={{ fontFamily: "Mochiy Pop P One, sans-serif", fontSize: "20px" }}>{searchResult[0].songName}</span>
                          {
                            (searchResult[0].movieName != "AlbumSong") ?
                              `(From "${searchResult[0].movieName}")` : ""
                          }
                        </div>
                        <small>{searchResult[0].singerName.split(',').join(' ● ')}</small>
                      </div>
                    </div>
                  </div>
                  <div className="col-8">
                    <h3 className="my-3 text-light">Songs</h3>
                    <div className="text-light d-flex flex-column" style={{height:'215px',overflowY: 'auto'}}>
                      {searchResult.map(s =>
                        <div className="d-flex align-items-center py-1 px-2 search-item" onClick={() => navigateWithId(s._id)}>
                          <img src={s.imageLink} className="me-2" style={{ width: "40px", height: "40px" }} />
                          <div className="d-flex flex-column">
                            <span className="fw-bold">{s.songName}</span>
                            <small className="text-muted">{s.singerName}</small>
                          </div>
                        </div>
                      )
                      }
                    </div>

                  </div>
                </div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
