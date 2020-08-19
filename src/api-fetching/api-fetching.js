export const getCategories = async (token, setDiscover) => {
    if (!token) return;
    console.log(token)
    const categories = await fetch(`https://api.spotify.com/v1/browse/categories?limit=50`, {
        method: "GET",
        headers: {  
            "Accept": "application/json",
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}`
            }
        })
    
    const data = await categories.json();
    setDiscover(data.categories.items);
    return data.categories;
}

export const getCategoriesPlaylists = async(token, category_id, setDiscoverPlaylist) => {
    if(!token) return;

    const categoryPlaylists = await fetch(`https://api.spotify.com/v1/browse/categories/${category_id}/playlists?limit=50`, {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })

    const data = await categoryPlaylists.json();
    setDiscoverPlaylist(data.playlists.items);
    return data;
}

export const myPlaylist = async (token, setUserPlaylist) => {
    if(!token) return;

    const myPlaylist = await fetch(`https://api.spotify.com/v1/me/playlists?limit=50`, {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })

    const data = await myPlaylist.json();
    setUserPlaylist(data.items);
    return data;
}

export const myPlaylistTracks = async (token, playlist_id, setUserPlaylistTracks, userPlaylistTracks) => {
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
        items: [...data.items]
    })
    return data;
}

export const fetchAnything = async (token, fetchURL, setState) => {
    if(!token) return;

    const myPlaylistTracks = await fetch(`${fetchURL}`, {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })

    const data = await myPlaylistTracks.json();
    setState(data);
    return data;
}