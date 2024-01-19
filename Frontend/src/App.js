import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav.js';
import Footer from './components/Footer.js';
import Container from './components/Container.js';
import MovieComponent from './components/cataloges/MovieComponent.js';
import SportComponent from './components/cataloges/SportComponent.js';
import MusicComponent from './components/cataloges/MusicComponent.js';
import Profile from './components/Profile/Profile.js';
import Register from './components/Profile/Register.js';
import Tickets from './components/Profile/Tickets.js';
import Logout from './components/Profile/Logout.js';
import Longin from './components/Profile/Login.js';
import PrivateComponent from './components/PrivateComponent.js';
import TicketDetails from './components/TicketDetails.js';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />

        <Routes>
          <Route element = { <PrivateComponent />}>
          {/* <Route path="/" element={<Container />} /> */}
          <Route path="/Movies" element={<MovieComponent />} />
          <Route path="/Music" element={<MusicComponent />} />
          <Route path="/Sport" element={<SportComponent />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Tickets" element={<Tickets />} />
          <Route path="/Logout" element={<Logout />} />
          <Route path="/ticket/:id" element={<TicketDetails />} />
          </Route>
          <Route path="/register" element={<Register />} />
          <Route path="/signin" element={<Longin />} />

        </Routes>
        
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
