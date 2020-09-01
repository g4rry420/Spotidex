import React from 'react'

import "./tracks-page.styles.css"
import TracksList from '../tracks-list/tracks-list.component';
import DualRing from "../../components/dual-ring-spinner/dual-ring-spinner.component"

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
            {
                trackPage ? <TracksList albumImageUrl={state ? state.image : null} tracks={trackPage.items} className="margin-only-width" /> : (
                    <DualRing />
                )
            }
            </div>
        </div>
    )
}
