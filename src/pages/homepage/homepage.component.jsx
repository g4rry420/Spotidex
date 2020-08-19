import React, { useContext, useRef, useEffect, useState } from 'react'

import "./homepage.styles.css"
import { MainContext } from '../../context/mainContext/mainContext'
import { myPlaylistTracks, fetchAnything } from "../../api-fetching/api-fetching"
import TracksList from '../../components/tracks-list/tracks-list.component';

export default function Homepage() {
    const [likedSongs, setLikedSongs] = useState(null);
    const { token,userPlaylist, setUserPlaylistTracks, userPlaylistTracks } = useContext(MainContext);

    const list = useRef();

    if(!likedSongs){
        fetchAnything(token, "https://api.spotify.com/v1/me/tracks?limit=50", setLikedSongs)
    }

    if(userPlaylist){
        list.current = new Array(userPlaylist.length);
        if(!userPlaylistTracks) {
            myPlaylistTracks(token, userPlaylist[0].id, setUserPlaylistTracks);
        }
    }

    useEffect(() => {
        if(!list.current) return;
        if(!userPlaylistTracks) return;

        list.current.filter(li => li.classList.remove("active-list"));

        const currentList = list.current.filter(li => li.id === userPlaylistTracks.id);
        currentList[0].classList.add("active-list");

    }, [userPlaylistTracks])

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-3 left-homepage">
                    <aside>
                        <div className="d-flex justify-content-between font-weight-bold playlist-title">
                            <span>My Playlist</span>
                            <div>
                                <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-plus-square-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4a.5.5 0 0 0-1 0v3.5H4a.5.5 0 0 0 0 1h3.5V12a.5.5 0 0 0 1 0V8.5H12a.5.5 0 0 0 0-1H8.5V4z"/>
                                </svg>
                            </div>
                        </div>
                        <ul className="playlist-list-container">
                        {
                            userPlaylist ? userPlaylist.map((item, idx) =>  {
                                return(
                                <li ref={el => list.current[idx] = el} id={item.id} className="" key={item.id} 
                                    onClick={() => myPlaylistTracks(token, item.id, setUserPlaylistTracks)}>
                                    <div>
                                        <img src={item.images[0].url} alt="item"/>
                                        <p> {item.name} </p>
                                    </div>
                                </li>
                            )}) : <p>Loading..</p>
                        }
                        </ul>
                    </aside>
                </div>
                {
                    userPlaylistTracks ? <TracksList tracks={userPlaylistTracks.items} /> : (
                        <p className="col-md-7"> Loading... </p>
                    )
                }
                <div className="col-md-3 right-homepage">
                    right
                </div>
            </div>
        </div>
    )
}