import React from 'react'

import "./tracks-page.styles.css"
import TracksList from '../tracks-list/tracks-list.component';
import DualRing from "../../components/dual-ring-spinner/dual-ring-spinner.component"
import CurrentPlaylistInfo from "../current-playlist-info/current-playlist-info.component"


export default function TracksPage({ trackPage, location: { state } }) {

    if(!trackPage) {
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
                <div className="col-md-7 margin-only-width">
                    <CurrentPlaylistInfo playlist={trackPage} state={state} />
                {
                    trackPage ? <TracksList albumImageUrl={trackPage.images ? trackPage.images[0].url : state.image} 
                                    tracks={trackPage.tracks ? trackPage.tracks.items : trackPage.items} className="setting-width" /> : (
                        <DualRing />
                    )
                }
                </div>
            </div>
        </div>
    )
}
