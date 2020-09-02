import React, { Suspense, lazy } from 'react'
import { Route } from "react-router-dom"

import "./discover.styles.css"
import DualRing from "../../components/dual-ring-spinner/dual-ring-spinner.component"

const DiscoverPlaylist = lazy(() => import("../discover-playlist/discover-playlist.component"));
const DiscoverContainer = lazy(() => import('../../components/discover-container/discover-container.component'));

export default function Discover(props) {
    return (
      <>
        <Suspense fallback={<div className="container"> <div className="text-center"> <DualRing /> </div> </div>}>
          <Route exact path={props.match.path} component={DiscoverContainer} />
          <Route path={`${props.match.path}/:category_id`} component={DiscoverPlaylist} />
        </Suspense>
      </>
    )
}
