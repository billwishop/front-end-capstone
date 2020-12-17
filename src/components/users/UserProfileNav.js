import React from "react"
import {NavLink} from "react-router-dom"
import './UserProfileNav.css'


// sub navbar for the profile section
export const ProfileNavBar = props => {
    
    // if a userId is attached to the existing link, the userId will 
    // remain on the other links to ensure the user continues to view the same profile
        if(props.match.params.userId){
            return (
                <div>
                <ul className="profileNavbar">
                    <li className="profileNavbar__item">
                        <NavLink className="profileNavbar__NavLink" to={`/profile/incomplete/${props.match.params.userId}`}
                            style={{
                                color: 'black',
                                }}
                            activeStyle={{
                                fontWeight: 'bold',
                            }}>incomplete</NavLink>
                    </li>
                    <li className="profileNavbar__item">
                        <NavLink className="profileNavbar__NavLink" to={`/profile/complete/${props.match.params.userId}`}
                            style={{
                                color: 'black',
                                textDecoration: 'none'
                                }}
                            activeStyle={{
                                fontWeight: 'bold',
                            }}>complete</NavLink>
                    </li>
                    <li className="profileNavbar__item">
                        <NavLink className="profileNavbar__NavLink" to={`/profile/stem/${props.match.params.userId}`}
                            style={{
                                color: 'black',
                                textDecoration: 'none'
                                }}
                            activeStyle={{
                                fontWeight: 'bold',
                            }}>stems</NavLink>
                    </li>
                </ul>
            </div>
        )
    } else {
        return (
            <div>
                <ul className="profileNavbar">
                    <li className="profileNavbar__item">
                        <NavLink className="profileNavbar__NavLink" to="/profile/incomplete"
                            style={{
                                color: 'black',
                                textDecoration: 'none'
                                }}
                            activeStyle={{
                                fontWeight: 'bold',
                            }}>incomplete</NavLink>
                    </li>
                    <li className="profileNavbar__item">
                        <NavLink className="profileNavbar__NavLink" to="/profile/complete"
                            style={{
                                color: 'black',
                                textDecoration: 'none'
                                }}
                            activeStyle={{
                                fontWeight: 'bold',
                            }}>complete</NavLink>
                    </li>
                    <li className="profileNavbar__item">
                        <NavLink className="profileNavbar__NavLink" to="/profile/stem"
                            style={{
                                color: 'black',
                                textDecoration: 'none'
                                }}
                            activeStyle={{
                                fontWeight: 'bold',
                            }}>stems</NavLink>
                    </li>
                </ul>
            </div>
        )
    }

}


