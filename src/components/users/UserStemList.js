import React, {useContext, useEffect, useState } from "react"
import { StemCard } from '../stems/StemCard'
import { StemContext } from '../stems/StemProvider'
import { Route } from "react-router-dom";
import { ProfileNavBar } from "./UserProfileNav"

export const ProfileStemList = (props) => {
    const { stems, getStems } = useContext(StemContext)

    const [filteredStems, SetStems] = useState([])

    useEffect(() => {
        getStems()
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

    return (
        <div>
            <Route render={props => <ProfileNavBar {...props} />} />        
            <div>
                {
                    filteredStems.map(stem => {
                        return <StemCard key={stem.id} stem={stem} />
                    })
                }
        </div>
        </div>
    )
}