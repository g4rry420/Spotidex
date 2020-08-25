import React, { useContext } from 'react'

import "./discover-container.styles.css"
import { MainContext } from '../../context/mainContext/mainContext';
import { getCategoriesPlaylists, getCategories } from "../../api-fetching/api-fetching"
import Heading from "../../reusable/heading/heading.component"
import Items from '../../reusable/items/items.component';
import DualRing from "../dual-ring-spinner/dual-ring-spinner.component"

export default function DiscoverContainer(props) {
    const { token, discover,setDiscoverPlaylist, setDiscover } = useContext(MainContext)
    if(!discover){
      getCategories(token, setDiscover);
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
                    discover.map(discover => (
                      <Items key={discover.id} 
                             path={`${props.match.url}/${discover.id}`}
                             name={discover.name} 
                             onclick={() => getCategoriesPlaylists(token, discover.id, setDiscoverPlaylist)}
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
