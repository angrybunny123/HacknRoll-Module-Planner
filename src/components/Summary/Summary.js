import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import App from "../../App";

const useStyles = makeStyles((theme) => ({
  label: {
    fontWeight: 500,
    fontSize: "17px",
    fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
  },

  labelMC: {
    fontSize: "17px",
    fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
  },

  container: {
    margin: "12px auto auto auto",
  },

  Foundation: {
    width: "100%",
    height: "100px",
    border: "2px solid black",
    margin: "10px",
    borderRadius: "10px",
    backgroundColor: "#98b9cc",
  },

  FocusArea: {
    width: "100%",
    height: "100px",
    border: "2px solid black",
    margin: "10px",
    borderRadius: "10px",
    backgroundColor: "#bd8e9a",
  },

  MathAndSci: {
    width: "100%",
    height: "100px",
    border: "2px solid black",
    margin: "10px",
    borderRadius: "10px",
    backgroundColor: "#82af89",
  },

  ITProfessionalism: {
    width: "100%",
    height: "100px",
    border: "2px solid black",
    margin: "10px",
    borderRadius: "10px",
    backgroundColor: "#a3a873",
  },

  IndustrialExperience: {
    width: "100%",
    height: "100px",
    border: "2px solid black",
    margin: "10px",
    borderRadius: "10px",
    backgroundColor: "#96a097",
  },

  TeamProject: {
    width: "100%",
    height: "100px",
    border: "2px solid black",
    margin: "10px",
    borderRadius: "10px",
    backgroundColor: "#8175a3",
  },

  UnrestrictedElectives: {
    width: "100%",
    height: "100px",
    border: "2px solid black",
    margin: "10px",
    borderRadius: "10px",
    backgroundColor: "#cde48d",
  },

  UniversityLevelRequirements: {
    width: "100%",
    height: "110px",
    border: "2px solid black",
    margin: "10px",
    borderRadius: "10px",
    backgroundColor: "#b39637",
  },

  Default: {
    width: "100%",
    height: "100px",
    border: "2px solid black",
    margin: "10px",
    borderRadius: "10px",
  },
}));

const Summary = (props) => {
  let planner = props.module;
  console.log(planner);
  const calculateMcNeeded = () => {
    if (props.label === "Foundation") {
      return 36;
    } else if (props.label === "Focus Area") {
      return 24;
    } else if (props.label === "Math and Science") {
      return 16;
    } else if (props.label === "IT Professionalism") {
      return 12;
    } else if (props.label === "Industrial Experience") {
      return 12;
    } else if (props.label === "Team Project") {
      return 8;
    } else if (props.label === "Unrestricted Electives") {
      return 32;
    } else if (props.label === "University Level Requirements") {
      return 20;
    }
  };

  const calculateMcTaken = () => {
    if (props.label === "Foundation") {
      let modsTaken = 0;
      Object.entries(planner).forEach(([yearSem, modulesTookEachSem]) => {
        if (yearSem !== "modules") {
          for (let i = 0; i < modulesTookEachSem.length; i++) {
            if (modulesTookEachSem[i].type.includes("foundation")) {
              modsTaken += 4;
            }
          }
        }
      });
      return modsTaken;
    } else if (props.label === "Focus Area") {
      let modsTaken = 0;
      Object.entries(planner).forEach(([yearSem, modulesTookEachSem]) => {
        if (yearSem !== "modules") {
          for (let i = 0; i < modulesTookEachSem.length; i++) {
            if (modulesTookEachSem[i].type.includes("focusarea")) {
              modsTaken += 4;
            }
          }
        }
      });
      return modsTaken;
    } else if (props.label === "Math and Science") {
      let modsTaken = 0;
      Object.entries(planner).forEach(([yearSem, modulesTookEachSem]) => {
        if (yearSem !== "modules") {
          for (let i = 0; i < modulesTookEachSem.length; i++) {
            if (modulesTookEachSem[i].type.includes("mathscience")) {
              modsTaken += 4;
            }
          }
        }
      });
      return modsTaken;
    } else if (props.label === "IT Professionalism") {
      let modsTaken = 0;
      Object.entries(planner).forEach(([yearSem, modulesTookEachSem]) => {
        if (yearSem !== "modules") {
          for (let i = 0; i < modulesTookEachSem.length; i++) {
            if (modulesTookEachSem[i].type.includes("itprofessionalism")) {
              modsTaken += 4;
            }
          }
        }
      });
      return modsTaken;
    } else if (props.label === "Industrial Experience") {
      let modsTaken = 0;
      Object.entries(planner).forEach(([yearSem, modulesTookEachSem]) => {
        if (yearSem !== "modules") {
          for (let i = 0; i < modulesTookEachSem.length; i++) {
            if (modulesTookEachSem[i].type.includes("industrial")) {
              modsTaken += 4;
            }
          }
        }
      });
      return modsTaken;
    } else if (props.label === "Team Project") {
      let modsTaken = 0;
      Object.entries(planner).forEach(([yearSem, modulesTookEachSem]) => {
        if (yearSem !== "modules") {
          for (let i = 0; i < modulesTookEachSem.length; i++) {
            if (modulesTookEachSem[i].type.includes("teamproject")) {
              modsTaken += 4;
            }
          }
        }
      });
      return modsTaken;
    } else if (props.label === "Unrestricted Electives") {
      let modsTaken = 0;
      Object.entries(planner).forEach(([yearSem, modulesTookEachSem]) => {
        if (yearSem !== "modules") {
          for (let i = 0; i < modulesTookEachSem.length; i++) {
            if (modulesTookEachSem[i].type.includes("ue")) {
              modsTaken += 4;
            }
          }
        }
      });
      return modsTaken;
    } else if (props.label === "University Level Requirements") {
      let modsTaken = 0;
      Object.entries(planner).forEach(([yearSem, modulesTookEachSem]) => {
        if (yearSem !== "modules") {
          for (let i = 0; i < modulesTookEachSem.length; i++) {
            if (modulesTookEachSem[i].type.includes("ulr")) {
              modsTaken += 4;
            }
          }
        }
      });
      return modsTaken;
    }
  };

  const classes = useStyles();

  let creditstats = (
    <label className={classes.labelMC}>
      <br />
      MCs Needed: {calculateMcNeeded()}
      <br />
      MCs Taken: {calculateMcTaken()}
    </label>
  );

  if (calculateMcTaken() === calculateMcNeeded()) {
    creditstats = (
      <div
        style={{
          backgroundColor: "limegreen",
          padding: "10px",
        }}
      >
        Completed!
      </div>
    );
  }

  return (
    <Paper
      elevation={3}
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
          : classes.Default
      }
    >
      <div className={classes.container}>
        <label className={classes.label}>{props.label}</label>
        {creditstats}
      </div>
    </Paper>
  );
};

export default Summary;
