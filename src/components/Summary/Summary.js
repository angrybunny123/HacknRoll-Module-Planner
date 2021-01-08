import React from "react";

import classes from "./Summary.module.css";

const Summary = (props) => {
    return (
        <div className={classes.Summary}>
            <label>
                {props.label}
            </label>
            <div>
                <h1>Modules</h1>
            </div>
        </div>
    )
}

export default Summary;