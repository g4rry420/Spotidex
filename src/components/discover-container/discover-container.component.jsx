import React, { useContext } from 'react'

import "./discover-container.styles.css"
import { MainContext } from '../../context/mainContext/mainContext';
import { getCategoriesPlaylists } from "../../api-fetching/api-fetching"
import Heading from "../heading/heading.component"
import Items from '../items/items.component';

export default function DiscoverContainer(props) {
    const { token, discover,setDiscoverPlaylist } = useContext(MainContext)
    console.log(props.match)
    return (
        <div className="container-fluid discover-main-container">
            <Heading title="Discover" display='display-4' />
            <div className="container">
              <div className="row">
                {
                  discover ? (
                    discover.map(discover => (
                      <Items key={discover.id} 
                             path={`${props.match.url}/${discover.id}`}
                             name={discover.name} 
                             onclick={() => getCategoriesPlaylists(token, discover.id, setDiscoverPlaylist)}
                             url={`${discover.icons[0].url}`} />
                    ))
                  ) : (
                    <p>You do not have categoryies</p>
                  )
                }
              </div>
            </div>
        </div>
    )
}
