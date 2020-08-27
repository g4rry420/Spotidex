import React,{ createContext, useState,useEffect } from 'react'

import { myPlaylist, fetchAnything } from "../../api-fetching/api-fetching"


// Get the hash of the url
const hash = window.location.hash
.substring(1)
.split("&")
.reduce(function(initial, item) {
    if (item) {
    var parts = item.split("=");
    initial[parts[0]] = decodeURIComponent(parts[1]);
    }
    return initial;
}, {});

window.location.hash = "";

export const MainContext = createContext();

const MainContextProvider = (props) => {
    const authEndPoint = 'https://accounts.spotify.com/authorize?';

    // Replace with your app's client ID, redirect URI and desired scopes
    const clientId = "5c4e46e8acf24386bfe22be91378ff14";
    let redirectUri = "";
    if(process.env.NODE_ENV === "development") {
        redirectUri += "http://localhost:3000/";
    }
    const scopes = [
        "streaming", "user-read-email", "user-read-private",
        "user-read-currently-playing",
        "user-read-playback-state",
        "user-library-read",
        "playlist-read-collaborative",
        "playlist-read-private"
    ];
    
    const [token, setToken] = useState(null);


    const [currentUser, setCurrentUser] = useState(null);

    const [discover, setDiscover] = useState(null);
    const [discoverPlaylist, setDiscoverPlaylist] = useState(null);
    const [discoverPlaylistTracks, setDiscoverPlaylistTracks] = useState(null);

    const [userPlaylist, setUserPlaylist] = useState(null);
    const [ userPlaylistTracks ,setUserPlaylistTracks] = useState(null);
    
    const [artistInfo, setArtistInfo] = useState(null);

    const [albumTracks, setAlbumTracks] = useState(null);

    const [newReleases, setNewReleases] = useState(null);
    const [newReleasesTracks, setNewReleasesTracks] = useState(null);

    const [searchResult, setSearchResult] = useState(null);
    const [searchValue, setSearchValue] = useState("");

    const [playlistTracks, setPlaylistTracks] = useState(null);



    useEffect(() => {
        let _token = hash.access_token;
        setToken(_token);
        fetchAnything(token, "https://api.spotify.com/v1/me", setCurrentUser);

    }, [token])


    useEffect(() => {
        if(currentUser){
            myPlaylist(token, setUserPlaylist, currentUser.id);
        }

    }, [currentUser, token])


    return (
        <MainContext.Provider 
            value={{ currentUser,playlistTracks, setPlaylistTracks ,searchValue, setSearchValue,searchResult, setSearchResult,newReleasesTracks, setNewReleasesTracks ,newReleases, setNewReleases ,albumTracks, setAlbumTracks,artistInfo, setArtistInfo,discoverPlaylistTracks, setDiscoverPlaylistTracks,userPlaylistTracks, setUserPlaylistTracks, userPlaylist,discoverPlaylist,setDiscoverPlaylist,discover,setDiscover, token,setToken, authEndPoint, clientId, redirectUri, scopes }}>
            {props.children}
        </MainContext.Provider>
    )
}

export default MainContextProvider