import React, { useState, useEffect, useContext } from 'react'
import { SongContext } from './SongProvider'
import { StemContext } from '../stems/StemProvider'
import { SongDetailsCard } from './SongDetailsCard'
import { StemCard } from '../stems/StemCard'
import './Song.css'
import { CompleteSongForm } from './CompleteSongs/CompleteForm'

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
                    {(song.completeURL || parseInt(localStorage.getItem("app_user_id")) === song.userId)
                        ? "" 
                        :<button>add to the song</button>}

                    {(song.completeURL || parseInt(localStorage.getItem("app_user_id")) !== song.userId)
                        ? "" 
                        :<button onClick={evt =>{
                            evt.preventDefault()
                            props.history.push(`/song/complete/${song.id}`)}
                            }>mark as complete</button>}
                    
                    {song.completeURL
                        ? <div className='song__statusSection'>
                            <h3 className='song__status'>complete</h3>
                            <div className='song__description'>{song.completeDescription}</div>
                        </div>
                        : <div className='song__statusSection'>
                        <h3 className='song__status'>in progress</h3>
                        <div className='song__description'>{song.incompleteDescription}</div>
                        </div>    
                        }
                        
            </section>

        </div>
    )
}

