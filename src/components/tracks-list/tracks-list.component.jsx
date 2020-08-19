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
                            <img src={item.track ? item.track.album.images[1].url : item.album ? item.album.images[0].url : albumImageUrl} alt="song"/>
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
                                    <audio controls>
                                        <source src={item.track ? item.track.preview_url : item.preview_url} type="audio/mpeg" />
                                    </audio>
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
