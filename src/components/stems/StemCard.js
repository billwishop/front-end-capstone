import React, { useContext } from "react"
import { Link } from "react-router-dom"
import ReactAudioPlayer from 'react-audio-player';
import { StemContext } from './StemProvider'
import { Button } from 'react-bootstrap'



export const StemCard = ({ stem }) => {
    const {deleteStem} = useContext(StemContext)

    return (

        <div className={`audio__card ${stem.chosen ? 'featured' : ''}`}>
        
        <h3 className="audio__title">
            {stem.name}

        </h3>
            {window.location.href.includes('profile') ?
                <>
                <div>
                {stem.chosen ? `Featured on ` : "Submitted to "}  
                <Link to={`/song/${stem.songId}`}>
                    {stem.song.songName} 
                    </Link>
                </div>
                </>
                :<>{stem.chosen ? "|| featured ||" :""}</>}
        

        {stem.userId === parseInt(localStorage.getItem("app_user_id"))
            ?   <Button className='btn' onClick={evt =>{
                evt.preventDefault()
                deleteStem(stem.id)}
            }>delete</Button>
            
            :   <div className="audio__username">
                    <Link  to={`/profile/incomplete/${stem.userId}`}>
                        {stem.user.name}
                    </Link>
                </div>
        }
        
        <div className="audio__description">
            Description: {stem.description}
        </div>

        <ReactAudioPlayer
            key={stem.id}
            
            src={stem.url}
            controls
            />

        </div>
    )
}