import React from "react"
import { Link } from "react-router-dom"
import ReactAudioPlayer from 'react-audio-player';


export const IncompleteSongCard = ({ incompleteSong }) => (
    <div className="audio__card">

        <h3 className="audio__title">
            <Link to={`/song/${incompleteSong.id}`}>
                {incompleteSong.songName}
            </Link>
        </h3>

        <div className="audio__username">
            <Link to={`/profile/incomplete/${incompleteSong.userId}`}>
                {incompleteSong.user.name}
            </Link>
        </div>

        <ReactAudioPlayer
            key={incompleteSong.id}
            className="audio__player"
            src={incompleteSong.incompleteURL}
            controls
            />

    </div>

    
)

