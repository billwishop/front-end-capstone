import React, {useContext, useRef, useState, useEffect} from "react"
import { SongContext } from "../SongProvider"
import firebase from "firebase"
import { StemContext } from '../../stems/StemProvider'
import { IncompleteSongCard } from "../IncompleteSongs/IncompleteSongCard"

export const CompleteSongForm = props => {
    const {songs, completeSong, getSongs} = useContext(SongContext)
    const {stems, getStems, updateStem} = useContext(StemContext)

    // set individual song object
    const [song, setSong] = useState({})
    // filtered stem array
    const [filteredStems, setStems] = useState([])
    // uploaded file
    const [file, setFile] = useState({})
    // loading state
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getSongs()
        .then(getStems)
    }, [])

    // find the corresponding stems and set the state
    useEffect(() => {
        const filteredStems = stems.filter(s => s.songId === parseInt(props.match.params.songId)) 
        console.log("stems state change")
        setStems(filteredStems)
    }, [stems])

    // find the song id and set the state
    useEffect(() => {
        const song = songs.find(s => s.id === parseInt(props.match.params.songId)) || {}
        setSong(song)
    }, [songs])

    // reference to description input field
    let completeDescription = useRef(null)
    
    const constructCompleteSong = () => {
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
                completeSong(parseInt(props.match.params.songId),{
                    completeURL: url,
                    completeTimestamp: Date.now(),
                    completeDescription: completeDescription.current.value
                })
                // take user to the song page after upload
                .then(() => props.history.push(`/song/${song.id}`))
            })
        })
    }

    // responsible for responding to stem checkbox changes and marking chosed as true or false
    const checkboxControl = (evt) => {
        if(evt.target.checked === true){
            updateStem(parseInt(evt.target.id), {chosen: true})
        } else {
            updateStem(parseInt(evt.target.id), {chosen: false})            
    } 
}

    // upload complete song form
    return (
        <div className="form">

            <div className="song__initial">
                {song.id ?<IncompleteSongCard key={song.id} incompleteSong={song} /> :"Song Not Found"} 
            </div>
            <form className="completeSongForm">
                <h1 className="form__heading">upload completed track</h1>

                <input type="file" className="form__file"
                        onChange={evt => {
                            setFile(evt.target.files[0])
                        }}>
                </input>
                        
                <div>
                    <h3>select chosen stem(s)</h3>
                    <div className="stem__select" multiple>
                    {
                        filteredStems.map(stem => {
                            return <div>
                                <input type="checkbox" key={stem.id} id={stem.id} name="checkbox"
                                    onChange={evt=>{
                                        checkboxControl(evt);}} />
                                <label htmlFor={stem.id}>{stem.name} by {stem.user.name}</label>
                                </div>
                        })
                    }
                    </div>
                </div>

                <div>
                <label className="form__label">description</label>
                </div>

                <input type="text" className="form__description" ref={completeDescription} 
                        required autoFocus placeholder="enter description here" />
{loading ? 
                            <>
                                <h1 className="loading loading__one">*</h1> 
                                <h1 className="loading loading__two">*</h1> 
                                <h1 className="loading loading__three">*</h1> 
                                <h1 className="loading loading__four">*</h1> 
                                <h1 className="loading loading__five">*</h1> 
                            </>
                            : ''}
                <button className="form__button" type="submit"
                    onClick={evt => {
                        console.log('submit button clicked')
                        
                        if(completeDescription.current.value != ""){
                            evt.preventDefault()
                            constructCompleteSong()
                        } else {
                            window.alert("please enter a description")
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