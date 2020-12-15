import React, {useContext, useEffect, useState } from "react"
import { IncompleteSongCard } from '../songs/IncompleteSongs/IncompleteSongCard'
import { SongContext } from '../songs/SongProvider'
import { Route } from "react-router-dom";
import { ProfileNavBar } from "./UserProfileNav"

export const ProfileIncompleteList = (props) => {
    const { songs, getSongs } = useContext(SongContext)

    const [filteredSongs, SetSongs] = useState([])

    useEffect(() => {
        getSongs()
    }, [])

    /* 
        if the active user is viewing their own profile
        the songs are filtered using the local storage.
        if the active user is viewing another user's 
        profile, they are filtered by the userId in the URL. 
    */
    useEffect(() => {
        if(props.match.params.userId){
            const incompleteSongs = songs.filter(s => s.userId === parseInt(props.match.params.userId) && s.completeURL === "") 
            SetSongs(incompleteSongs)
        } else {
            const incompleteSongs = songs.filter(s => s.userId === parseInt(localStorage.getItem('app_user_id')) && s.completeURL === "")
            SetSongs(incompleteSongs)
        }
    }, [songs])

    return (
        <div className="profile">
            <Route render={props => <ProfileNavBar {...props} />} />        
            {filteredSongs.length 
                ? <div>
                {
                    filteredSongs.map(song => {
                        return <IncompleteSongCard key={song.id} incompleteSong={song} />
                    })
                }
                </div>
                : "No incomplete songs to display"}
        </div>
    )
}