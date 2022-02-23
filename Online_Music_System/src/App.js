import react, { useState } from 'react'
import SignUP from './Componets/Account/SignUP';
import UserProvider from './Componets/Contexts/user/UserProvider';
import { Route, Routes } from "react-router-dom";
import Home from './Componets/Home';
import SignIn from './Componets/Account/SignIn';
import ResetPassword from './Componets/Account/ResetPassword';
import storage from './Componets/fire';
import AddSong from './Componets/ManageSong/AddSong';
import Admin from './Componets/Admin';
import EditSong from './Componets/ManageSong/EditSong'
import Player from './Componets/Player';
import SongForGenre from './Componets/SongForGenre'
// import Search from './Componets/Search'
import CreatePlaylist from './Componets/ManagePlaylist/CreatePlaylist'
import UserPlaylists from './Componets/UserPlaylists/UserPlaylists'
import CreateUserPlaylists from './Componets/UserPlaylists/CreateUserPlaylists'

import AudioPlayer from 'react-h5-audio-player';


export default function App() {
  const [currentSong, setCurrentSong] = useState(null);

  return (
    <>
      <div className="h-100">
        <UserProvider>
          <Routes>
            <Route path="/admin/addsong" element={<AddSong />} />
            <Route path="/admin/songs" element={<Admin setCurrentSong={setCurrentSong} />} />
            <Route path="/admin/playlists" element={<Admin setCurrentSong={setCurrentSong} />} />
            <Route path="/admin/editsong" element={<EditSong />} />
            <Route path="/admin/createplaylist" element={<CreatePlaylist />} />

            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUP />} />
            <Route path="/resetpassword" element={<ResetPassword />} />

            <Route path="/" element={<Home currentSong={currentSong} />} />
            <Route path="/player" element={<Player currentSong={currentSong} setCurrentSong={setCurrentSong} />} />
            <Route path="/songs" element={<SongForGenre currentSong={currentSong} />} />
            {/* <Route path="/search" element={<Search />} /> */}
            <Route path="/playlist" element={<UserPlaylists currentSong={currentSong}/>}/>
            <Route path="/user/createplaylist" element={<CreateUserPlaylists currentSong={currentSong}/>}/>




          </Routes>
          <div style={{ position: 'fixed', width: '100%', bottom: '0' }}>
            {currentSong &&
              <AudioPlayer
                autoPlay
                src={currentSong.songLink}
                onPlay={e => console.log("onPlay")}
              />
            }
          </div>
        </UserProvider>
      </div>
    </>
  );
}

