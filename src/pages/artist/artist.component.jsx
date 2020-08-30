import React, { useContext, useState, useEffect } from 'react'
import { v4 as uuidv4 } from "uuid";

import "./artist.styles.css"
import { MainContext } from '../../context/mainContext/mainContext'
import { fetchAnything } from '../../api-fetching/api-fetching';
import TracksList from '../../reusable/tracks-list/tracks-list.component';
import CircleItems from '../../reusable/circle-items/circle-items.component';
import DualRing from '../../components/dual-ring-spinner/dual-ring-spinner.component';

export default function Artist() {
    const [similarArtists, setSimilarArtists] = useState(null);
    const [artistAlbum, setArtistAlbum] = useState(null);
    const [topTracksArtist, setTopTracksArtist] = useState(null);

    const { artistInfo, token, setArtistInfo, setAlbumTracks } = useContext(MainContext);

    const defaultImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAP1BMVEXFxcV5eXl2dnbIyMh0dHR7e3uzs7O9vb3ExMR/f3+QkJC7u7uCgoKgoKCcnJyNjY2srKyWlpaHh4empqaurq7RLEkLAAAFCElEQVR4nO2d25arIAxAq/GC2mq1/v+3Dta204v2AkFCyH46s87L7EWEECCz2wmCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAQM+P4FnAEAu7IpJpry/BMrAFTRdlWepGmWpkledW2hGEmCOnbaLU3+mX7qjoqHI5Rtnt3b3SyzvC3Dd4SmT5b0LpJJ34TtCKrN1/3OjnkbcqxCUb33OztWRbiKbfbRbyJrff+iZkDZfR7AyzB2Ic440HwRof+RGt6EA8WHKeZJMQ/tY4TiB72ZsBQNBMNShCY3MMwD+hbV/pdv8Eq6V75/8W+Br5eJJ8UukEGEg5mgVjwEoWg0y1wJYrZRg+kQ6kEcAvgUzWP0rBhAnJY2glqx9C3wCagtDWvigwiFnaBWJD7ZmC6Fd4bEF8XGVlArNr4l3gE9gmFPeRBLk4z7mZzwdGq3Fl6hvCbCHkEwSfZ0DZvvamufyMjONdBiBKkO05bqICIFKeEwRVgMZ6guiXBCMzzRHETbpPvOkGr6XSEJJknlW2WZEk0wSUimNTBiBakO05FimOKkbBdDkokbxr7iZkhyf2G/+b0zJLkNVlgZzQTJAr/CWyz0ckHREGX3e4XkLhhzOaS5IFqWgh8hWRhG2v7OkNwEi2H4hvy/wwjmUvbrIf+chn9eyn9vEcH+kP8en32dhn+tLYJ6Kf+aN/9zC/5nTxGcH/I/A+Z/jh/BXQz+92n434mK4F4b/7uJEdwv5X9HmP897wju6kfw3oL/m5kI3j3xf7sWwfvDCN6QRvAOmP9b7gje40fQUyGCvhgR9DaZYN6fZhdDjyH+faJ2/Ht9TXDv1zbBvefeBPe+iWeY9768g6+ZIAiCIHwGnvH9CyGibVRZjKe2r7thoqv79jQWpeLgqRWaUz9MCenMnHXP/8yH/tTsArac0u3DcE61V/eH+n+HQ5hJOEB5rKvFfeHrPrGqj2VgknpHWC9ve9ck8zqg3SJA01dvQnMtYKu+CWIgAcbhZ72r5DCSd9Th+d3Ht+KYVbSDFdTJ6OTwQXJ/ousIo7Xf7EjztcUOGrSHT2lHsIoKqjWcXxYVU3KVcBh/OEv7yrEiFapQIr5buzn2dAriXx0xGSjSOZRCfJb35HjwrTbxw1GvgSKBw2FHEXpT9B6pcHSoN3P0qggHzFYRy2Rer/P17gW1Yu/NT6E9qXxPWnu60qccTqJPip0fRYvbzj8rDh78bK5zmyhuPorbhehFcfNA3WiSuVOsN/XD7IHxteKWb9q2WOhf2XDph6MPQa24VQJn9WTEjo3S8BKzXdJvVNu8+9p0IXxkk5Ufq62AoaL7ZgSYfXaMFJ2X4Dx+hDPOP8XNc5lnHOc2eC1oLBSdNq/B7Y1oisM4xWw6Z47DZ4q+srVn3GVvqL0fbXDVN9LHlmkZRxspjwn3K25ScBLTzEzaOfDzna494iJ5Q2tVhgN+LykqK8UVBysGrSHUg4jsB0dKX+FEij2I1IYQexDpDSH6IHqszayBWrOx72/lAsyeWXjdZTHBbJqF+mcP8MDrmuW3gLgOXmkRMP/qASY5kiEUtBK2fzKkuYbmPDOBNdfQKLAtgzLXUKiRroFTO6VRQlwGp7CI+vdjsMHoyEs5SHHClO5MOoExmyrKQarD1Lo4DCPV5X4msy66Uc1Jr9jnpsSKiK9YlxVL2kGqw9RyvaBYoHnEtlxD57xpDdtzKPKf4ecP8Q+vdFQsrx+InwAAAABJRU5ErkJggg==";

    useEffect(() => {
        if(artistInfo){
            let fetchRelatedArtists = artistInfo.href + "/related-artists"
            fetchAnything(token, fetchRelatedArtists, "GET", setSimilarArtists);

            let fetchArtistAlbum = artistInfo.href + "/albums";
            fetchAnything(token, fetchArtistAlbum,"GET", setArtistAlbum);

            let fetchTopTracksArtist = `${artistInfo.href}/top-tracks?country=CA`
            fetchAnything(token, fetchTopTracksArtist,"GET", setTopTracksArtist);
        }
    }, [artistInfo, token])

    if(!artistInfo && !similarArtists && !topTracksArtist) {
            return(
                <div className="container">
                    <div className="text-center">
                        <DualRing />
                    </div>
                </div>
            )
    }

    return (
        artistInfo ?
        <div className="container">
             <div className="row">
                <div className="col-md-3 col-sm-6 col-12 artist-inform">
                    <div className="artist-main-img-container">
                        <div className="artist-img-container">
                            <img src={artistInfo.images[1] ? artistInfo.images[1].url : defaultImage} alt="artist"/>
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
                    topTracksArtist ?  <TracksList className="artist-width" tracks={topTracksArtist.tracks} /> : (
                        <DualRing />
                    )
                }
                </div>
             </div>
        </div>
        : (
            <DualRing />
        )
    )
}