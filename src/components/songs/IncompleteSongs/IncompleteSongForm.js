import React, {useContext, useRef, useEffect} from "react"
import { SongContext } from "../SongProvider"
import { UserContext } from "../../users/UserProvider"
import {firebaseKey} from "../../../firebase/Firebase"
import firebase from 'firebase'



export const SongForm = props => {
    const {songs, getSongs, addSong} = useContext(SongContext)
    const {users, getUsers} = useContext(UserContext)

    // importing firebase key object 
    const config = firebaseKey()

    firebase.initializeApp(config)
    
}




