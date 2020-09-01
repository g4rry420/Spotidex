import React, { useContext } from 'react'

import "./new-releases.styles.css"
import { Route } from 'react-router-dom';
import NewReleasesContainer from '../../components/new-releases-container/new-releases-container.component';
import TracksPage from '../../reusable/tracks-page/tracks-page.component';
import { MainContext } from '../../context/mainContext/mainContext';

export default function NewReleases(props) {

    const { newReleasesTracks  } = useContext(MainContext);

    return (
        <div>
            <Route exact path={props.match.path} component={NewReleasesContainer} />
            <Route path={`${props.match.path}/:album_id`} render={(props) => <TracksPage {...props} trackPage={newReleasesTracks} />} />
        </div>
    )
}
