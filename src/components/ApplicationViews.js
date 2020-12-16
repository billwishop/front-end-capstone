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
import { ProfileIncompleteList } from './users/UserIncompleteList';
import { ProfileCompleteList } from './users/UserCompleteList'
import { ProfileStemList } from './users/UserStemList'
import { RequestProvider } from './requests/RequestProvider';
import { RequestSongProvider } from './requestSongRelationships/RequestSongProvider';



export const ApplicationViews = props => {
    return (
        <>
            <SongProvider>
                <RequestProvider>
                        <RequestSongProvider>                            
                            <Route exact path="/upload" render={
                                props => <IncompleteSongForm {...props} />
                            } />
                        </RequestSongProvider>
                </RequestProvider>
            </SongProvider>

            <SongProvider>
                <UserProvider>
                    <RequestSongProvider>                        
                        <RequestProvider>                            
                            <Route exact path="/" render={
                                props => <IncompleteBrowseList {...props} />
                            } />
                        </RequestProvider>
                    </RequestSongProvider>
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
                        <Route path="/profile/incomplete/:userId(\d+)" render={
                            props => <ProfileIncompleteList {...props} />
                        } />
                        <Route exact path="/profile/incomplete" render={
                            props => <ProfileIncompleteList {...props} />
                        } />
                        <Route path="/profile/complete/:userId(\d+)" render={
                            props => <ProfileCompleteList {...props} />
                        } />
                        <Route exact path="/profile/complete" render={
                            props => <ProfileCompleteList {...props} />
                        } />
                        <Route path="/profile/stem/:userId(\d+)" render={
                            props => <ProfileStemList {...props} />
                        } />
                        <Route exact path="/profile/stem" render={
                            props => <ProfileStemList {...props} />
                        } />
                    </StemProvider>
                </UserProvider>
            </SongProvider>
        </>
    )
}

