import React, { useContext } from 'react'

import "./playlist-tracks.styles.css"
import { MainContext } from '../../context/mainContext/mainContext'
import TracksList from '../../reusable/tracks-list/tracks-list.component';
import DualRing from "../../components/dual-ring-spinner/dual-ring-spinner.component"

export default function PlaylistTracks() {
    const { playlistTracks } = useContext(MainContext);
    if(!playlistTracks) {
        return(
            <div className="container">
                <div className="text-center">
                    <DualRing />
                </div>
            </div>
        )
}
    return (
        <div className="container-fluid">
            <div className="row">
            {
                playlistTracks ? <TracksList tracks={playlistTracks.tracks.items} className="margin-only" /> : (
                    <DualRing />
                )
            }
            </div>
        </div>
    )
}
