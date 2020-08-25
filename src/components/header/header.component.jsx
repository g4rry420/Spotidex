import React, { useRef, useEffect, useContext } from 'react'
import { Link, withRouter } from 'react-router-dom'

import "./header.styles.css"
import { MainContext } from '../../context/mainContext/mainContext';
import { fetchAnything } from '../../api-fetching/api-fetching';

function Header(props) {
    const navLink = useRef();
    const burgerButton = useRef();
    const mobileLinks = useRef();
    const navElement = useRef();

    const { token ,setSearchResult, searchValue, setSearchValue, currentUser} = useContext(MainContext);


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
    }

    useEffect(() => {
        const query = searchValue.split(" ").join("%20");

        props.history.push(`/search/${query}`);

        if(searchValue.length){
            const type = "&type=artist%2Cplaylist%2Ctrack";
            const fetch = `https://api.spotify.com/v1/search?q=${query}${type}`;
            fetchAnything(token, fetch, setSearchResult);
        }

        if(searchValue.length === 0) {
            props.history.push("/");
        }

    }, [searchValue])

    const handleBurgerButton = () => {
        navElement.current.classList.toggle("nav-element");

        burgerButton.current.classList.toggle("burger-button-slide");
        burgerButton.current.classList.toggle("burger-button-close");

        mobileLinks.current.classList.toggle("nav-list-mobile-display");
    }

    const handleLink = () => {
        navElement.current.classList.remove("nav-element");

        burgerButton.current.classList.remove("burger-button-slide");
        burgerButton.current.classList.remove("burger-button-close");

        mobileLinks.current.classList.remove("nav-list-mobile-display");
    }

    return (
        <nav ref={navElement}>
            <div className="container p-0 pt-4 pb-4 px-3 d-flex justify-content-between">
                <div className="navbar-logo">
                    <Link to="/">Spotidex</Link>
                </div>
                <ul ref={navLink} className="mt-1 p-0 nav-list-desktop d-flex justify-content-between">
                    <li className="list-menu-desktop"><Link to="/"> My Music</Link></li>
                    <li className="list-menu-desktop"><Link to="/discover"> Discover</Link></li>
                    <li className="list-menu-desktop"><Link to="/new-releases"> New Releases</Link></li>
                </ul>
                <div className="md-form mt-0 search-bar">
                    <input className="form-control" type="text" value={searchValue} onChange={handleSearch} placeholder="Search" aria-label="Search" />
                </div>
               
                <div className="user-profile-main-container">
                {
                    currentUser ? (
                        <div className="user-profile-container">
                            <div className="user-profile">
                                <h5>{currentUser.display_name}</h5>
                                <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-chevron-down" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                                </svg>
                            </div>
                            <div className="dropdown-content" onClick={() => window.location.reload()}>
                                    <span>Logout</span>
                            </div>
                        </div>
                    ) : (
                        null
                    )
                }
                </div>
                
            </div>
            <div className="mobile">
                <ul ref={mobileLinks} className="nav-list-mobile d-flex flex-column">
                    <li><Link onClick={handleLink} to="/"> My&nbsp;Music </Link></li>
                    <li><Link onClick={handleLink} to="/discover"> Discover </Link></li>
                    <li><Link onClick={handleLink} to="/new-releases"> New&nbsp;Releases </Link></li>
                </ul>
                <button ref={burgerButton} className="burger-button" onClick={handleBurgerButton}>
                    <span className="burger-lines"></span>
                </button>
            </div>

        </nav>
    )
}

export default withRouter(Header);