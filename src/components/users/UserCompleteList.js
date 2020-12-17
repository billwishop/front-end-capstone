import React, {useContext, useEffect, useState } from "react"
import { SongContext } from '../songs/SongProvider'
import { Route } from "react-router-dom";
import { ProfileNavBar } from "./UserProfileNav"
import { CompleteSongCard } from "../songs/CompleteSongs/CompleteSongCard";
import { UserContext} from "../users/UserProvider"

export const ProfileCompleteList = (props) => {
    const { songs, getSongs } = useContext(SongContext)
    const { users, getUsers } = useContext(UserContext)

    const [filteredSongs, SetSongs] = useState([])
    const [user, SetUser] = useState([])

    useEffect(() => {
        getSongs()
        .then(getUsers)
    }, [])

    /* 
        if the active user is viewing their own profile,
        the songs are filtered using the local storage.
        if the active user is viewing another user's 
        profile, they are filtered by the userId in the URL. 
    */
    useEffect(() => {
        if(props.match.params.userId){
            const completeSongs = songs.filter(s => s.userId === parseInt(props.match.params.userId) && s.completeURL !== "") 
            SetSongs(completeSongs.reverse())
        } else {
            const completeSongs = songs.filter(s => s.userId === parseInt(localStorage.getItem('app_user_id')) && s.completeURL !== "")
            SetSongs(completeSongs.reverse())
        }
    }, [songs])

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
                {filteredSongs.length
                    ? <div>
                    {
                        filteredSongs.map(song => {
                            return <CompleteSongCard key={song.id} completeSong={song} />
                        })
                    }
                    </div>
                    : "No completed songs to display"
                }     
            </div>
        </div>
    )
}