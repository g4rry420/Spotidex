import React, { useContext } from 'react';
import { Route, Switch } from "react-router-dom";

import './App.css';
import Discover from "./pages/discover/discover.component"
import Header from './components/header/header.component';
import Login from './components/login/login.component';
import { MainContext } from './context/mainContext/mainContext';
import Homepage from './pages/homepage/homepage.component';
import Artist from './pages/artist/artist.component';
import AlbumTracks from './pages/album-tracks/album-tracks.component';

function App() {
  const { token } = useContext(MainContext)

  return (
    <div className="App">
    {
      (token) ? <>
                  <Header/>
                  <Route exact path="/" component={Homepage} />
                  <Route path="/discover" component={Discover} />
                  <Route path="/artist" component={Artist} />
                  <Route path="/album/:album_id" component={AlbumTracks} />
                </>
      : <Login />
    }
    </div>
  );
}

export default App;
