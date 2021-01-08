import React from "react";

import classes from "./SummaryContainer.module.css";
import Summary from "../Summary/Summary";

const SummaryContainer = (props) => {
  return (
    <div style={{ marginTop: "10px" }}>
      <h2>Degree Summary</h2>
      <div className={classes.SummaryContainer}>
        <Summary label="Foundation" />
        <Summary label="Focus Area" />
        <Summary label="Math and Science" />
        <Summary label="IT Professionalism" />
      </div>
      <div className={classes.SummaryContainerTwo}>
        <Summary label="Industrial Experience" />
        <Summary label="Team Project" />
        <Summary label="Unrestricted Electives" />
        <Summary label="University Level Requirements" />
      </div>
    </div>
  );
};

export default SummaryContainer;
