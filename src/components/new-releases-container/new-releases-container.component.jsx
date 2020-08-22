import React, { useContext } from 'react'

import "./new-releases-container.styles.css"
import { MainContext } from '../../context/mainContext/mainContext'
import { fetchAnything } from '../../api-fetching/api-fetching';
import Heading from "../../reusable/heading/heading.component"
import Items from '../../reusable/items/items.component';
import DualRing from "../dual-ring-spinner/dual-ring-spinner.component"

export default function NewReleasesContainer(props) {
    const { token, newReleases, setNewReleases, setNewReleasesTracks } = useContext(MainContext);
    
    if(!newReleases){
        fetchAnything(token,"https://api.spotify.com/v1/browse/new-releases?limit=50", setNewReleases);
          return(
              <div className="container">
                  <div className="text-center">
                      <DualRing />
                  </div>
              </div>
          )
    }

    return (
        <div className="container-fluid">
            <Heading title="New Releases" display="display-4" />
            <div className="container">
                <div className="row">
                {
                    newReleases ? (
                      newReleases.albums.items.map(release => (
                        <Items key={release.id}
                               path={`${props.match.url}/${release.id}`}
                               onclick={() => fetchAnything(token, release.href + "/tracks", setNewReleasesTracks)}
                               url={`${release.images[0].url}`} />
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
