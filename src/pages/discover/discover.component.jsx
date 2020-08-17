import React from 'react'
import { Route, Switch } from "react-router-dom"

import "./discover.styles.css"
import DiscoverPlaylist from "../discover-playlist/discover-playlist.component"
import DiscoverContainer from '../../components/discover-container/discover-container.component';

export default function Discover(props) {
    return (
      <div>
          <Route exact path={props.match.path} component={DiscoverContainer} />
          <Route path={`${props.match.path}/:category_id`} component={DiscoverPlaylist} />
      </div>
    )
}
