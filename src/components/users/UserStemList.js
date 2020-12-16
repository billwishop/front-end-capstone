import React, {useContext, useEffect, useState } from "react"
import { StemCard } from '../stems/StemCard'
import { StemContext } from '../stems/StemProvider'
import { Route } from "react-router-dom";
import { ProfileNavBar } from "./UserProfileNav"
import { UserContext} from "../users/UserProvider"

export const ProfileStemList = (props) => {
    const { stems, getStems } = useContext(StemContext)
    const { users, getUsers } = useContext(UserContext)

    const [filteredStems, SetStems] = useState([])
    const [user, SetUser] = useState([])

    useEffect(() => {
        getStems()
        .then(getUsers)
    }, [])

    /* 
        if the active user is viewing their own profile
        the stems are filtered using the local storage.
        if the active user is viewing another user's 
        profile, they are filtered by the userId in the URL. 
    */
    useEffect(() => {
        if(props.match.params.userId){
            const filtered = stems.filter(s => s.userId === parseInt(props.match.params.userId)) 
            SetStems(filtered)
        } else {
            const filtered = stems.filter(s => s.userId === parseInt(localStorage.getItem('app_user_id')))
            SetStems(filtered)
        }
    }, [stems])

        // filters for the owner of the profile that is being viewed and sets the state for use in the render
        useEffect(() => {
            if(props.match.params.userId){
                const profileUser = users.filter(u => u.id === parseInt(props.match.params.userId)) 
                SetUser(profileUser)
            } else {
                const profileUser = users.filter(u => u.id === parseInt(localStorage.getItem('app_user_id')))
                SetUser(profileUser)
            }
        }, [users])

    return (
        <div className="profile">
            <Route render={props => <ProfileNavBar {...props} />} />    

            <div>
                {user.length
                        ? 
                        user.map(u => {
                            return <h1 className="profile__name">{u.name}</h1>
                        })
                        :''
                    }    
                {filteredStems.length 
                    ? <div>
                    {
                        filteredStems.map(stem => {
                            return <StemCard key={stem.id} stem={stem} />
                        })
                    }
                    </div>
                    : "No stems to display"}
            </div>
        </div>
    )
}