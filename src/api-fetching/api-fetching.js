export const myPlaylistTracks = async (token, playlist_id, setUserPlaylistTracks) => {
    if(!token) return;

    const myPlaylistTracks = await fetch(`https://api.spotify.com/v1/playlists/${playlist_id}/tracks`, {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })

    const data = await myPlaylistTracks.json();
    setUserPlaylistTracks({
        id: data.href.slice(37, 59),
        items: data.items
    })
    return data;
}

export const fetchAnything = async (token, fetchURL,type, setState, body) => {
    if(!token) return;

    const myPlaylistTracks = await fetch(`${fetchURL}`, {
        method: type,
        body: body ? body : null,
        headers: {
            "Accept": "application/json",
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })

    const data = await myPlaylistTracks.json();
    if(setState){
        setState(data);
    }
    return data;
}