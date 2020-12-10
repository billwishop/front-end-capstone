import React, {useContext, useRef, useState, useEffect} from "react"
import { SongContext } from "../SongProvider"
import firebase from "firebase"
import { StemContext } from '../../stems/StemProvider'

export const CompleteSongForm = props => {
    const {songs, completeSong, getSongs} = useContext(SongContext)
    const {stems, getStems, updateStem} = useContext(StemContext)

    // set individual song object
    const [song, setSong] = useState({})
    // filtered stem array
    const [filteredStems, setStems] = useState([])

    useEffect(() => {
        getSongs()
        .then(getStems)
    }, [])

    // find the corresponding stems and set the state
    useEffect(() => {
        const filteredStems = stems.filter(s => s.songId === parseInt(props.match.params.songId)) 
        setStems(filteredStems)
    }, [stems])

    //empty variable to store the audio file
    let file 
    // reference to description input field
    let completeDescription = useRef(null)

    const constructCompleteSong = () => {
        // firebase storage references
        const storage = firebase.storage();
        const storageRef = storage.ref();
        const audioRef = storageRef.child('audio/' + file.name)

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
                // take user to browse page after upload
                .then(() => props.history.push('/browse'))
            })
        })
    }

    const markStemAsChosen = () => {

    }

    // upload incomplete song form
    return (
        <form className="completeSongForm">
            <h1 className="form__heading">upload completed track</h1>

            <input type="file" className="form__file"
                    onChange={evt => {
                        file = evt.target.files[0]
                        console.log(file.name)
                    }}>
            </input>

            

            <label className="form__label">description</label>
            <input type="text" className="form__description" ref={completeDescription} 
                    required autoFocus placeholder="enter description here" />

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
        </form>

    )
    
}