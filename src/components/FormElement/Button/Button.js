import React from "react";

import classes from "./Button.module.css";

const button = (props) => {
    return (
        <button
            disabled={props.disabled}
            className={[classes.Button, classes[props.buttonClasses]].join(" ")}
            onClick={props.clicked}
        >
            {props.button}
        </button>
    );
};

export default button;
