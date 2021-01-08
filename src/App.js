import React, { Component } from "react";
import axios from "./axios.js";

// import classes from "./App.module.css";
import "./App.css";

import ModuleContainer from "./components/ModuleContainer/ModuleContainer";
import SummaryContainer from "./components/SummaryContainer/SummaryContainer";
import { Grid, Paper } from "@material-ui/core";

class App extends Component {
    axiosTestPostRequest = () => {
        const module = {
            credits: 4,
            name: "GES1035",
            prerequisites: ["GEQ1000", "GER1000"],
        };
        axios
            .post("/modulePost.json", module)
            .then((response) => console.log(response))
            .catch((error) => console.log(error));
    };

    axiosTestGetRequest = () => {
        axios
            .get("modulePost.json")
            .then((response) => console.log(response))
            .catch((error) => console.log(error));
    };

    axiosGetNusMods = () => {
        axios
            .get("foundation/CS1231S.json")
            .then((res) => {
                const prereq = res.data.prerequisites;
                const prereqArr = Object.keys(prereq);

                prereqArr.forEach((element) => {
                    console.log(element.search("-"));
                });
            })
            .catch((err) => console.log(err));
    };

    render() {
        return (
            <div className="App">
                <div className="ModuleContainer">
                    <ModuleContainer />
                </div>
                <div className="SummaryContainer">
                    <SummaryContainer />
                </div>
                <div className="sem-table">
                    <Grid
                        container
                        direction="row"
                        justify="flex-start"
                        spacing={2}
                        alignItems="center"
                    >
                        <Grid item xs={1}>
                            <Paper>hi</Paper>
                            <Paper>hi</Paper>
                        </Grid>
                        <Grid item xs={1}>
                            <Paper>hi</Paper>
                        </Grid>
                        <Grid item xs={1}>
                            <Paper>hi</Paper>
                        </Grid>
                        <Grid item xs={1}>
                            <Paper>hi</Paper>
                        </Grid>
                        <Grid item xs={1}>
                            <Paper>hi</Paper>
                        </Grid>
                        <Grid item xs={1}>
                            <Paper>hi</Paper>
                        </Grid>
                        <Grid item xs={1}>
                            <Paper>hi</Paper>
                        </Grid>
                        <Grid item xs={1}>
                            <Paper>hi</Paper>
                        </Grid>
                    </Grid>
                </div>
            </div>
        );
    }
}

export default App;
