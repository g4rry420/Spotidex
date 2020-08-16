import React from 'react'
import { Link } from 'react-router-dom'

import "./header.styles.css"

export default function Header() {
    return (
        <nav>
            <div className="container p-0 pt-4 pb-4 px-3 d-flex justify-content-between">
                <div className="navbar-logo">
                    <Link to="/">Spotidex</Link>
                </div>
                <ul className="mt-1 p-0 nav-list-desktop d-flex justify-content-between">
                    <li className="list-menu-desktop"><Link to="/"> My Music</Link></li>
                    <li className="list-menu-desktop"><Link to="/discover"> Discover</Link></li>
                    <li className="list-menu-desktop"><Link> New Releases</Link></li>
                </ul>
                <div>
                    <input type="search" name="search" />
                </div>
                <div className="user-profile">
                </div>
            </div>
        </nav>
    )
}
