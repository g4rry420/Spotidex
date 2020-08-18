import React, { useContext } from 'react'
import { v4 as uuidv4 } from "uuid";
import { Link } from 'react-router-dom';

import "./tracks-list.styles.css"
import { fetchAnything } from '../../api-fetching/api-fetching';
import { MainContext } from '../../context/mainContext/mainContext';

export default function TracksList({ tracks, className, albumImageUrl, albumArtists }) {
    const { setArtistInfo,  token } = useContext(MainContext);
    return (
        <div className={`col-md-7 center-tracks ${className}`}>
            <ul className="center-list-container">
            {
                tracks ? tracks.map(item => (
                    <li key={uuidv4()} className="mb-2 p-2">
                        <div className="img-wrapper">
                            <img src={item.track ? item.track.album.images[1].url : albumImageUrl ? albumImageUrl : item.album.images[1].url} alt="song"/>
                        </div>
                        <div className="song-content ml-2">
                            <div className="text-left track-details">
                            {
                                item.track ? item.track.artists.map(artist => (
                                    <Link onClick={() => fetchAnything(token, artist.href, setArtistInfo)} key={uuidv4()} className="artist-link" to="/artist">
                                        <span  className="artist-name mr-2" > {artist.name} </span>
                                    </Link>
                                )) : 
                                albumArtists ? albumArtists.map(artist => (
                                    <Link onClick={() => fetchAnything(token, artist.href, setArtistInfo)} key={uuidv4()} className="artist-link" to="/artist">
                                        <span  className="artist-name mr-2" > {artist.name} </span>
                                    </Link>
                                )) : 
                                item.artists.map(artist => (
                                    <Link onClick={() => fetchAnything(token, artist.href, setArtistInfo)} key={uuidv4()} className="artist-link" to="/artist">
                                        <span  className="artist-name mr-2" > {artist.name} </span>
                                    </Link>
                                ))    
                            }
                                <div className="track-name"> {item.track ? item.track.name : item.name} </div>
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
    )
}
