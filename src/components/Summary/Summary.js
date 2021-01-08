import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

const useStyles = makeStyles((theme) => ({
    label: {
        fontWeight: 500,
        fontSize: "17px",
        fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
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
        height: "100px",
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
    const classes = useStyles();

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
            <label className={classes.label}>{props.label}</label>
            <label className={classes.label}> 0</label>
        </Paper>
    );
};

export default Summary;
