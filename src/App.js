import React, { useContext } from 'react';
import { Route } from "react-router-dom";

import './App.css';
import Discover from "./pages/discover/discover.component"
import Header from './components/header/header.component';
import Login from './components/login/login.component';
import { MainContext } from './context/mainContext/mainContext';
import Homepage from './pages/homepage/homepage.component';
import Artist from './pages/artist/artist.component';
import AlbumTracks from './pages/album-tracks/album-tracks.component';
import NewReleases from './pages/new-releases/new-releases.component';
import SearchPage from './pages/search-page/search-page.component';
import PlaylistTracks from './pages/playlist-tracks/playlist-tracks.component';
import Toastify from './components/toastify/toastify.component';

function App() {
  const { token ,songAddedToPlaylist ,deletedSong  } = useContext(MainContext);

  return (
    <div className="App">
    {
      (token) ? <>
                  <Header/>
                 { (!!songAddedToPlaylist || !!deletedSong) ? <Toastify /> : null}
                  <Route exact path="/" component={Homepage} />
                  <Route path="/discover" component={Discover} />
                  <Route path="/artist/:artist_id" component={Artist} />
                  <Route path="/album/:album_id" component={AlbumTracks} />
                  <Route path="/new-releases" component={NewReleases} />
                  <Route path="/search/:query" component={SearchPage} />
                  <Route path="/playlist/:playlist_id" component={PlaylistTracks} />
                </>
      : <Login />
    }
    </div>
  );
}

export default App;
