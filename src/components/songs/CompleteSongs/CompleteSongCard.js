import React, { useContext } from "react"
import { Link } from "react-router-dom"
import ReactAudioPlayer from 'react-audio-player';
import { SongContext } from '../SongProvider'


export const CompleteSongCard = ({ completeSong }) => {
    const {deleteSong} = useContext(SongContext)
    return (
        
        <div className="audio__card">

            <h3 className="audio__title">
                <Link to={`/song/${completeSong.id}`}>
                    {completeSong.songName}
                </Link>
            </h3>

            {completeSong.userId === parseInt(localStorage.getItem("app_user_id"))
                ?   <div>
                        <button onClick={evt =>{
                        evt.preventDefault()
                        deleteSong(completeSong.id)}
                        }>delete</button>
                    </div>
                
                :   <div className="audio__username">
                        <Link to={`/profile/incomplete/${completeSong.userId}`}>
                            {completeSong.user.name}
                        </Link>
                    </div>
            }

            <ReactAudioPlayer
                key={completeSong.id}
                className="audio__player"
                src={completeSong.completeURL}
                controls
                />

        </div>
    )

}


