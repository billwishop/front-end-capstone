import React, {useState} from 'react'

export const RequestSongContext = React.createContext()

export const RequestSongProvider = props => {
    const [requestSongs, setRequestSongs] = useState([])

    const getRequestSongs = () => {
        return fetch("http://localhost:8088/requestsongrelationships/?_expand=request")
            .then(res => res.json())
            .then(setRequestSongs)
    }

    const addRequestSong = (relationshipObj) => {
        return fetch("http://localhost:8088/requestsongrelationships", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(relationshipObj)
        })
            .then(getRequestSongs)
    }



    const deleteRequestSong = relationshipId => {
        return fetch(`http://localhost:8088/requestsongrelationships/${relationshipId}`, {
            method: "DELETE"
        })
            .then(getRequestSongs)
    }

    return (
        <RequestSongContext.Provider value={
            {
                requestSongs, getRequestSongs, addRequestSong, deleteRequestSong
            }
        }>
            {props.children}
        </RequestSongContext.Provider>
    )
}