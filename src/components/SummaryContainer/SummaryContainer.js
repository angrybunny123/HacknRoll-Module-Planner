import React from "react";

import classes from "./SummaryContainer.module.css";
import Summary from "../Summary/Summary";

const SummaryContainer = (props) => {
    return (
        <div className={classes.SummaryContainer}>
            <h1>SUMMARY</h1>
            <Summary label="Foundation" />
            <Summary label="Focus Area" />
            <Summary label="Math and Science" />
        </div>
    );
};

export default SummaryContainer;
