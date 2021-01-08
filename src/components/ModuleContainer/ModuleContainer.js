import React, { Component } from "react";

import classes from "./ModuleContainer.module.css";
import { TextField, InputLabel, Select, MenuItem } from "@material-ui/core";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import Module from "../Module/Module";
import Card from "../Card";
import Board from "../Board";

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    if (destClone.length !== 0) {
        destClone.splice(droppableDestination.index, 0, removed);
    } else {
        destClone.push(removed);
    }

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
};

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: 8 * 2,
    margin: `0 ${8}px 0 0`,
    height: `20px`,

    // change background colour if dragging
    background: isDragging ? "lightgreen" : "grey",

    // styles we need to apply on draggables
    ...draggableStyle,
});

const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
    display: "flex",
    padding: 8,
    overflow: "auto",
    border: "2px solid black",
    width: "70%",
    float: "left",
    height: "450px",
    padding: "20px",
});

const getPlanStyle = (isDraggingOver) => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
    display: "flex",
    padding: 8,
    overflow: "auto",
    border: "2px solid black",
    height: "450px",
    width: "250px",
    padding: "20px",
});

class ModuleContainer extends Component {
    state = {
        dropdown: ["Foundation", "Math and Science", "IT Professionalism"],
        currentField: "",
        modules: [
            {
                code: "CS1231",
                prereq: null,
                preclusion: null,
            },
            {
                code: "CS1101S",
                prereq: null,
                preclusion: null,
            },
        ],
        plan: [],
    };

    id2List = {
        droppable: "modules",
        droppable2: "plan",
    };

    getList = (id) => this.state[this.id2List[id]];

    onModuleFieldHandler = (event) => {
        this.setState({ currentField: event.target.value });
    };

    onDragEnd = (result) => {
        const { source, destination } = result;
        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) {
            const newModules = reorder(
                this.getList(source.droppableId),
                source.index,
                destination.index
            );

            if (source.droppableId === "droppable2") {
                this.setState({ plan: newModules });
            } else {
                this.setState({ modules: newModules }); //maybe no need this cause we dont have to reorder in the all-module section
            }
        } else {
            const result = move(
                this.getList(source.droppableId),
                this.getList(destination.droppableId),
                source,
                destination
            );

            this.setState({
                modules: result.droppable,
                plan: result.droppable2,
            });
        }
    };

    render() {
        let modules;
        modules = this.state.modules.map((module) => {
            return (
                <Board id={module.code} className="board">
                    <Card id="card-1" className="card" draggable="true">
                        <Module moduleCode={module.code} />
                    </Card>
                </Board>
            );
        });

        let moduleFields;
        moduleFields = this.state.dropdown.map((field) => {
            return (
                <MenuItem key={field} value={field}>
                    {field}
                </MenuItem>
            );
        });

        console.log(modules);

        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <div className={classes.ModuleContainer}>
                    <div className={classes.Dropdown}>
                        <TextField
                            id="standard-select-field"
                            select
                            value={this.state.currentField}
                            onChange={this.onModuleFieldHandler}
                            helperText="Please select your area of interest"
                        >
                            {moduleFields}
                        </TextField>
                    </div>
                    <Droppable droppableId="droppable" direction="horizontal">
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                style={getListStyle(snapshot.isDraggingOver)}
                                {...provided.droppableProps}
                            >
                                {this.state.modules.map((module, index) => (
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
                                                style={getItemStyle(
                                                    snapshot.isDragging,
                                                    provided.draggableProps
                                                        .style
                                                )}
                                            >
                                                {module.code}
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </div>
                <div className={classes.PlanCardContainer}>
                    <Droppable droppableId="droppable2" direction="vertical">
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                style={getPlanStyle(snapshot.isDraggingOver)}
                            >
                                {this.state.plan
                                    ? this.state.plan.map((module, index) => (
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
                                                      style={getItemStyle(
                                                          snapshot.isDragging,
                                                          provided
                                                              .draggableProps
                                                              .style
                                                      )}
                                                  >
                                                      {module.code}
                                                  </div>
                                              )}
                                          </Draggable>
                                      ))
                                    : null}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </div>
            </DragDropContext>
        );
    }
}

export default ModuleContainer;
