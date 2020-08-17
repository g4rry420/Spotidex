import React, { useContext } from 'react'
import { v4 as uuidv4 } from "uuid";

import "./discover-playlist-tracks.styles.css"
import { MainContext } from '../../context/mainContext/mainContext'

export default function DiscoverPlaylistTracks() {
    const { discoverPlaylistTracks } = useContext(MainContext);
    if(discoverPlaylistTracks){
        console.log(discoverPlaylistTracks)
    }
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-7  margin-only center">
                    <ul className="center-list-container">
                    {
                        discoverPlaylistTracks ? discoverPlaylistTracks.map(item => (
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
            </div>
        </div>
    )
}