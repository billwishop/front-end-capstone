import React, { useContext, useRef, useEffect, useState } from "react"
import { SongContext } from "../SongProvider"
import { firebaseKey } from "../../../firebase/Firebase"
import firebase from "firebase"
import { RequestContext } from "../../requests/RequestProvider"
import { RequestSongContext } from "../../requestSongRelationships/RequestSongProvider"

const firebaseConfig = firebaseKey() // importing firebase key object 
firebase.initializeApp(firebaseConfig) // firebase initialization

export const IncompleteSongForm = props => {
    const {addSong} = useContext(SongContext)
    const {requests, getRequests} = useContext(RequestContext)
    const {addRequestSong} = useContext(RequestSongContext)

    // selected requests
    const [selectedRequests, setSelectedRequests] = useState([])

    // uploaded file
    const [file, setFile] = useState({})

    // loading state
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getRequests()
    }, [])

    let songName = useRef(null)
    let incompleteDescription = useRef(null)

    const constructIncompleteSong = () => {
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
                // pass new incomplete song object through addSong
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
                .then(newSongObj => {
                    // remove duplicates if user checked a box twice
                    let submittedRequests = [...new Set(selectedRequests)]

                    submittedRequests.map(requestId => {
                        
                        const relationship = {
                            songId: newSongObj.id,
                            requestId: requestId
                        }
                        addRequestSong(relationship)
                    })
                })
                // take user to browse page after upload
                .then(() => props.history.push('/profile/incomplete'))
            })
        })
    }
    
    const checkboxControl = (evt) => {
        // check if box is being unchecked vs checked
        if(evt.target.checked === true){
            // set selected request state. add instead of replace.
            setSelectedRequests(prev =>[...prev, parseInt(evt.target.id)]);
        } else {
            // remove item from array if unchecked
            const removed = selectedRequests.filter(id => id != parseInt(evt.target.id))
            setSelectedRequests(removed)
            console.log(removed);
    } 
}
    // upload incomplete song form
    return (
        <form className="form form__section">
            <h1 className="form__heading">upload an incomplete track</h1>
            <h3 className="form__subheading">|| other users will help</h3>
            <h3 className="form__subheading">|| you complete it</h3>

            <div className="form__loading">

                <div className="form">
                    <input type="file" className="form__file btn"
                            onChange={evt => {
                                setFile(evt.target.files[0])
                            }}>
                    </input>

                    <div>
                    <label className="form__label">title</label>
                    </div>
                    <div>
                    <input type="text" className="form__title" ref={songName} 
                            required autoFocus placeholder="enter title here" />
                    </div>

                    <div className="form__requests">
                    {
                        requests.map(type => {
                            return <>
                                <input type="checkbox" key={type.id} id={type.id} name="checkbox"
                                    onChange={evt => {
                                        checkboxControl(evt)
                                    }} />
                                    <label>{type.type}</label>
                            </>
                        })
                    }
                    </div>

                    <div>
                    <label className="form__label">description</label>
                    </div>
                    <div>
                    <textarea type="text" className="form__description" ref={incompleteDescription} 
                            required placeholder="enter description here" />
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
                    <button className="form__button btn" type="submit"
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

                        {loading ? 
                            <>
                                <div>
                                    uploading...
                                </div>
                            </>
                            : ''}
                </div>

                <div>
                    
                    
                </div>
            </div>
        </form>

    )
    
}




