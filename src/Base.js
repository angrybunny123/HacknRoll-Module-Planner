import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import App from "./App";
import Auth from "./Auth";
import Logout from "./Logout";

class Base extends Component {

    render() {
        return (
            <div>
                <Navbar isAuthenticated={localStorage.getItem("token") !== null}/>
                <Switch>
                    <Route path="/auth" component={Auth} />
                    <Route path="/logout" component={Logout} />
                    <Route path="/" exact component={App} />
                </Switch>
            </div>
        );
    }
}
export default Base;
