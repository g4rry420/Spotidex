import React from 'react'
import { Link } from "react-router-dom"

import "./items.styles.css"

export default function Items({ path,heading,name, onclick, url, type, release_date }) {
    return (
        <div className="col-md-3 col-sm-4 col-6 mb-3 column-md" onClick={onclick}>
            <Link to={{pathname:`${path}`, state:{ heading, image: url, type, release_date  } }}>
                <div className="items-container">
                    <div className="items-img-container">
                        <img src={url} alt="items"/>
                    </div>
                    {
                        name !== undefined ?   <h4> {name} </h4> : null
                    }
                </div>
            </Link>
        </div>
    )
}
