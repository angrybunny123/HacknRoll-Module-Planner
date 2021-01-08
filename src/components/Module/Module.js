import React from 'react';

import classes from "./Module.module.css";

const Module = (props) => {
    return (
        <div className={classes.Module}>
            <h4>
                {props.moduleCode}
            </h4>
        </div>
    );
}

export default Module;

