import React, { useContext, Suspense, lazy } from 'react'

import "./new-releases.styles.css"
import { Route } from 'react-router-dom';
import { MainContext } from '../../context/mainContext/mainContext';
import DualRing from "../../components/dual-ring-spinner/dual-ring-spinner.component";

const NewReleasesContainer = lazy(() => import('../../components/new-releases-container/new-releases-container.component'));
const TracksPage = lazy(() => import('../../reusable/tracks-page/tracks-page.component'));

export default function NewReleases(props) {

    const { newReleasesTracks  } = useContext(MainContext);
    return (
        <>
            <Suspense fallback={<div className="container"> <div className="text-center"> <DualRing /> </div> </div>}>
                <Route exact path={props.match.path} component={NewReleasesContainer} />
                <Route path={`${props.match.path}/:album_id`} render={(props) => <TracksPage {...props} trackPage={newReleasesTracks} />} />
            </Suspense>
        </>
    )
}
