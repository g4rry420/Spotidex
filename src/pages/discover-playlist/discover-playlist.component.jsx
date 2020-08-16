import React, { useContext } from 'react'

import "./discover-playlist.styles.css"
import { MainContext } from '../../context/mainContext/mainContext'
import Heading from '../../components/heading/heading.component';
import Items from '../../components/items/items.component';
import { fetchAnything } from "../../api-fetching/api-fetching"

function DiscoverPlaylist(props) {
    const { discoverPlaylist, token } = useContext(MainContext);
    // console.log(discoverPlaylist)
    // console.log(props)
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
                               onclick={() => fetchAnything(token ,playlist.tracks.href)} />
                    )) : (
                        <p>You donot have any of this.</p>
                    )
                }
                </div>
            </div>
        </div>
    )
}

export default DiscoverPlaylist