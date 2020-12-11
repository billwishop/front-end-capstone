import React from "react"
import {Link} from "react-router-dom"
import "./NavBar.css"

export const NavBar = props => {
    return (
        <ul className="navbar">
            <li className="navbar__item">
                <div className="logo">
                    || featurist ||
                </div>               
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/">browse</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/upload">upload</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/profile/incomplete">profile</Link>
            </li>
        </ul>
    )
}