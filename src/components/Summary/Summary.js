import React from "react";

import classes from "./Summary.module.css";

const Summary = (props) => {
  return (
    <div
      className={
        props.label === "Foundation"
          ? classes.Foundation
          : props.label === "Focus Area"
          ? classes.FocusArea
          : props.label === "Math and Science"
          ? classes.MathAndSci
          : props.label === "IT Professionalism"
          ? classes.ITProfessionalism
          : props.label === "Industrial Experience"
          ? classes.IndustrialExperience
          : props.label === "Team Project"
          ? classes.TeamProject
          : props.label === "Unrestricted Electives"
          ? classes.UnrestrictedElectives
          : props.label === "University Level Requirements"
          ? classes.UniversityLevelRequirements
          : "Default"
      }
    >
      <label className={classes.label}>{props.label}</label>
    </div>
  );
};

export default Summary;
