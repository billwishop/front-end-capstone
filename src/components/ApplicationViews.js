import React from 'react';
import { Route } from "react-router-dom";
import { SongProvider } from "./songs/SongProvider"
import { IncompleteSongForm } from "./songs/IncompleteSongs/IncompleteForm"
import { UserProvider } from './users/UserProvider';
import { IncompleteBrowseList } from './songs/IncompleteSongs/IncompleteBrowseList'
import { StemProvider } from './stems/StemProvider';
import { SongDetail } from './songs/SongDetails';


export const ApplicationViews = props => {
    return (
        <>
            <SongProvider>
                <Route exact path="/upload" render={
                    props => <IncompleteSongForm {...props} />
                } />
            </SongProvider>

            <SongProvider>
                <UserProvider>
                    <Route exact path="/browse" render={
                        props => <IncompleteBrowseList {...props} />
                    } />
                </UserProvider>
            </SongProvider>

            <SongProvider>
                <UserProvider>
                    <StemProvider>
                        <Route path="/song/:songId(\d+)" render={
                            props => <SongDetail {...props} />
                        } />
                    </StemProvider>
                </UserProvider>
            </SongProvider>
        </>
    )
}