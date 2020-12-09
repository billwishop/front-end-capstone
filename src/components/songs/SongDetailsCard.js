import React from "react"
import { Link } from "react-router-dom"
import ReactAudioPlayer from 'react-audio-player';


export const SongDetailsCard = ({ song }) => (
    
    <div className="audio__card">
        
        <h3 className="audio__title">
            <Link to={`/song/${song.id}`}>
                {song.songName}
            </Link>
        </h3>

        <div className="audio__username">
            <Link to={`/profile/${song.userId}`}>
                {song.user.name}
            </Link>
        </div>

        <ReactAudioPlayer
            key={song.id}
            className="audio__player"
            src={song.incompleteURL}
            controls
            />

    </div>
)

