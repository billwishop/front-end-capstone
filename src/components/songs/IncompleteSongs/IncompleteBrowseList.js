import React, { useContext, useEffect, useState } from "react"
import { IncompleteSongCard } from './IncompleteSongCard'
import { SongContext } from '../SongProvider'

export const IncompleteBrowseList = () => {
    const { songs, getSongs } = useContext(SongContext)

    const [filteredSongs, SetSong] = useState([])

    useEffect(() => {
        getSongs()
    }, [])

    useEffect(() => {

        // incomplete songs that do not belong to the active user
        const browseSongs = songs.filter(s => s.userId !== parseInt(localStorage.getItem('app_user_id')) && s.completeURL === "") 
        SetSong(browseSongs)
    }, [songs])

    return (
        <div>
            {
                filteredSongs.map(song => {
                    return <IncompleteSongCard key={song.id} incompleteSong={song} />
                })
            }
        </div>
    )
}

