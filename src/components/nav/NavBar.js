import React, { useContext, useEffect, useState } from "react"
import {NavLink} from "react-router-dom"
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
                    || featured ||
                </div>               
            </li>
            <li className="navbar__item">
                <NavLink className="navbar__link" exact to="/"
                    style={{
                        color: 'black',
                        textDecoration: 'underline'
                        }}
                    activeStyle={{
                        fontWeight: 'bold',
                        textDecoration: 'none'
                    }}>browse</NavLink>
            </li>
            <li className="navbar__item">
                <NavLink className="navbar__link" to="/upload"
                    style={{
                        color: 'black',
                        textDecoration: 'underline'
                        }}
                    activeStyle={{
                        fontWeight: 'bold',
                        textDecoration: 'none'
                    }}>upload</NavLink>
            </li>
            <li className="navbar__item">
                <NavLink className="navbar__link" to="/profile/incomplete"
                    style={{
                        color: 'black',
                        textDecoration: 'underline'
                        }}
                    activeStyle={{
                        fontWeight: 'bold',
                        textDecoration: 'none'
                    }}>profile</NavLink>
            </li>
            <li className="navbar__item">
                <div className="activeUser">
                    {(activeUser ?activeUser.name :"")}
                </div>               
            </li>
        </ul>
    )
}