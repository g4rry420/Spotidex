import React, { useContext, useRef, useEffect } from 'react'
import { v4 as uuidv4 } from "uuid";

import "./homepage.styles.css"
import { MainContext } from '../../context/mainContext/mainContext'
import { myPlaylistTracks, fetchAnything } from "../../api-fetching/api-fetching"

export default function Homepage() {
    const { token, userPlaylist, setUserPlaylistTracks, userPlaylistTracks } = useContext(MainContext);

    const list = useRef();
    if(userPlaylist){
        list.current = new Array(userPlaylist.length);
    }

    useEffect(() => {
        if(!list.current) return;

        list.current.filter(li => li.classList.remove("active-list"));

        const currentList = list.current.filter(li => li.id === userPlaylistTracks.id);
        currentList[0].classList.add("active-list");

    }, [userPlaylistTracks])
    console.log(userPlaylistTracks)

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-3">
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
                                    <a>
                                        <img src={item.images[0].url} alt="item"/>
                                        <p> {item.name} </p>
                                    </a>
                                </li>
                            )}) : <p>Loading..</p>
                        }
                        </ul>
                    </aside>
                </div>
                <div className="col-md-7 center">
                    <ul className="center-list-container">
                    {
                        userPlaylistTracks ? userPlaylistTracks.items.map(item => (
                            <li key={uuidv4()} className="mb-2 p-2">
                                <div className="img-wrapper">
                                    <img src={item.track.album.images[1].url} alt="song"/>
                                </div>
                                <div className="song-content ml-2">
                                    <div className="text-left track-details">
                                    {
                                        item.track.artists.map(artist => (
                                            <span className="artist-name mr-2" key={uuidv4()}> {artist.name} </span>
                                        ))
                                    }
                                        <div className="track-name"> {item.track.name} </div>
                                    </div>
                                    <div className="play-track">
                                        <div className="play-icon">
                                            <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-play-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
                                            </svg>
                                        </div>
                                    </div>
                                </div>  
                            </li>
                        )) : (
                            <p>Loading...</p>
                        )
                    }
                    </ul>
                </div>
                <div className="col-md-3">
                    right
                </div>
            </div>
        </div>
    )
}