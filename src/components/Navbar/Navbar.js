import React, { Component } from "react";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import { Link, withRouter } from "react-router-dom";

import classes from "./Navbar.module.css";

class Navbar extends Component {

    state={
        isAuthenticated: false,
    };

    componentDidMount() {
        this.setState({isAuthenticated: this.props.isAuthenticated})
    }
    
    componentDidUpdate() {
        if (this.state.isAuthenticated !== this.props.isAuthenticated) {
            this.setState({isAuthenticated: this.props.isAuthenticated});
        }
    }

    onLoginHandler = () => {
        this.props.history.push("/auth");
    }

    onLogoutHandler = () => {
        this.props.history.push("/logout");
    }

    render() {
        let button;
        if (this.state.isAuthenticated) {
            button = (
                <Button color="inherit" className={classes.button} onClick={this.onLogoutHandler}>
                    LOGOUT
                </Button>
            );
        } else {
            button = (
                <Button color="inherit" className={classes.button} onClick={this.onLoginHandler}>
                    LOGIN
                </Button>
            );
        }

        return (
            <div>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" className={classes.title}>
                            NUS MODULE PLANNER
                        </Typography>
                        {button}
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default withRouter(Navbar);
