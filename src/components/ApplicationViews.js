import React from 'react';
import { Route } from "react-router-dom";
import { SongProvider } from "./songs/SongProvider"
import { IncompleteSongForm } from "./songs/IncompleteSongs/IncompleteForm"
import { UserProvider } from './users/UserProvider';
import { IncompleteBrowseList } from './songs/IncompleteSongs/IncompleteBrowseList'
import { StemProvider } from './stems/StemProvider';
import { SongDetail } from './songs/SongDetails';
import { CompleteSongForm } from "./songs/CompleteSongs/CompleteForm"
import { StemForm } from "./stems/StemForm"


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
                    <Route exact path="/" render={
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
                        <Route path="/song/complete/:songId(\d+)" render={
                            props => <CompleteSongForm {...props} />
                        } />
                        <Route path="/song/stem/:songId(\d+)" render={
                            props => <StemForm {...props} />
                        } />
                    </StemProvider>
                </UserProvider>
            </SongProvider>
        </>
    )
}