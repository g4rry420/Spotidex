import React, { useContext } from 'react'

import "./discover-container.styles.css"
import { MainContext } from '../../context/mainContext/mainContext';
import { getCategoriesPlaylists, fetchAnything } from "../../api-fetching/api-fetching"
import Heading from "../../reusable/heading/heading.component"
import Items from '../../reusable/items/items.component';
import DualRing from "../dual-ring-spinner/dual-ring-spinner.component"

export default function DiscoverContainer(props) {
    const { token, discover,setDiscoverPlaylist, setDiscover } = useContext(MainContext)
    if(!discover){
      fetchAnything(token, "https://api.spotify.com/v1/browse/categories?limit=50", "GET", setDiscover)
      return(
              <div className="container">
                  <div className="text-center">
                      <DualRing />
                  </div>
              </div>
      )
    }

    return (
        <div className="container-fluid discover-main-container">
            <Heading title="Discover" display='display-4' />
            <div className="container">
              <div className="row">
                {
                  discover ? (
                    discover.categories.items.map(discover => (
                      <Items key={discover.id} 
                             path={`${props.match.url}/${discover.id}`}
                             name={discover.name} 
                             onclick={() => fetchAnything(token,`https://api.spotify.com/v1/browse/categories/${discover.id}/playlists?limit=50`, "GET", setDiscoverPlaylist)}
                             url={`${discover.icons[0].url}`} />
                    ))
                  ) : (
                    <DualRing />
                  )
                }
              </div>
            </div>
        </div>
    )
}
