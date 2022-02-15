import React from 'react'
import Sidebar  from './Sidebar';
import Navbar from './Navbar'

export default function Search() {
  return (
    <div>
        <div className="container-fluid w-100">
                <div className="row h-100">
                    <div className="col-2 p-0 h-100 position-fixed sidebar" style={{ "backgroundColor": "black" }}>
                       <Sidebar />
                    </div>
                    <div className="col-10 offset-2 p-0 h-100 ">
                        <Navbar />
                        
                    </div>
                </div>


            </div>
    </div>
  )
}
