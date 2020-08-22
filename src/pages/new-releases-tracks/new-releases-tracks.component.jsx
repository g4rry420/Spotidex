import React, { useContext } from 'react'

import "./new-releases-tracks.styles.css"
import { MainContext } from '../../context/mainContext/mainContext'
import TracksList from '../../reusable/tracks-list/tracks-list.component';
import DualRing from '../../components/dual-ring-spinner/dual-ring-spinner.component'

export default function NewReleasesTracks({ location: { state } }) {
    const { newReleasesTracks } = useContext(MainContext);

    if(!newReleasesTracks) {
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
                newReleasesTracks ? <TracksList 
                                        albumImageUrl={state.image} 
                                        tracks={newReleasesTracks.items} 
                                        className="margin-only" /> : (
                   <DualRing />
                )
            }
            </div>
        </div>
    )
}
