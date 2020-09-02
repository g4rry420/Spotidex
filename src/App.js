import React, { useContext, Suspense, lazy } from 'react';
import { Route } from "react-router-dom";

import './App.css';
import Header from './components/header/header.component';
import { MainContext } from './context/mainContext/mainContext';
import Toastify from './components/toastify/toastify.component';
import DualRing from './components/dual-ring-spinner/dual-ring-spinner.component';
import ErrorBoundary from './components/error-boundary/error-boundary.component';

const Discover = lazy(() => import("./pages/discover/discover.component"));
const Login = lazy(() => import('./components/login/login.component'));
const Homepage = lazy(() => import('./pages/homepage/homepage.component'));
const Artist = lazy(() => import("./pages/artist/artist.component"));
const NewReleases = lazy(() => import('./pages/new-releases/new-releases.component'));
const SearchPage = lazy(() => import('./pages/search-page/search-page.component'));
const TracksPage = lazy(() => import('./reusable/tracks-page/tracks-page.component'));


function App() {
  const { token ,songAddedToPlaylist ,deletedSong, createPlaylist, playlistTracks, albumTracks  } = useContext(MainContext);

  return (
    <div className="App">
    {
      (token) ?
                <ErrorBoundary>
                    <Header/> 
                  { (!!songAddedToPlaylist || !!deletedSong || !!createPlaylist) ? <Toastify /> : null}

                  <Suspense fallback={<div className="container"> <div className="text-center"> <DualRing /> </div> </div>}>
                    <Route exact path="/" component={Homepage} />
                    <Route path="/discover" component={Discover} />
                    <Route path="/artist/:artist_id" component={Artist} />
                    <Route path="/album/:album_id" render={(props) => <TracksPage trackPage={albumTracks} {...props} />} />
                    <Route path="/new-releases" component={NewReleases} />
                    <Route path="/search/:query" component={SearchPage} />
                    <Route path="/playlist/:playlist_id" render={(props) => <TracksPage trackPage={playlistTracks} {...props} />} />
                  </Suspense>
                </ErrorBoundary>
      : 
      (
        <ErrorBoundary>
          <Suspense fallback={<div className="container"> <div className="text-center"> <DualRing /> </div> </div>}>
            <Login />
          </Suspense>
        </ErrorBoundary>
      )
    }
    </div>
  );
}

export default App;
