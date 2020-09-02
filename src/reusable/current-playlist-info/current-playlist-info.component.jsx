import React from 'react'

import "./current-playlist-info.styles.css"

export default function CurrentPlaylistInfo({ playlist, state }) {

    return (
        <div className="current-playlist-container">
            <div className="current-playlist-content">
                <div className="first-content">
                    <h5> {playlist.type ? playlist.type : state.type} </h5>
                    <h2 className="display-4"> {playlist.name ? playlist.name : state.heading} </h2>
                    <p> {playlist.description ? playlist.description : null} </p>
                </div>
                <div className="second-content">
                    {
                        playlist.owner && playlist.followers ? (
                            <div>
                                <span>Followers: {playlist.followers ? playlist.followers.total.toLocaleString() : null} </span>
                                <span>Made by: {playlist.owner ? playlist.owner.display_name : null}</span>
                            </div>
                        ) : (
                            <span> Release Date: {state ? state.release_date : playlist.release_date} </span>
                        )
                    }
                </div>
            </div>
            <div className="current-playlist-image">
                <img src={playlist.images ? playlist.images[0].url : state.image} alt="current playlist"/>
            </div>
        </div>
    )
}
