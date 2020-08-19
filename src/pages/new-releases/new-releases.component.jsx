import React from 'react'

import "./new-releases.styles.css"
import { Route } from 'react-router-dom';
import NewReleasesContainer from '../../components/new-releases-container/new-releases-container.component';
import NewReleasesTracks from '../new-releases-tracks/new-releases-tracks.component';

export default function NewReleases(props) {

    return (
        <div>
            <Route exact path={props.match.path} component={NewReleasesContainer} />
            <Route path={`${props.match.path}/:album_id`} component={NewReleasesTracks} />
        </div>
    )
}
