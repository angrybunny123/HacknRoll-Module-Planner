import React from 'react';

import classes from "./Module.module.css";

const Module = (props) => {
    return (
        <div className={classes.Module}>
            <h>
                {props.moduleCode}
            </h>
        </div>
    );
}

export default Module;

