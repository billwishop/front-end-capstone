import React, {useState} from "react"

export const SongContext = React.createContext()

export const SongProvider = props => {
    const [songs, setSongs] = useState([])

    const getSongs = () => {
        return fetch("http://localhost:8088/songs")
            .then(res => res.json())
            .then(setSongs)
    }
    
    const addSong = (song) => {
        return fetch("http://localhost:8088/songs", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(song)
        })
            .then(getSongs)
    }

    const deleteSong = songId => {
        return fetch(`http://localhost:8088/songs/${songId}`, {
            method: "DELETE"
        })
            .then(getSongs)
    }

    return (
        <SongContext.Provider value={
            {
                songs, addSong, getSongs, deleteSong
            }
        }>
            {props.children}
        </SongContext.Provider>
    )
}