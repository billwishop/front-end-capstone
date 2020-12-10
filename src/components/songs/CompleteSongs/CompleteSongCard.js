import React from "react"
import { Link } from "react-router-dom"
import ReactAudioPlayer from 'react-audio-player';


export const CompleteSongCard = ({ completeSong }) => (
    <div className="audio__card">

        <h3 className="audio__title">
            <Link to={`/song/${completeSong.id}`}>
                {completeSong.songName}
            </Link>
        </h3>

        <div className="audio__username">
            <Link to={`/profile/${completeSong.userId}`}>
                {completeSong.user.name}
            </Link>
        </div>

        <ReactAudioPlayer
            key={completeSong.id}
            className="audio__player"
            src={completeSong.completeURL}
            controls
            />

    </div>

    
)

