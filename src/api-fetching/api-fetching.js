export const myPlaylistTracks = async (token, fetchURL, setUserPlaylistTracks) => {
    if(!token) return;

    const defaultSongImage = "https://community.spotify.com/t5/image/serverpage/image-id/55829iC2AD64ADB887E2A5/image-size/large?v=1.0&px=999";

    const myPlaylistTracks = await fetch(`${fetchURL}`, {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })

    const data = await myPlaylistTracks.json();
    setUserPlaylistTracks({
        id: data.id,
        name: data.name,
        type: data.type,
        owner: data.owner,
        images: data.images.length ? data.images : defaultSongImage,
        description: data.description,
        followers: data.followers,
        items: data.tracks.items
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