import React, { useContext } from 'react'
import { Link } from 'react-router-dom';

import "./homepage.styles.css"
import Login from '../../components/login/login.component';
import { MainContext } from '../../context/mainContext/mainContext';

export default function Homepage() {
    const { token, discover } = useContext(MainContext)

    console.log(discover)
    return (
        <div>
        {
            !token ?  <Login />
                : <div className="container-fluid discover-main-container">
                  <div className="discover-heading">
                    <div className="container">
                      <h1 className="display-3 font-weight-bold ">Discover</h1>
                    </div>
                  </div>
                    <div className="container">
                      <div className="row">
                        {
                          discover ? (
                            discover.map(discover => (
                              <div className="col-md-3 mb-3" key={discover.id}>
                                <Link>
                                  <div className="discover-container">
                                    <div className="discover-img-container">
                                      <img src={discover.icons[0].url} alt="discover"/>
                                    </div>
                                    <h4> {discover.name} </h4>
                                  </div>
                                </Link>
                              </div>
                            ))
                          ) : (
                            <p>You do not have categoryies</p>
                          )
                        }
                      </div>
                    </div>
                  </div>
        }
        </div>
    )
}
