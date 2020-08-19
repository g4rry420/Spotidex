import React, { useContext } from 'react'

import "./playlist-tracks.styles.css"
import { MainContext } from '../../context/mainContext/mainContext'
import TracksList from '../../reusable/tracks-list/tracks-list.component';

export default function PlaylistTracks() {
    const { playlistTracks } = useContext(MainContext);
    return (
        <div className="container-fluid">
            <div className="row">
            {
                playlistTracks ? <TracksList tracks={playlistTracks.tracks.items} className="margin-only" /> : (
                    <p>Loading...</p>
                )
            }
            </div>
        </div>
    )
}
