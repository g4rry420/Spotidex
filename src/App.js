import React, { useContext } from 'react';
import { Route } from "react-router-dom";

import './App.css';
import Discover from "./pages/discover/discover.component"
import Header from './components/header/header.component';
import Login from './components/login/login.component';
import { MainContext } from './context/mainContext/mainContext';
import Homepage from './pages/homepage/homepage.component';
import DiscoverPlaylistTracks from './pages/discover-playlist-tracks/discover-playlist-tracks.component';
import Switch from 'react-bootstrap/esm/Switch';

function App() {
  const { token } = useContext(MainContext)

  return (
    <div className="App">
    {
      (token) ? <>
                  <Header/>
                  <Switch>
                    <Route exact path="/" component={Homepage} />
                    <Route path="/discover" component={Discover} />
                  </Switch>
                    <Route path="/discover/:category_id/:tracks_id" component={DiscoverPlaylistTracks} />
                </>
      : <Login />
    }
    </div>
  );
}

export default App;
