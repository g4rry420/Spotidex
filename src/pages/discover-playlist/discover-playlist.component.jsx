import React, { useContext, Suspense, lazy } from 'react'
import { Route } from "react-router-dom"

import "./discover-playlist.styles.css"
import DualRing from "../../components/dual-ring-spinner/dual-ring-spinner.component";
import { MainContext } from '../../context/mainContext/mainContext';

const TracksPage = lazy(() => import('../../reusable/tracks-page/tracks-page.component'));
const DiscoverPlaylistContainer = lazy(() => import('../../components/discover-playlist-container/discover-playlist-container.component'))

function DiscoverPlaylist(props) {

    const { discoverPlaylistTracks } = useContext(MainContext);

    return (
        <>
            <Suspense fallback={<div className="container"> <div className="text-center"> <DualRing /> </div> </div>}>
                <Route exact path={props.match.path} component={DiscoverPlaylistContainer} />
                <Route path={`${props.match.path}/:tracks_id`} render={(props) => <TracksPage trackPage={discoverPlaylistTracks} {...props} />} />
            </Suspense>
        </>
    )
}

export default DiscoverPlaylist