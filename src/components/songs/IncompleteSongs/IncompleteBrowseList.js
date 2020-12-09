import React, { useContext, useEffect, useState } from "react"
import { IncompleteSongCard } from './IncompleteSong'
import { SongContext } from '../SongProvider'

export const IncompleteBrowseList = props => {
    const { songs, getSongs } = useContext(SongContext)

    const [song, SetSong] = useState([])

    useEffect(() => {
        getSongs()
    }, [])

    useEffect(() => {

            // incomplete songs that do not belong to the active user
            const browseSongs = songs.filter(s => s.userId !== parseInt(localStorage.getItem('app_user_id')) && s.completeURL === "")
            console.log('browseSongs', browseSongs)
            SetSong(browseSongs)
        
    }, [songs])

    return (
        <div>
            {
                song.map(song => {
                    return <IncompleteSongCard key={song.id} incompleteSong={song} />
                })
            }
        </div>
    )
}

