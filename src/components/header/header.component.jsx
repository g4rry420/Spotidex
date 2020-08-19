import React, { useRef, useEffect, useContext } from 'react'
import { Link, withRouter } from 'react-router-dom'

import "./header.styles.css"
import { MainContext } from '../../context/mainContext/mainContext';
import { fetchAnything } from '../../api-fetching/api-fetching';

function Header(props) {
    const navLink = useRef();

    const { token ,setSearchResult, searchValue, setSearchValue } = useContext(MainContext);
    
    useEffect(() => {
        if(!navLink.current) return;

        for (let index = 0; index < navLink.current.childNodes.length; index++) {
            const element = navLink.current.childNodes[index];

            if(element.children[0].pathname === props.location.pathname){
                element.children[0].classList.add("active-link");
            }else{
                element.children[0].classList.remove("active-link");
            }
        }
    }, [props.location.pathname])

    const handleSearch = (e) => {
        setSearchValue(e.target.value);
        props.history.push(`/search/${searchValue}`);

        if(searchValue === "") {
            props.history.push("/");
        }
    }

    useEffect(() => {
        const query = searchValue.split(" ").join("%20");
        const type = "&type=artist%2Cplaylist%2Ctrack";
        const fetch = `https://api.spotify.com/v1/search?q=${query}${type}`;

        fetchAnything(token, fetch, setSearchResult);

    }, [searchValue])

    return (
        <nav>
            <div className="container p-0 pt-4 pb-4 px-3 d-flex justify-content-between">
                <div className="navbar-logo">
                    <Link to="/">Spotidex</Link>
                </div>
                <ul ref={navLink} className="mt-1 p-0 nav-list-desktop d-flex justify-content-between">
                    <li className="list-menu-desktop"><Link to="/"> My Music</Link></li>
                    <li className="list-menu-desktop"><Link to="/discover"> Discover</Link></li>
                    <li className="list-menu-desktop"><Link to="/new-releases"> New Releases</Link></li>
                </ul>
                <div class="md-form mt-0 search-bar">
                    <input class="form-control" type="text" value={searchValue} onChange={handleSearch} placeholder="Search" aria-label="Search" />
                </div>
                <div className="user-profile">
                </div>
            </div>
        </nav>
    )
}

export default withRouter(Header);