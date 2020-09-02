import React, { useContext } from 'react'

import "./discover-playlist-container.styles.css"
import { MainContext } from '../../context/mainContext/mainContext'
import Heading from "../../reusable/heading/heading.component"
import Items from '../../reusable/items/items.component';
import { fetchAnything } from "../../api-fetching/api-fetching"
import DualRing from "../dual-ring-spinner/dual-ring-spinner.component"

export default function DiscoverPlaylistContainer(props) {
    const { discoverPlaylist, token, setDiscoverPlaylistTracks } = useContext(MainContext);
    if(!discoverPlaylist) {
        return(
            <div className="container">
                <div className="text-center">
                    <DualRing />
                </div>
            </div>
        )
    }


    return (
        <div className="container-fluid discover-playlist-main-container">
            <Heading title={props.location.state.heading} heading="text-capitalize" display="display-4" />
            <div className="container">
                <div className="row">
                {
                    !!discoverPlaylist ? discoverPlaylist.playlists.items.map(playlist => (
                        <Items key={playlist.id}
                               path={`${props.match.url}/${playlist.id}`}
                               url={playlist.images[0].url}
                               onclick={() => fetchAnything(token ,playlist.href,"GET", setDiscoverPlaylistTracks)} />
                    )) : (
                        <DualRing />
                    )
                }
                </div>
            </div>
        </div>
    )
}
