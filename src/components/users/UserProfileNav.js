import React, { useEffect, useState } from "react"
import {Link} from "react-router-dom"
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
                        <Link className="profileNavbar__link" to={`/profile/incomplete/${props.match.params.userId}`}>incomplete</Link>
                    </li>
                    <li className="profileNavbar__item">
                        <Link className="profileNavbar__link" to={`/profile/complete/${props.match.params.userId}`}>complete</Link>
                    </li>
                    <li className="profileNavbar__item">
                        <Link className="profileNavbar__link" to={`/profile/stem/${props.match.params.userId}`}>stems</Link>
                    </li>
                </ul>
            </div>
        )
    } else {
        return (
            <div>
                <ul className="profileNavbar">
                    <li className="profileNavbar__item">
                        <Link className="profileNavbar__link" to="/profile/incomplete">incomplete</Link>
                    </li>
                    <li className="profileNavbar__item">
                        <Link className="profileNavbar__link" to="/profile/complete">complete</Link>
                    </li>
                    <li className="profileNavbar__item">
                        <Link className="profileNavbar__link" to="/profile/stem">stems</Link>
                    </li>
                </ul>
            </div>
        )
    }

}


