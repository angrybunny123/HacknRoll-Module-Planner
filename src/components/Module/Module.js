import React from 'react';

import classes from "./Module.module.css";

const Module = (props) => {
    return (
        <div className={classes.Module}>
            <h1>
                {props.moduleCode}
            </h1>
        </div>
    );
}

export default Module;

