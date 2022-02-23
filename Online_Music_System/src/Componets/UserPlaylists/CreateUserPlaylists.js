import React from 'react'
import Sidebar from '../Sidebar'
import Navbar from '../Navbar'



export default function CreateUserPlaylists(props) {
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
                <h2>Create New Playlist</h2>
                <hr />
                <div>
                  <form className="form-inline">
                    <div className="form-group d-flex align-items-center mx-sm-3 mb-2">
                      <input type="password" className="form-control w-25 me-4" id="inputPassword2" placeholder="Playlist Name" />
                      <button type="submit" className="btn btn-success">Create</button>
                    </div>
                  </form>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </>
  )
}
