import React, { useState, useEffect, useContext } from 'react'
import { SongContext } from './SongProvider'
import { StemContext } from '../stems/StemProvider'
import { StemCard } from '../stems/StemCard'
import './Song.css'
import { CompleteSongCard } from './CompleteSongs/CompleteSongCard'
import { IncompleteSongCard } from './IncompleteSongs/IncompleteSongCard'
import { RequestSongContext } from '../requestSongRelationships/RequestSongProvider'
import Button from 'react-bootstrap/Button'

export const SongDetail = props => {
    const {songs, getSongs} = useContext(SongContext)
    const {stems, getStems} = useContext(StemContext)
    const { requestSongs, getRequestSongs } = useContext(RequestSongContext)

    // set individual song object
    const [song, setSong] = useState({})
    // filtered stem array
    const [filteredStems, setStems] = useState([])
    // request song relationships
    const [relationships, setRelationships] = useState([])

    useEffect(() => {
        getSongs()
        .then(getStems)
        .then(getRequestSongs)
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

    // find the request relationship tables for this song
    useEffect(() => {
        const relationships = requestSongs.filter(rel => rel.songId === parseInt(props.match.params.songId))
        setRelationships(relationships)
    }, [requestSongs])

    
    return (
        <div className="song__card">

            <section className="song__left">

                <div className="song__details">
                    {song.completeURL ? 
                                        <>
                                            <h1 className="song__header">complete track</h1> 
                                            {(song.id ?<CompleteSongCard key={`complete--${song.id}`} completeSong={song} /> :"Song Not Found")}
                                            <h2 className="song__header">original upload</h2> 
                                            {(song.id ?<IncompleteSongCard key={`incomplete--${song.id}`} incompleteSong={song} /> :"Song Not Found")}
                                        </>
                                        : 
                                        <>
                                            <h1 className="song__header">original upload</h1> 
                                            {(song.id ?<IncompleteSongCard key={`incomplete--${song.id}`} incompleteSong={song} /> :"Song Not Found")}
                                        </>
                    }
                </div>
                <div className="stems">
                    {filteredStems.length
                        ? (filteredStems.length > 1 
                            ? <h2 className="stems__header">stem submissions</h2>
                            : <h2 className="stems__header">stem submission</h2>
                        )
                        : "no stem submissions yet"
                    }
                    
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
                        :<Button variant='primary' className="btn" 
                            onClick={evt =>{
                            evt.preventDefault()
                            props.history.push(`/song/stem/${song.id}`)}
                            }>add to the song</Button>}

                    {(song.completeURL || parseInt(localStorage.getItem("app_user_id")) !== song.userId)
                        ? "" 
                        :<Button variant='primary' className="btn"
                            onClick={evt =>{
                            evt.preventDefault()
                            props.history.push(`/song/complete/${song.id}`)}
                            }>mark as complete</Button>}
                    
                    {song.completeURL
                        ? <div className='song__statusSection'>
                            <h3 className='song__status'>complete</h3>
                            <div className='song__description'>{song.completeDescription}</div>
                            <br />
                            <h3 className='song__status'>original request</h3>
                            <div className='song__description'>{song.incompleteDescription}</div>
                        </div>
 
                        : <div className='song__statusSection'>
                        <h3 className='song__status'>in progress</h3>
                        <div className='song__description'>{song.incompleteDescription}</div>
                        </div>    
                        }

                    {relationships.length
                        ? <div className='song__requests'>
                        <h3 className='song__requestHeading'>looking for:</h3>
                        {relationships.map((req)=> {
                            return <div key={req.request.id} className='request'>{req.request.type}</div>
                        })}

                        </div> 
                        :""
                    }

                        
            </section>

        </div>
    )
}

