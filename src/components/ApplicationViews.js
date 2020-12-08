import React from 'react';
import { Route } from "react-router-dom";
import { SongProvider } from "./songs/SongProvider"
import { IncompleteSongForm } from "./songs/IncompleteSongs/IncompleteSongForm"


export const ApplicationViews = props => {
    return (
        <>
            <SongProvider>
                <Route exact path="/upload" render={
                    props => <IncompleteSongForm {...props} />
                } />
            </SongProvider>
        </>
    )
}