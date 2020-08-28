import React, { useContext } from 'react'

import "./discover-playlist-tracks.styles.css"
import { MainContext } from '../../context/mainContext/mainContext'
import TracksList from '../../reusable/tracks-list/tracks-list.component';
import DualRing from "../../components/dual-ring-spinner/dual-ring-spinner.component"

export default function DiscoverPlaylistTracks() {
    const { discoverPlaylistTracks } = useContext(MainContext);
    if(!discoverPlaylistTracks) {
        return(
            <div className="container">
                <div className="text-center">
                    <DualRing />
                </div>
            </div>
        )
}
    console.log(discoverPlaylistTracks)
    return (
        <div className="container-fluid">
            <div className="row">
            {
                discoverPlaylistTracks ? <TracksList tracks={discoverPlaylistTracks.items} className="margin-only-width" /> : (
                    <DualRing />
                )
            }
            </div>
        </div>
    )
}