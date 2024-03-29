import React, { useContext, useRef, useEffect } from 'react'

import "./homepage.styles.css"
import { MainContext } from '../../context/mainContext/mainContext'
import { myPlaylistTracks } from "../../api-fetching/api-fetching"
import TracksList from '../../reusable/tracks-list/tracks-list.component';
import DualRing from '../../components/dual-ring-spinner/dual-ring-spinner.component';
import Modal from '../../components/modal/modal.component';
import CurrentPlaylistInfo from '../../reusable/current-playlist-info/current-playlist-info.component';

export default function Homepage() {
    const { token,userPlaylist, setUserPlaylistTracks, userPlaylistTracks, setSelectedPlaylistOwner } = useContext(MainContext);

    const list = useRef();
    const leftHomepage = useRef();
    const modalRef = useRef();

    const defaultSongImage = "https://community.spotify.com/t5/image/serverpage/image-id/55829iC2AD64ADB887E2A5/image-size/large?v=1.0&px=999";

    if(userPlaylist){
        list.current = new Array(userPlaylist.items.length);
        if(!userPlaylistTracks && userPlaylist && userPlaylist.items.length) {
            myPlaylistTracks(token, userPlaylist.items[0].href, setUserPlaylistTracks);
        }
    }

    useEffect(() => {
        if(!list.current) return;
        if(!userPlaylistTracks) return;

        list.current.filter(li => li.classList.remove("active-list"));

        const currentList = list.current.filter(li => li.id === userPlaylistTracks.id);
        if(!currentList[0]) return;
        
        setSelectedPlaylistOwner(currentList[0].classList[0]);
        
        currentList[0].classList.add("active-list");

    }, [userPlaylistTracks])

    const handleSideToggle = () => {
        leftHomepage.current.classList.toggle("active-left-homepage");
    }

    if(!userPlaylist && !userPlaylistTracks){
        return(
            <div className="text-center">
                <DualRing />
            </div>
        )
    }

    const handleAddPlaylist = () => {
        modalRef.current.classList.add("modal-active-state");
    }

    return (
        <div className="container-fluid">
            <div className="side-icon" onClick={handleSideToggle}>
                <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-filter-left" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M2 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>
                </svg>
            </div>
            <div className="row">
                <div ref={leftHomepage} className="col-md-3 left-homepage">
                    <aside>
                        <div className="d-flex justify-content-between font-weight-bold playlist-title">
                            <span>My Playlist</span>
                            <div className="add-playlist" onClick={handleAddPlaylist}>
                                <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-plus-square-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4a.5.5 0 0 0-1 0v3.5H4a.5.5 0 0 0 0 1h3.5V12a.5.5 0 0 0 1 0V8.5H12a.5.5 0 0 0 0-1H8.5V4z"/>
                                </svg>
                            </div>
                        </div>
                        <ul className="playlist-list-container">
                        {
                            userPlaylist ? userPlaylist.items.map((item, idx) =>  {
                                return(
                                <li ref={el => list.current[idx] = el} id={item.id} className={item.owner.display_name} key={item.id} 
                                    onClick={() => {
                                        myPlaylistTracks(token, item.href, setUserPlaylistTracks)
                                        leftHomepage.current.classList.remove("active-left-homepage");
                                    }}>
                                    <div>
                                        <img src={item.images[0] ? item.images[0].url : defaultSongImage} alt="item"/>
                                        <p> {item.name} </p>
                                        <span>{item.owner.display_name}</span>
                                    </div>
                                </li>
                            )}) : <DualRing />
                        }
                        </ul>
                    </aside>
                </div>

                <div className="col-md-7 padding-in-homepage">
                {
                    userPlaylistTracks ? (
                        <CurrentPlaylistInfo playlist={userPlaylistTracks} />
                    ) : null
                }
                {
                    userPlaylistTracks ? <TracksList tracks={userPlaylistTracks.items} className="setting-width">Remove&nbsp;Track</TracksList> : (
                        null
                    )
                }
                </div>

                <div className="col-md-3 right-homepage">
                    
                </div>
            </div>
            <Modal modalRef={modalRef} />
        </div>
    )
}