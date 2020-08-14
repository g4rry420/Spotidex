import React, { useContext } from 'react'

import "./login.styles.css"
import { MainContext } from '../../context/mainContext/mainContext'

export default function Login() {
    const { authEndPoint, clientId, redirectUri, scopes } = useContext(MainContext)

    return (
        <div className="container-fluid p-0">
            <div className="hero-section">
                <div className="container text-center background">
                    <h1 className="display-4 font-weight-bold text-white">Spotidex</h1>
                    <h2 className="display-5 my-5 font-weight-normal text-white">Discover a universe of music</h2>
                    <button className="btn mt-4 btn-login">
                        <a className="font-weight-bold" href={`${authEndPoint}client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true&state=123`}>
                            Login to Spotify
                        </a>
                    </button>
                </div>
            </div>
        </div>
    )
}
