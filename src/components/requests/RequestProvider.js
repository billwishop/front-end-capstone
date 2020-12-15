import React, {useState} from 'react'

export const RequestContext = React.createContext()

export const RequestProvider = props => {
    const [requests, setRequests] = useState([])

    const getRequests = () => {
        return fetch("http://localhost:8088/requests")
            .then(res => res.json())
            .then(setRequests)
    }

    return (
        <RequestContext.Provider value={
            {
                requests, getRequests
            }
        }>
            {props.children}
        </RequestContext.Provider>
    )
}
