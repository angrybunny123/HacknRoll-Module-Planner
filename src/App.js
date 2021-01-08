import React, { Component } from "react";
import { Counter } from "./features/counter/Counter";
import { Button } from "@material-ui/core";
import axios from "./axios.js";

import classes from "./App.module.css";

import Board from "./components/Board";
import Card from "./components/Card";
import Module from "./components/Module/Module";
import ModuleContainer from "./components/ModuleContainer/ModuleContainer";
import SummaryContainer from "./components/SummaryContainer/SummaryContainer";
import PlanCard from "./components/PlanCard/PlanCard";

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

  render() {
    return (
      <div>
        <div className={classes.ModuleContainer}>
          <ModuleContainer />
        </div>
        <div className={classes.SummaryContainer}>
          <SummaryContainer />
        </div>
        {/* <PlanCard /> */}
      </div>
    );
  }
}

export default App;
