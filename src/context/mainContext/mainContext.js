import React,{ createContext, useState,useEffect } from 'react'

import { getCategories, myPlaylist } from "../../api-fetching/api-fetching"


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
    const redirectUri = "http://localhost:3000/";
    const scopes = [
    "user-read-currently-playing",
    "user-read-playback-state",
    ];
    
    const [token, setToken] = useState(null);
    const [discover, setDiscover] = useState(null);
    const [discoverPlaylist, setDiscoverPlaylist] = useState(null);
    const [discoverPlaylistTracks, setDiscoverPlaylistTracks] = useState(null);

    const [userPlaylist, setUserPlaylist] = useState(null);
    const [ userPlaylistTracks ,setUserPlaylistTracks] = useState(null);

    useEffect(() => {
        let _token = hash.access_token;
        console.log(_token)
        setToken(_token);
        getCategories(token, setDiscover);
        myPlaylist(token, setUserPlaylist);

    }, [token])


    return (
        <MainContext.Provider 
            value={{ discoverPlaylistTracks, setDiscoverPlaylistTracks,userPlaylistTracks, setUserPlaylistTracks, userPlaylist,discoverPlaylist,setDiscoverPlaylist,discover,setDiscover, token,setToken, authEndPoint, clientId, redirectUri, scopes }}>
            {props.children}
        </MainContext.Provider>
    )
}

export default MainContextProvider