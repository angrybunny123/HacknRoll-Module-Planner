import React from "react";

import classes from "./SummaryContainer.module.css";
import Summary from "../Summary/Summary";


const SummaryContainer = (props) => {
    let planner = props.modules;
  
  return (
    
    <div>
      <h2>Degree Summary</h2>
      <div className={classes.SummaryContainer}>
        <Summary label="Foundation" module={planner}/>
        <Summary label="Focus Area" module={planner}/>
        <Summary label="Math and Science" module={planner}/>
        <Summary label="IT Professionalism" module={planner}/>
      </div>
      <div className={classes.SummaryContainerTwo}>
        <Summary label="Industrial Experience" module={planner}/>
        <Summary label="Team Project" module={planner}/>
        <Summary label="Unrestricted Electives" module={planner}/>
        <Summary label="University Level Requirements" module={planner}/>
      </div>
    </div>
  );
};

export default SummaryContainer;
