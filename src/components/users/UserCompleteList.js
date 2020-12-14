import React, {useContext, useEffect, useState } from "react"
import { SongContext } from '../songs/SongProvider'
import { Route } from "react-router-dom";
import { ProfileNavBar } from "./UserProfileNav"
import { CompleteSongCard } from "../songs/CompleteSongs/CompleteSongCard";

export const ProfileCompleteList = (props) => {
    const { songs, getSongs } = useContext(SongContext)

    const [filteredSongs, SetSongs] = useState([])

    useEffect(() => {
        getSongs()
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
            SetSongs(completeSongs)
        } else {
            const completeSongs = songs.filter(s => s.userId === parseInt(localStorage.getItem('app_user_id')) && s.completeURL !== "")
            SetSongs(completeSongs)
        }
    }, [songs])

    return (
        <div>
            <Route render={props => <ProfileNavBar {...props} />} />   
            {filteredSongs.length
                ? <div>
                {
                    filteredSongs.map(song => {
                        return <CompleteSongCard key={song.id} completeSong={song} />
                    })
                }
                </div>
                : "You have not yet marked a song as complete"
            }     
        </div>
    )
}