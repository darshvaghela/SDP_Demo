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
import Search from './Componets/Search'
import CreatePlaylist from './Componets/ManagePlaylist/CreatePlaylist'
function App() {
 
  return (
    
    <UserProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUP />} />
        <Route path="/addsong" element={<AddSong/>} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/admin/songs" element={<Admin />} />
        <Route path="/admin/playlists" element={<Admin />} />

        <Route path="/editsong" element={<EditSong />} />
        <Route path="/player" element={<Player />} />
        <Route path="/songs" element={<SongForGenre />} />
        <Route path="/search" element={<Search />} />
        <Route path="/createplaylist" element={<CreatePlaylist />} />


      </Routes>

    </UserProvider>
  );
}

export default App;
