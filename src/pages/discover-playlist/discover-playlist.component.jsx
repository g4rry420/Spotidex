import React, { useContext } from 'react'
import { Route } from "react-router-dom"

import "./discover-playlist.styles.css"
import DiscoverPlaylistContainer from '../../components/discover-playlist-container/discover-playlist-container.component';
import TracksPage from '../../reusable/tracks-page/tracks-page.component';
import { MainContext } from '../../context/mainContext/mainContext';

function DiscoverPlaylist(props) {

    const { discoverPlaylistTracks } = useContext(MainContext);

    return (
        <div>
            <Route exact path={props.match.path} component={DiscoverPlaylistContainer} />
            <Route path={`${props.match.path}/:tracks_id`} render={(props) => <TracksPage trackPage={discoverPlaylistTracks} {...props} />} />
        </div>
    )
}

export default DiscoverPlaylist