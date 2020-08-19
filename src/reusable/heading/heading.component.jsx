import React from 'react'

import "./heading.styles.css"

export default function Heading({title,display, heading}) {
    return (
        <div className="main-heading">
            <div className="container">
                <h1 className={`${display} font-weight-bold ${heading}`}>{title}</h1>
            </div>
        </div>
    )
}
