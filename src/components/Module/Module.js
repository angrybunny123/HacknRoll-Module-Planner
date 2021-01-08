import React from "react";

import classes from "./Module.module.css";
import Tooltip from "@material-ui/core/Tooltip";

const Module = (props) => {
  const moduleDesign = [classes.Module];

  if (props.isDragging) {
    moduleDesign.push(classes.Drag);
  }

  if (props.elective) {
    moduleDesign.push(classes.ElectiveModule);
  }

  return (
    <Tooltip placement="top-start" title={props.moduleName}>
      <div className={moduleDesign.join(" ")}>
        <h4>{props.moduleCode}</h4>
      </div>
    </Tooltip>
  );
};

export default Module;
