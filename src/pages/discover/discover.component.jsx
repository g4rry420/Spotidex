import React, { useContext } from 'react'
import { Route, Switch } from "react-router-dom"

import "./discover.styles.css"
import { MainContext } from '../../context/mainContext/mainContext';
import { getCategoriesPlaylists } from "../../api-fetching/api-fetching"
import Heading from "../../components/heading/heading.component"
import Items from '../../components/items/items.component';
import DiscoverPlaylist from "../discover-playlist/discover-playlist.component"

export default function Discover(props) {
    const { token, discover,setDiscoverPlaylist } = useContext(MainContext)
    console.log(props)
    return (
      <>
        <Switch>
          <Route path={`${props.match.url}/:category_id`} component={DiscoverPlaylist} />
        </Switch>
        <div className="container-fluid discover-main-container">
            <Heading title="Discover" display='display-4' />
            <div className="container">
              <div className="row">
                {
                  discover ? (
                    discover.map(discover => (
                      <Items key={discover.id} 
                             path={`${props.match.path}/${discover.id}`} 
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
        </>
    )
}
