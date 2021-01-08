import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { Component } from "react";
import { useState } from "react";
import classes from "./Summary.module.css";

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

class Summary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mcRem: 0,
            mcNeeded: 0,
        };
    }

    calculateMcNeeded() {
        if (this.props.label === "Foundation") {
            return 36;
        } else if (this.props.label === "Focus Area") {
            return 24;
        } else if (this.props.label === "Math and Science") {
            return 16;
        } else if (this.props.label === "IT Professionalism") {
            return 12;
        } else if (this.props.label === "Industrial Experience") {
            return 12;
        } else if (this.props.label === "Team Project") {
            return 8;
        } else if (this.props.label === "Unrestricted Electives") {
            return 32;
        } else if (this.props.label === "University Level Requirements") {
            return 20;
        }
    }

    render() {
        return (
            <Paper
                elevation={3}
                className={
                    this.props.label === "Foundation"
                        ? classes.Foundation
                        : this.props.label === "Focus Area"
                        ? classes.FocusArea
                        : this.props.label === "Math and Science"
                        ? classes.MathAndSci
                        : this.props.label === "IT Professionalism"
                        ? classes.ITProfessionalism
                        : this.props.label === "Industrial Experience"
                        ? classes.IndustrialExperience
                        : this.props.label === "Team Project"
                        ? classes.TeamProject
                        : this.props.label === "Unrestricted Electives"
                        ? classes.UnrestrictedElectives
                        : this.props.label === "University Level Requirements"
                        ? classes.UniversityLevelRequirements
                        : classes.Default
                }
            >
                <div className={classes.container}>
                    <label className={classes.label}>{this.props.label}</label>
                    <label className={classes.labelMC}>
                        <br />
                        MCs Needed: {this.calculateMcNeeded()}
                        <br />
                        MCs Taken: {0}
                    </label>
                </div>
            </Paper>
        );
    }
}

export default Summary;
