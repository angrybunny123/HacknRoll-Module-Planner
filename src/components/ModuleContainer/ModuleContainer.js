import React, { Component } from "react";
import axios from "../../axios.js";

import classes from "./ModuleContainer.module.css";
import { TextField, MenuItem } from "@material-ui/core";
import { Droppable, Draggable } from "react-beautiful-dnd";

import Module from "../Module/Module";

const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
    display: "flex",
    flexWrap: "wrap",
    alignContent: "flex-start",
    border: "2px solid black",
    width: "70%",
    float: "left",
    height: "300px",
    padding: "20px",
});

class ModuleContainer extends Component {
    render() {

        let moduleFields;
        moduleFields = this.props.moduleFields.map((field) => {
            return (
                <MenuItem key={field} value={field}>
                    {field}
                </MenuItem>
            );
        });

        return (
            <div className={classes.ModuleContainer}>
                <div className={classes.Dropdown}>
                    <TextField
                        id="standard-select-field"
                        select
                        value={this.props.currentField}
                        onChange={this.props.onModuleFieldHandler}
                        helperText="Please select your area of interest"
                    >
                        {moduleFields}
                    </TextField>
                </div>
                <Droppable droppableId="modules" direction="horizontal">
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}
                            {...provided.droppableProps}
                        >
                            {this.props.modules
                                ? this.props.modules.map(
                                      (module, index) => (
                                          <Draggable
                                              key={module.code}
                                              draggableId={module.code}
                                              index={index}
                                          >
                                              {(provided, snapshot) => (
                                                  <div
                                                      ref={provided.innerRef}
                                                      {...provided.draggableProps}
                                                      {...provided.dragHandleProps}
                                                  >
                                                      <Module
                                                          moduleCode={
                                                              module.code
                                                          }
                                                          isDragging={
                                                              snapshot.isDragging
                                                          }
                                                          elective={
                                                              module.elective
                                                                  ? true
                                                                  : false
                                                          }
                                                      />
                                                  </div>
                                              )}
                                          </Draggable>
                                      )
                                  )
                                : null}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </div>
        );
    }
}

export default ModuleContainer;
