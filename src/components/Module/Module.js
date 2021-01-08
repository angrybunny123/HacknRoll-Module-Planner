import React from 'react';

import classes from "./Module.module.css";

const Module = (props) => {

    const moduleDesign = [classes.Module];

    if (props.isDragging) {
        moduleDesign.push(classes.Drag);
    }

    return (
        <div className={moduleDesign.join(" ")}>
            <h4>
                {props.moduleCode}
            </h4>
        </div>
    );
}

export default Module;

