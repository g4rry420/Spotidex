import React, { useContext } from 'react'

import "./new-releases-tracks.styles.css"
import { MainContext } from '../../context/mainContext/mainContext'
import TracksList from '../../components/tracks-list/tracks-list.component';

export default function NewReleasesTracks({ location: { state } }) {
    const { newReleasesTracks } = useContext(MainContext);

    return (
        <div className="container-fluid">
            <div className="row">
            {
                newReleasesTracks ? <TracksList 
                                        albumImageUrl={state.image} 
                                        tracks={newReleasesTracks.items} 
                                        className="margin-only" /> : (
                    <p>Loading...</p>
                )
            }
            </div>
        </div>
    )
}
