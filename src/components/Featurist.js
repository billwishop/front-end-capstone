import {Route, Redirect} from "react-router-dom"
import {Login} from "./auth/Login"
import {Register} from "./auth/Register"
import { NavBar } from "./nav/NavBar"


export const Featurist = () => (
    <>
        <Route render={() => {
            if (localStorage.getItem("app_user_id")) {
                return (
                    <>
                        <Route render={props => <NavBar {...props} />} />
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
