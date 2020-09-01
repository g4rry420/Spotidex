import React, { useState, useContext, useEffect } from 'react'

import "./modal.styles.css"
import { MainContext } from "../../context/mainContext/mainContext"
import { fetchAnything } from '../../api-fetching/api-fetching';

export default function Modal({ modalRef }) {

    const { token ,currentUser,createPlaylist, setCreatePlaylist, notify } = useContext(MainContext);

    const [create, setCreate] = useState({
        name: "",
        description: ""
    });

    const handleCancelPlaylist = () => {
        modalRef.current.classList.remove("modal-active-state");
    }

    const handleChange = (e) => {
        const {name, value} = e.target;

        setCreate({...create, [name]: value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const fetchURL = `https://api.spotify.com/v1/users/${currentUser.id}/playlists`;
        const body = `{"name":"${create.name}","description":"${create.description}","public":false}`

        fetchAnything(token, fetchURL, "POST",setCreatePlaylist, body);

        setCreate({
            name: "",
            description: ""
        })

        modalRef.current.classList.remove("modal-active-state");
    }

    useEffect(() => {
        if(!createPlaylist) return;

        console.log(createPlaylist)
        if(createPlaylist.snapshot_id){
            notify(`The playlist ${createPlaylist.name} is created.`)
            setTimeout(() => setCreatePlaylist(null), 7000);
        }else if(createPlaylist.error){
            notify(`Something went Wrong. Message: ${createPlaylist.error.message}`);
            setTimeout(() => setCreatePlaylist(null), 7000);
        }

    }, [createPlaylist])
    
    const {name, description} = create;

    return (
        <div ref={modalRef} className="modal-top-container">
            <div>
                <div className="modal-background"></div>
                <div className="modal-description">
                    <div className="text-center mb-4">
                        <h2>New Playlist</h2>
                    </div>
                    <form onSubmit={handleSubmit} >
                        <div className="form-group">
                            <input onChange={handleChange} name="name" value={name} type="text" className="form-control" placeholder="Name" required/>
                        </div>
                        <div className="form-group">
                            <textarea onChange={handleChange} name="description" value={description} className="form-control" placeholder="Description" name="description" rows="4"></textarea>
                        </div>

                        <div className="buttons">
                            <button onClick={handleCancelPlaylist} type="button" className="btn btn-danger">Cancel</button>
                            <button type="submit" className="btn btn-success">Create</button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}
