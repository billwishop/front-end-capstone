import React, {useState} from "react"

export const StemContext = React.createContext()

export const StemProvider = props => {
    const [stems, setStems] = useState([])

    const getStems = () => {
        return fetch("http://localhost:8088/stems/?_expand=song&_expand=user")
            .then(res => res.json())
            .then(setStems)
    }
    
    const addStem = (stem) => {
        return fetch("http://localhost:8088/stems", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(stem)
        })
            .then(getStems)
    }

    const deleteStem = stemId => {
        return fetch(`http://localhost:8088/stems/${stemId}`, {
            method: "DELETE"
        })
            .then(getStems)
    }

    return (
        <StemContext.Provider value={
            {
                stems, addStem, getStems, deleteStem
            }
        }>
            {props.children}
        </StemContext.Provider>
    )
}