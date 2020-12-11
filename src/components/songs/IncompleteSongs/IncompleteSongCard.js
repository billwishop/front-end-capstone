import React, { useContext }  from "react"
import { Link } from "react-router-dom"
import ReactAudioPlayer from 'react-audio-player';
import { SongContext } from '../SongProvider'


export const IncompleteSongCard = ({ incompleteSong }) => {
    const {deleteSong} = useContext(SongContext)
    return (
        <div className="audio__card">

            <h3 className="audio__title">
                <Link to={`/song/${incompleteSong.id}`}>
                    {incompleteSong.songName}
                </Link>
            </h3>

            {incompleteSong.userId === parseInt(localStorage.getItem("app_user_id"))
                    ?   <div>
                            <button onClick={evt =>{
                                evt.preventDefault()
                                deleteSong(incompleteSong.id)}
                            }>delete</button>
                        </div>
                    
                    :   <div className="audio__username">
                            <Link to={`/profile/incomplete/${incompleteSong.userId}`}>
                                {incompleteSong.user.name}
                            </Link>
                        </div>
                }

            <ReactAudioPlayer
                key={incompleteSong.id}
                className="audio__player"
                src={incompleteSong.incompleteURL}
                controls
                />

        </div>
    )
}

