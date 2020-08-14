


export const getCategories = async (token, setDiscover) => {
    if(token){
        console.log(token)
        const userProfile = await fetch(`https://api.spotify.com/v1/browse/categories?limit=50`, {
        method: "GET",
        headers: {  
            "Accept": "application/json",
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}`
            }
        })
        
        const data = await userProfile.json();
        setDiscover(data.categories.items);
        return data.categories;
    }
}
