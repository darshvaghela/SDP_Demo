import react, { useState } from 'react'
import SignUP from './Componets/Account/SignUP';
import UserProvider from './Componets/Contexts/user/UserProvider';
import { Route, Routes } from "react-router-dom";
import Home from './Componets/Home';
import SignIn from './Componets/Account/SignIn';
import ResetPassword from './Componets/Account/ResetPassword';
import storage from './Componets/fire';
import Play from './Componets/ManageSong/Play';
import ManageSong from './Componets/ManageSong/ManageSong';
import EditSong from './Componets/ManageSong/EditSong'

function App() {
 
  return (
    
    <UserProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUP />} />
        <Route path="/song" element={<Play/>} />
        <Route path="/ResetPassword" element={<ResetPassword />} />
        <Route path="/managesong" element={<ManageSong />} />
        <Route path="/editsong" element={<EditSong />} />


      </Routes>

    </UserProvider>
  );
}

export default App;
