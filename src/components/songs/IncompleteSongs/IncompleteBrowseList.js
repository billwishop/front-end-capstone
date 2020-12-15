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
        <div className="song__card">
            <div className="song__browse">
                <div className="song__left">
                {
                    filteredSongs.map(song => {
                        return <IncompleteSongCard key={song.id} incompleteSong={song} />
                    })
                }
                </div>
            </div>
                <div className="song__right">
                    <h1>
                        featurist - a collaborative musical environment
                    </h1>
                    <div>
                        browse from and contribute to unfinished music projects from other users. 
                        if you find a song you like, click on the title to see what other users have uploaded
                        and contribute a stem to the song to be considered for the final version.
                    </div>
                </div>
        </div>
    )
}

