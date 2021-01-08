import React, { Component } from "react";

import classes from "./App.module.css";

import ModuleContainer from "./components/ModuleContainer/ModuleContainer";
import SummaryContainer from "./components/SummaryContainer/SummaryContainer";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      planner: {
        modules: [],
        y1s1: [],
        y1s2: [],
        y2s1: [],
        y2s2: [],
        y3s1: [],
        y3s2: [],
        y4s1: [],
        y4s2: [],
      },
    };
  }

  render() {
    return (
      <div>
        <div className={classes.ModuleContainer}>
          <ModuleContainer />
        </div>
        <div className={classes.SummaryContainer}>
          <SummaryContainer planner={this.state.planner} />
        </div>
      </div>
    );
  }
}

export default App;
