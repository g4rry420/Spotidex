import React, { useContext, useState, useRef, useEffect } from 'react'
import { v4 as uuidv4 } from "uuid";
import { Link } from 'react-router-dom';

import "./tracks-list.styles.css"
import { fetchAnything } from '../../api-fetching/api-fetching';
import { MainContext } from '../../context/mainContext/mainContext';
import DualRing from "../../components/dual-ring-spinner/dual-ring-spinner.component"

export default function TracksList({ tracks, className, albumImageUrl, albumArtists, children }) {
    const { setArtistInfo,  token, userPlaylist, currentUser,songAddedToPlaylist ,setSongAddedToPlaylist , notify, selectedPlaylistOwner, userPlaylistTracks,setUserPlaylistTracks ,deletedSong ,setDeletedSong } = useContext(MainContext);

    const [currentTrackId, setCurrentTrackId] = useState("");
    const [currentPlaylistId, setCurrentPlaylistId] = useState("");

    const audioRef = useRef();
    const playButton = useRef();
    const pauseButton = useRef();
    const addPlaylistRef = useRef();

    if(tracks) {
        audioRef.current = new Array(tracks.length);
        playButton.current = new Array(tracks.length);
        pauseButton.current = new Array(tracks.length);
        addPlaylistRef.current = new Array(tracks.length);
    }

    const userOwnedPlaylist = userPlaylist.items.filter(playlist => playlist.owner.display_name === currentUser.display_name)


    const defaultSongImage = "https://community.spotify.com/t5/image/serverpage/image-id/55829iC2AD64ADB887E2A5/image-size/large?v=1.0&px=999";

    const handlePlay = (item) => {
        setCurrentTrackId(item.track ? item.track.id : item.id);
    }

    const handlePause = (e) => {
        setCurrentTrackId("");

        const currentPlay = playButton.current.filter(play => play.id === currentTrackId);
        const currentPause = pauseButton.current.filter(play => play.id === currentTrackId);

        currentPlay[0].classList.remove("not-active-playpause");
        currentPause[0].classList.remove("active-playpause");

    }

    const volumeChange = (e) => {
        const currentAudio = audioRef.current.filter(audio => audio.id === currentTrackId);

        if(!currentAudio[0]) return;
        currentAudio[0].volume = e.target.value;
    }

    const audioEnded = () => {
        const currentPlay = playButton.current.filter(play => play.id === currentTrackId);
        const currentPause = pauseButton.current.filter(play => play.id === currentTrackId);

        currentPlay[0].classList.remove("not-active-playpause");
        currentPause[0].classList.remove("active-playpause");
    }

    const handleAddToPlaylist = (e,item) => {
        e.bubbles = false;
        if(!(currentPlaylistId === (item.track ? item.track.id : item.id))){
            setCurrentPlaylistId(item.track ? item.track.id : item.id);
        }else{
            setCurrentPlaylistId("");
        }
    }

    const  handleTrackAddToPlaylist = (playlist, uris) => {
        const fetchURL = `https://api.spotify.com/v1/playlists/${playlist.id}/tracks?position=0&uris=${uris}`;
        const method = "POST";
        fetchAnything(token, fetchURL, method, setSongAddedToPlaylist);
        setCurrentPlaylistId("");
    }

    const handleDelete = (playlistId, uris, trackId) => {
        const requestBody = `{"tracks":[{"uri":"${uris}"}]}`;

        const fetchURL = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`
        const method = "DELETE";

        
        fetchAnything(token, fetchURL, method, setDeletedSong, requestBody);

        setUserPlaylistTracks({
            id: userPlaylistTracks.id,
            items: userPlaylistTracks.items.filter(song => {
                    if(song.track){
                        return song.track.id !== trackId;
                    }else{
                        return song.id !== trackId;
                    }
            })
        })
    }

    useEffect(() => {
        if(!deletedSong) return;

        if(deletedSong.snapshot_id){
            notify(`The song is deleted from the playlist.`)
            setTimeout(() => setDeletedSong(null), 7000);
        }else if(deletedSong.error){
            notify(`Something went Wrong. Message: ${deletedSong.error.message}`);
            setTimeout(() => setDeletedSong(null), 7000);
        }

    }, [deletedSong])

    useEffect(() => {
        if(!songAddedToPlaylist) return;

        if(songAddedToPlaylist.snapshot_id){
            notify(`The song is added to the playlist.`);
            setTimeout(() => setSongAddedToPlaylist(null), 7000);
        }else if(songAddedToPlaylist.error){
            notify(`Something went Wrong. Message: ${deletedSong.error.message}`);
            setTimeout(() => setSongAddedToPlaylist(null), 7000);
        }

    }, [songAddedToPlaylist])

    useEffect(() => {
        if(!tracks) return;
        if(!addPlaylistRef.current) return;

        const currentPlaylist = addPlaylistRef.current.filter(playlist => playlist.id === currentPlaylistId);
        if(!currentPlaylist[0]) return;

        currentPlaylist[0].classList.add("active-add-to-playlist")

    }, [currentPlaylistId])

    useEffect(() => {
        if(!tracks) return;
        if(!pauseButton.current) return;
        if(!playButton.current) return;

        const currentAudio = audioRef.current.filter(audio => audio.id === currentTrackId);
        const currentPlay = playButton.current.filter(play => play.id === currentTrackId);
        const currentPause = pauseButton.current.filter(play => play.id === currentTrackId);
        

        if(!currentAudio.length) return;

        currentAudio[0].play();
        currentPlay[0].classList.add("not-active-playpause");

        currentPause[0].classList.add("active-playpause");

    }, [currentTrackId])


    if(!albumImageUrl){
        albumImageUrl = defaultSongImage
    }


    return (
        <div className={`col-md-7 center-tracks ${className}`}>
            <ul className="center-list-container">
            {
                tracks ? tracks.map((item, idx) => (
                    <li key={uuidv4()} className="mb-2 p-2">
                        <div className="img-wrapper">
                            <img  src={item.track && item.track.album.images.length ? item.track.album.images[1].url : item.album ? item.album.images[0].url : albumImageUrl}
                                 alt="song"/>
                        </div>
                        <div className="song-content ml-2">
                            <div className="text-left track-details">
                            {
                                item.track ? item.track.artists.map(artist => (
                                    <Link onClick={() => fetchAnything(token, artist.href, "GET", setArtistInfo)} key={uuidv4()} className="artist-link" to={`/artist/${artist.id}`}>
                                        <span  className="artist-name mr-2" > {artist.name} </span>
                                    </Link>
                                )) : 
                                albumArtists ? albumArtists.map(artist => (
                                    <Link onClick={() => fetchAnything(token, artist.href, "GET",setArtistInfo)} key={uuidv4()} className="artist-link" to={`/artist/${artist.id}`}>
                                        <span  className="artist-name mr-2" > {artist.name} </span>
                                    </Link>
                                )) : 
                                item.artists ? item.artists.map(artist => (
                                    <Link onClick={() => fetchAnything(token, artist.href, "GET", setArtistInfo)} key={uuidv4()} className="artist-link" to={`/artist/${artist.id}`}>
                                        <span  className="artist-name mr-2" > {artist.name} </span>
                                    </Link>
                                ))  : null
                            }
                                <div className="track-name"> {item.track ? item.track.name : item.name} </div>
                            </div>
                            <div className="play-track">
                                <div className="play-icon">
                                    <audio onEnded={audioEnded} id={item.track ? item.track.id : item.id} ref={el => audioRef.current[idx] = el} src={item.track ? item.track.preview_url : item.preview_url} >
                                    </audio>
                                    <svg id={item.track ? item.track.id : item.id} ref={el => playButton.current[idx] = el} onClick={() =>  handlePlay(item)} width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-play-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
                                    </svg>
                                    <svg id={item.track ? item.track.id : item.id} ref={el => pauseButton.current[idx] = el} onClick={handlePause} width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-pause-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"/>
                                    </svg>

                                    <input className="slider" onChange={volumeChange} type="range" name="volume" min="0" max="1" step="0.10" />
                                </div>
                            </div>
                        </div>
                        <div className="dropdown-playlist-container">
                            <div onClick={(e) => handleAddToPlaylist(e,item)}>
                                <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-three-dots" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
                                </svg>
                            </div>
                            <div id={item.track ? item.track.id : item.id} ref={el =>  addPlaylistRef.current[idx] = el}>
                                <div>Add&nbsp;To&nbsp;Playlist&nbsp;&#8811;</div>
                                {
                                    userOwnedPlaylist.map(playlist => (
                                        <span key={playlist.id} onClick={() => handleTrackAddToPlaylist(playlist, item.track ? item.track.uri : item.uri)}> {playlist.name} </span>
                                    ))
                                }
                                {
                                    children && (selectedPlaylistOwner === currentUser.display_name) ? (
                                        <button className="btn btn-danger" onClick={() => handleDelete(userPlaylistTracks.id, item.track ? item.track.uri : item.uri, item.track ? item.track.id : item.id)}>{children}</button>
                                    ) : null
                                }
                            </div>
                    </div>  
                    </li>
                )) : (
                    <DualRing />
                )
            }
            </ul>
        </div>
    )
}