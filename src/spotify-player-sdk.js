import React, { useContext } from 'react'
import Script from 'react-load-script'
import { MainContext } from './context/mainContext/mainContext'

export default function SpotifyPlayerSDK() {

    const { token } = useContext(MainContext);

    const handleScriptLoad = () => {
        window.onSpotifyWebPlaybackSDKReady = () => {
                const player = window.Spotify.Player({    
                      name: 'Spotify Web Player',           
                      getOAuthToken: cb => { cb(token) }
                    })
                
                // Error handling
                player.addListener('initialization_error', ({ message }) => { console.error(message); });
                player.addListener('authentication_error', ({ message }) => { console.error(message); });
                player.addListener('account_error', ({ message }) => { console.error(message); });
                player.addListener('playback_error', ({ message }) => { console.error(message); });

                // Playback status updates
                player.addListener('player_state_changed', state => { console.log(state); });

                // Ready
                player.addListener('ready', ({ device_id }) => {
                    console.log('Ready with Device ID', device_id);
                });

                // Not Ready
                player.addListener('not_ready', ({ device_id }) => {
                    console.log('Device ID has gone offline', device_id);
                });

                // Connect to the player!
                player.connect();
            }
    }

    const handleScriptError = (error) => {
        console.log(error);
    }

    // <script async={false} src="https://sdk.scdn.co/spotify-player.js" 
    //         onLoad={handleScriptLoad}
    //         onError={handleScriptError}
    //         ></script>
    return (
        <Script 
            url="https://sdk.scdn.co/spotify-player.js" 
            onError={handleScriptError} 
            onLoad={handleScriptLoad}
            />
    )
}
