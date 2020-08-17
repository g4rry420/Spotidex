import React from 'react'
import { Route, Switch } from "react-router-dom"

import "./discover-playlist.styles.css"
import DiscoverPlaylistTracks from '../discover-playlist-tracks/discover-playlist-tracks.component';
import DiscoverPlaylistContainer from '../../components/discover-playlist-container/discover-playlist-container.component';

function DiscoverPlaylist(props) {
    return (
        <div>
            <Route exact path={props.match.path} component={DiscoverPlaylistContainer} />
            <Route path={`${props.match.path}/:tracks_id`} component={DiscoverPlaylistTracks} />
        </div>
    )
}

export default DiscoverPlaylist