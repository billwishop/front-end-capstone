import React, { useState, useEffect, useContext } from 'react'
import { SongContext } from './SongProvider'
import { StemContext } from '../stems/StemProvider'
import { SongDetailsCard } from './SongDetailsCard'
import { StemCard } from '../stems/StemCard'

export const SongDetail = props => {
    const {songs, getSongs} = useContext(SongContext)
    const {stems, getStems} = useContext(StemContext)

    // set individual song object
    const [song, setSong] = useState({})
    // filtered stem array
    const [filteredStems, setStems] = useState([])

    useEffect(() => {
        getSongs()
        .then(getStems)
    }, [])

    // find the song id and set the state
    useEffect(() => {
        const song = songs.find(s => s.id === parseInt(props.match.params.songId)) || {}
        setSong(song)
    }, [songs])
    
    // find the corresponding stems and set the state
    useEffect(() => {
        const filteredStems = stems.filter(s => s.songId === parseInt(props.match.params.songId)) 
        setStems(filteredStems)
    }, [stems])

    console.log("song:", song)
    console.log("stems", filteredStems)



    
    return (
        <div className="song__card">

            <section className="song__left">

                <div className="song__initial">
                    {song.id ?<SongDetailsCard key={song.id} song={song} /> :"Song Not Found"} 
                </div>
                <div className="stems">
                    {
                        filteredStems.map(stem => {
                            return <StemCard key={stem.id} stem={stem} />
                        })
                    }
                </div>
            </section>

            <section className="song__right">

            </section>

        </div>
    )
}
