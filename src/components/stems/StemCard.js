import React from "react"
import { Link } from "react-router-dom"
import ReactAudioPlayer from 'react-audio-player';


export const StemCard = ({ stem }) => (

    <div className="audio__card">
        
        <h3 className="audio__title">
            {stem.chosen ? "FEATURED - " : ""}   
            {stem.name}
        </h3>

        <div className="audio__username">
            <Link to={`/profile/${stem.userId}`}>
                {stem.user.name}
            </Link>
        </div>

        <div className="audio__description">
            description: {stem.description}
        </div>

        <ReactAudioPlayer
            key={stem.id}
            className={`audio__player ${stem.chosen ? 'featured' : ''}`}
            src={stem.url}
            controls
            />

    </div>
            
)