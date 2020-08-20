import React, { useContext } from 'react'

import "./discover-playlist-tracks.styles.css"
import { MainContext } from '../../context/mainContext/mainContext'
import TracksList from '../../reusable/tracks-list/tracks-list.component';

export default function DiscoverPlaylistTracks() {
    const { discoverPlaylistTracks } = useContext(MainContext);
    return (
        <div className="container-fluid">
            <div className="row">
            {
                discoverPlaylistTracks ? <TracksList tracks={discoverPlaylistTracks.items} className="margin-only" /> : (
                    <p>Loading...</p>
                )
            }
            </div>
        </div>
    )
}