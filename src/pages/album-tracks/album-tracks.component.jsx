import React, { useContext } from 'react'

import "./album-tracks.styles.css"
import { MainContext } from '../../context/mainContext/mainContext'
import TracksList from '../../reusable/tracks-list/tracks-list.component';
import DualRing from "../../components/dual-ring-spinner/dual-ring-spinner.component"

export default function AlbumTracks() {
    const { albumTracks } = useContext(MainContext);
    if(!albumTracks) {
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
                {albumTracks ? <TracksList 
                                tracks={albumTracks.tracks.items} 
                                albumImageUrl={albumTracks.images[1].url}
                                albumArtists={albumTracks.artists} 
                                className="centering" /> : (
                    <DualRing />
                )}
            </div>
        </div>
    )
}
