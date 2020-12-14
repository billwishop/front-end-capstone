import React, {useContext, useRef} from "react"
import { SongContext } from "../SongProvider"
import {firebaseKey} from "../../../firebase/Firebase"
import firebase from "firebase"

const firebaseConfig = firebaseKey() // importing firebase key object 
firebase.initializeApp(firebaseConfig) // firebase initialization

export const IncompleteSongForm = props => {
    const {addSong} = useContext(SongContext)

    let file //empty variable to store the audio file
    let songName = useRef(null)
    let incompleteDescription = useRef(null)

    const constructIncompleteSong = () => {
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
                // pass new incomplete song object through addAudio 
                addSong({
                    userId: parseInt(localStorage.getItem('app_user_id')),
                    songName: songName.current.value,
                    incompleteURL: url,
                    completeURL: "",
                    incompleteTimestamp: Date.now(),
                    completeTimestamp: "",
                    incompleteDescription: incompleteDescription.current.value,
                    completeDescription: ""
                })
                // take user to browse page after upload
                .then(() => props.history.push('/'))
            })
        })
    }
    // upload incomplete song form
    return (
        <form className="incompleteSongForm">
            <h1 className="form__heading">upload an incomplete track</h1>
            <h3 className="form__subheading">|| other users will help</h3>
            <h3 className="form__subheading">|| you complete it</h3>
        
            <input type="file" className="form__file"
                    onChange={evt => {
                        file = evt.target.files[0]
                        console.log(file.name)
                    }}>
            </input>
            
            <label className="form__label">title</label>
            <input type="text" className="form__title" ref={songName} 
                    required autoFocus placeholder="enter title here" />
            
            <label className="form__label">description</label>
            <input type="text" className="form__description" ref={incompleteDescription} 
                    required placeholder="enter description here" />

            <button className="form__button" type="submit"
                onClick={evt => {
                    console.log('submit button clicked')
                    if(songName.current.value != ""){
                        if(incompleteDescription.current.value != ""){
                            evt.preventDefault()
                            constructIncompleteSong()
                        } else {
                            window.alert("please enter a description")
                        }
                    } else {
                        window.alert("please enter a song title")
                    }
                }}>submit</button>
        </form>

    )
    
}




