import React, {useContext, useRef, useState, useEffect} from "react"
import { SongContext } from "../songs/SongProvider"
import firebase from "firebase"
import { StemContext } from './StemProvider'
import { IncompleteSongCard } from "../songs/IncompleteSongs/IncompleteSongCard"

export const StemForm = props => {
    const {songs, getSongs} = useContext(SongContext)
    const {addStem} = useContext(StemContext)

    // set individual song object
    const [song, setSong] = useState({})
    // uploaded stem file
    const [file, setFile] = useState({})
     // loading state
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getSongs()
    }, [])

    // find the song id and set the state
    useEffect(() => {
        const song = songs.find(s => s.id === parseInt(props.match.params.songId)) || {}
        setSong(song)
    }, [songs])

    // reference to description input field
    let description = useRef(null)
    // reference to name input field
    let name = useRef(null)

    const constructStem = () => {
        // firebase storage references
        const storage = firebase.storage();
        const storageRef = storage.ref();
        const audioRef = storageRef.child('audio/' + file.name)

        setLoading(true)

        console.log("uploading")
        // audio upload to firebase
        audioRef.put(file).then(() => {
            console.log('Uploaded file!')
            //retrieve firebase url after the upload
            audioRef.getDownloadURL().then(function(url) {
                console.log(url)
                // pass song id and new complete song object through completeSong
                addStem({
                    songId: parseInt(props.match.params.songId),
                    userId: parseInt(localStorage.getItem('app_user_id')),
                    url: url,
                    timestamp: Date.now(),
                    description: description.current.value,
                    chosen: false,
                    name: name.current.value
                })
                // take user to the song page after upload
                .then(() => props.history.push(`/song/${song.id}`))
            })
        })
    }
    // upload stem form
    return (
        <div className="form__section form">
            <div className="song__initial">
                    {song.id ?<IncompleteSongCard key={song.id} incompleteSong={song} /> :"Song Not Found"} 
                </div>

            <form className="form">
                <h1 className="form__heading">upload a stem</h1>

                <input type="file" className="form__file"
                        onChange={evt => {
                            setFile(evt.target.files[0])
                        }}>
                </input>
                
                <div>
                <label className="form__label">title</label>
                </div>
                
                <div>
                <input type="text" className="form__title" ref={name} 
                        required autoFocus placeholder="enter stem name here" />
                </div>
                
                <div>
                <label className="form__label">description</label>
                </div>
                {loading ? 
                            <>
                                <h1 className="loading loading__one">*</h1> 
                                <h1 className="loading loading__two">*</h1> 
                                <h1 className="loading loading__three">*</h1> 
                                <h1 className="loading loading__four">*</h1> 
                                <h1 className="loading loading__five">*</h1> 
                            </>
                            : ''}
                <div>
                <input type="text" className="form__description" ref={description} 
                        required placeholder="enter description here" />
                </div>

                <button className="form__button" type="submit"
                    onClick={evt => {
                        console.log('submit button clicked')
                        if(name.current.value != ""){
                            if(description.current.value != ""){
                                evt.preventDefault()
                                constructStem()
                            } else {
                                window.alert("please enter a description")
                            }
                        } else {
                            window.alert("please enter a stem title")
                        }
                    }}>submit</button>
                    {loading ? 
                            <>
                                <div>
                                    uploading...
                                </div>
                            </>
                            : ''}
            </form>
        </div>

    )
}