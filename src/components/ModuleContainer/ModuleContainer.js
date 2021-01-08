import React, { Component } from "react";

import classes from "./ModuleContainer.module.css";
import { TextField, InputLabel, Select, MenuItem } from "@material-ui/core";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import Module from "../Module/Module";
import Card from "../Card";
import Board from "../Board";

const onDropHandler = (list, startIndex, endIndex) => {
    console.log(list);
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    console.log(result);
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
});

class ModuleContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
        };
        this.onDragEnd = this.onDragEnd.bind(this);
    }

    onModuleFieldHandler = (event) => {
        this.setState({ currentField: event.target.value });
    };

    onDragEnd(result) {
        if (!result.destination) {
            return;
        }

        const newModules = onDropHandler(
            this.state.modules,
            result.source.index,
            result.destination.index
        );

        this.setState({
            modules: newModules,
        });
    }

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
                <DragDropContext onDragEnd={this.onDragEnd}>
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
                </DragDropContext>
            </div>
        );
    }
}

export default ModuleContainer;
