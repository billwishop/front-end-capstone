import React, { useContext, useEffect, useState } from "react"
import {Link} from "react-router-dom"
import "./NavBar.css"
import { UserContext } from '../users/UserProvider'


export const NavBar = props => {
    const { users, getUsers } = useContext(UserContext)

    const [activeUser, setUser] = useState([])

    useEffect(() => {
        getUsers()
    }, [])

    // filters the users by the active user's id
    useEffect(() => {
        const filteredUser = users.find(u => u.id === parseInt(localStorage.getItem('app_user_id')))
        setUser(filteredUser)
    }, [users])

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
            <li className="navbar__item">
                <div className="activeUser">
                    {(activeUser ?activeUser.name :"")}
                </div>               
            </li>
        </ul>
    )
}