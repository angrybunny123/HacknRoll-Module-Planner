import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import { Link } from "react-router-dom";

import classes from "./Navbar.module.css";

const Navbar = (props) => {
    let button;
    if (props.isAuthenticated) {
        button = (
            <Button color="inherit" className={classes.button}>
                <Link to="/logout">LOGOUT</Link>
            </Button>
        );
    } else {
        button = (
            <Button color="inherit" className={classes.button}>
                <Link to="/auth">LOGIN</Link>
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
};

export default Navbar;
