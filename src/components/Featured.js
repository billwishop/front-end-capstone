import {Route, Redirect} from "react-router-dom"
import { ApplicationViews } from "./ApplicationViews"
import {Login} from "./auth/Login"
import {Register} from "./auth/Register"
import { NavBar } from "./nav/NavBar"
import { SongProvider } from "./songs/SongProvider"
import { ProfileNavBar } from "./users/UserProfileNav"
import { UserProvider } from "./users/UserProvider"


export const Featured = () => (
    <>
        <Route render={() => {
            if (localStorage.getItem("app_user_id")) {
                return (
                    <>
                        <UserProvider>
                            <Route render={props => <NavBar {...props} />} />
                        </UserProvider>
                        <Route render={props => <ApplicationViews {...props} />} />
                    </>
                )
            } else {
                return <Redirect to="/login" />
            }
        }} />

        <Route path="/login" render={props => <Login {...props} />} />
        <Route path="/register" render={props => <Register {...props} />} />
    </>
)


