import React, { useContext } from 'react'

import "./album-tracks.styles.css"
import { MainContext } from '../../context/mainContext/mainContext'
import TracksList from '../../components/tracks-list/tracks-list.component';

export default function AlbumTracks() {
    const { albumTracks } = useContext(MainContext);
    console.log(albumTracks);
    return (
        <div className="container-fluid">
            <div className="row">
                {albumTracks ? <TracksList 
                                tracks={albumTracks.tracks.items} 
                                albumImageUrl={albumTracks.images[1].url}
                                albumArtists={albumTracks.artists} 
                                className="centering" /> : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    )
}
