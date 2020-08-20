import React, { useContext, useState, useEffect } from 'react'
import { v4 as uuidv4 } from "uuid";

import "./artist.styles.css"
import { MainContext } from '../../context/mainContext/mainContext'
import { fetchAnything } from '../../api-fetching/api-fetching';
import TracksList from '../../reusable/tracks-list/tracks-list.component';
import CircleItems from '../../reusable/circle-items/circle-items.component';

export default function Artist() {
    const [similarArtists, setSimilarArtists] = useState(null);
    const [artistAlbum, setArtistAlbum] = useState(null);
    const [topTracksArtist, setTopTracksArtist] = useState(null);

    const { artistInfo, token, setArtistInfo, setAlbumTracks } = useContext(MainContext);

    useEffect(() => {
        if(artistInfo){
            let fetchRelatedArtists = artistInfo.href + "/related-artists"
            fetchAnything(token, fetchRelatedArtists , setSimilarArtists);

            let fetchArtistAlbum = artistInfo.href + "/albums";
            fetchAnything(token, fetchArtistAlbum, setArtistAlbum);

            let fetchTopTracksArtist = `${artistInfo.href}/top-tracks?country=CA`
            fetchAnything(token, fetchTopTracksArtist, setTopTracksArtist);
        }
    }, [artistInfo])
    return (
        artistInfo ?
        <div className="container">
             <div className="row">
                <div className="col-md-3 artist-inform">
                    <div className="artist-main-img-container">
                        <div className="artist-img-container">
                            <img src={artistInfo.images[1].url} alt="artist"/>
                            <div className="artist-fader"></div>
                        </div>
                        <h2 className="artist-name">{artistInfo.name}</h2>
                    </div>
                    <div className="genre-container">
                    {
                        artistInfo.genres.map(genre => (
                            <button key={uuidv4()} className="btn btn-genre m-2"> {genre} </button>
                        ))
                    }
                    </div>
                    <div className="follower-container my-3">
                        <h4>Followers: <span> {artistInfo.followers.total.toLocaleString()} </span></h4>
                        <h4>Popularity: <span> {artistInfo.popularity} </span></h4>
                    </div>

                    <CircleItems title="Similar Artists"
                                 path="artist"
                                 className={`mt-5 similar-artists-container`} 
                                 propsToMap={similarArtists ? similarArtists.artists : null}
                                 onclick={() =>  setArtistInfo(null)}
                                 setSTATE={setArtistInfo}
                                 token={token} />

                    

                </div>
                <div className="col-md-3 mx-5 album-inform">

                    <CircleItems  title="Albums"
                                  path="album"
                                  className="artist-album-container"
                                  propsToMap={artistAlbum ? artistAlbum.items : null}
                                  token={token}
                                  setSTATE={setAlbumTracks}  />
                </div>
                
                <div className="col-md-6 tracks-inform">
                    <div className="text-center">
                        <h3>Top Tracks</h3>
                    </div>
                {
                    topTracksArtist ?  <TracksList tracks={topTracksArtist.tracks} /> : (
                        <p>Loading...</p>
                    )
                }
                </div>
             </div>
        </div>
        : (
            <p>Loading...</p>
        )
    )
}