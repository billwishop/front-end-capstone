import React, { useContext, useEffect, useState } from "react"
import { IncompleteSongCard } from './IncompleteSongCard'
import { SongContext } from '../SongProvider'
import { RequestContext } from '../../requests/RequestProvider'
import { RequestSongContext } from '../../requestSongRelationships/RequestSongProvider'

export const IncompleteBrowseList = () => {
    const { songs, getSongs } = useContext(SongContext)
    const { requests, getRequests } = useContext(RequestContext)
    const { requestSongs, getRequestSongs } = useContext(RequestSongContext)

    const [filteredSongs, SetSong] = useState([])
    const [selectedRequests, setSelectedRequests] = useState([])
    const [filteredByRequest, setFilteredByRequest] = useState([])

    useEffect(() => {
        getSongs()
        .then(getRequests)
        .then(getRequestSongs)
    }, [])

    useEffect(() => {
        // incomplete songs that do not belong to the active user
        const browseSongs = songs.filter(s => s.userId !== parseInt(localStorage.getItem('app_user_id')) && s.completeURL === "") 
        SetSong(browseSongs)
    }, [songs])

    useEffect(() => {
        // song/request relationship table(s) filtered by selected request(s)
        const filteredRelationships = requestSongs.filter(rel => {
            return selectedRequests.find(selected => selected === rel.requestId)
        })
        console.log('requestSongs',requestSongs,'filteredRelationships:',filteredRelationships);
        // filtering selected relationships 
        const filteredByRequest = filteredSongs.filter(s => {
            return filteredRelationships.find(rel => s.id === rel.songId)
        })
        setFilteredByRequest(filteredByRequest)
        console.log('filteredByRequest:', filteredByRequest, 'filteredSongs:', filteredSongs)  

    }, [selectedRequests])

    const checkboxControl = (evt) => {
        // check if box is being unchecked vs checked
        if(evt.target.checked === true){
            setSelectedRequests(prev => [...prev, parseInt(evt.target.id)])
            console.log('selected', evt.target.id, 'selectedRequests:', selectedRequests);
        } else {
            // remove item from array if unchecked
            const removed = selectedRequests.filter(id => id != parseInt(evt.target.id))
            setSelectedRequests(removed)
    } 
}

    return (
        <div className="song__card">
            <div className="song__browse">
                <div className="song__left">
                    <div className="filter">
                    <h3>
                        filter 
                    </h3>
                        <h3>
                        || by request:                         
                        </h3>
                    <br></br>
                        {
                        requests.map(r => {
                            return (
                                <div className="filter__item">
                                    <input key={r.id} className="filter__checkbox" type="checkbox" value={r.type} id={r.id} 
                                        onClick={evt=>{
                                            checkboxControl(evt)
                                        }}/>  
                                    <label key={r.type} className="filter__label" htmlFor={r.type}>{r.type}</label> 
                                </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="song__left">
                    {selectedRequests.length 
                        ? filteredByRequest.map(song => {
                            return <IncompleteSongCard key={song.id} incompleteSong={song} />
                        })
                        : filteredSongs.map(song => {
                            return <IncompleteSongCard key={song.id} incompleteSong={song} />
                        })}
                {
                    
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

