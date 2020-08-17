import React, { useContext } from 'react'

import "./discover-playlist-container.styles.css"
import { MainContext } from '../../context/mainContext/mainContext'
import Heading from '../heading/heading.component';
import Items from '../items/items.component';
import { fetchAnything } from "../../api-fetching/api-fetching"

export default function DiscoverPlaylistContainer(props) {
    const { discoverPlaylist, token, setDiscoverPlaylistTracks } = useContext(MainContext);
    return (
        <div className="container-fluid discover-playlist-main-container">
            <Heading title={props.location.state.heading} heading="text-capitalize" display="display-4" />
            <div className="container">
                <div className="row">
                {
                    discoverPlaylist ? discoverPlaylist.map(playlist => (
                        <Items key={playlist.id}
                               path={`${props.match.url}/${playlist.id}`}
                               url={playlist.images[0].url}
                               onclick={() => fetchAnything(token ,playlist.tracks.href, setDiscoverPlaylistTracks)} />
                    )) : (
                        <p>You donot have any of this.</p>
                    )
                }
                </div>
            </div>
        </div>
    )
}
