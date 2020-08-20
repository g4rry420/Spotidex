import React from 'react'
import { Link } from 'react-router-dom';

import "./circle-items.styles.css"
import { fetchAnything } from '../../api-fetching/api-fetching'

export default function CircleItems({ title, propsToMap, className, token, setSTATE, onclick, path  }) {
    return (
        <div className={`circle-items-container ${className}`}>
            <div className="text-center my-2 mb-4">
                <h3>{ title }</h3>
            </div>
            <ul className="circle-items d-flex justify-content-between">
                { propsToMap ? propsToMap.map(item => (
                    <li key={item.id} className="d-flex flex-column" onClick={onclick} onClick={() => {
                        fetchAnything(token, item.href, setSTATE );
                    }}>
                        <Link to={`/${path}/${item.id}`}>
                            <img src={item.images[0].url} alt="circle item"/>
                            <div className="text-center">
                                <p> {item.name} </p>
                            </div>
                        </Link>
                    </li>
                )) : (
                    <p>Loading...</p>
                )}
            </ul>
        </div>
    )
}
