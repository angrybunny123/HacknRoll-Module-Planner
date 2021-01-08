import React, { Component } from "react";
import axios from "../../axios.js";

import classes from "./ModuleContainer.module.css";
import { TextField, InputLabel, Select, MenuItem } from "@material-ui/core";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import Module from "../Module/Module";
import PlanCard from "../PlanCard/PlanCard";
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
    result["destination"] = destClone;
    result["source"] = sourceClone;
    result["movedItem"] = removed;

    console.log("result", result);

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

const getPlanStyle = (isDraggingOver) => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
    display: "flex",
    flexWrap: "wrap",
    alignContent: "flex-start",
    padding: 8,
    overflow: "auto",
    border: "2px solid black",
    height: "450px",
    width: "250px",
    padding: "20px",
});

const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
    display: "flex",
    padding: 8,
    flexWrap: "wrap",
    alignContent: "flex-start",
    border: "2px solid black",
    width: "70%",
    float: "left",
    height: "450px",
    padding: "20px",
});

class ModuleContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dropdown: [
                "Foundation",
                "Math and Science",
                "IT Professionalism",
                "Team Project",
                "Industrial Experience",
                "University Level Requirements",
                "Unrestricted Electives",
                "Algorithms & Theory",
                "Artificial Intelligence",
                "Computer Graphics & Games",
                "Computer Security",
                "Database Systems",
                "Multimedia Information Retrieval",
                "Networking & Distributed Systems",
                "Parallel Computing",
                "Programming Languages",
                "Software Engineering",
            ],
            currentField: "",
            modules: [],
            plan: [],
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
        this.onDragEnd = this.onDragEnd.bind(this);
    }

    onModuleFieldHandler = (event) => {
        this.setState({ currentField: event.target.value });
        let stringToPost = "";
        if (event.target.value === "Foundation") {
            stringToPost = "foundation";
        } else if (event.target.value === "Math and Science") {
            stringToPost = "mathscience";
        } else if (event.target.value === "IT Professionalism") {
            stringToPost = "itprofessionalism";
        } else if (event.target.value === "Team Project") {
            stringToPost = "teamproject";
        } else if (event.target.value === "Industrial Experience") {
            stringToPost = "industrial";
        } else if (event.target.value === "Algorithms & Theory") {
            stringToPost = "focusareas/algorithmsandtheory";
        } else if (event.target.value === "Artificial Intelligence") {
            stringToPost = "focusareas/artificialintelligence";
        } else if (event.target.value === "Computer Graphics & Games") {
            stringToPost = "focusareas/computergraphicsandgames";
        } else if (event.target.value === "Computer Security") {
            stringToPost = "focusareas/computersecurity";
        } else if (event.target.value === "Database Systems") {
            stringToPost = "focusareas/databasesystems";
        } else if (event.target.value === "Multimedia Information Retrieval") {
            stringToPost = "focusareas/multimedia";
        } else if (event.target.value === "Networking & Distributed Systems") {
            stringToPost = "focusareas/networkinganddistributedsystems";
        } else if (event.target.value === "Parallel Computing") {
            stringToPost = "focusareas/parallelcomputing";
        } else if (event.target.value === "Programming Languages") {
            stringToPost = "focusareas/programminglanguages";
        } else if (event.target.value === "Software Engineering") {
            stringToPost = "focusareas/softwareengineering";
        }
        axios
            .get(`${stringToPost}.json`)
            .then((response) => {
                if (response.data.primaries !== undefined) {
                    let newModules = Object.values(response.data.primaries);
                    if (response.data.electives !== undefined) {
                        let electives = Object.values(response.data.electives);
                        for (let i = 0; i < electives.length; i++) {
                            newModules.push(electives[i]);
                        }
                    }
                    this.setState({
                        planner: { ...this.state.planner, modules: newModules },
                    });
                    console.log(newModules);
                } else {
                    this.setState({
                        planner: {
                            ...this.state.planner,
                            modules: Object.values(response.data),
                        },
                    });
                }
            })
            .catch((error) => console.log(error));
    };

    id2List = {
        modules: "modules",
        droppable2: "plan",
        y1s1: "y1s1",
        y1s2: "y1s2",
        y2s1: "y2s1",
        y2s2: "y2s2",
        y3s1: "y3s1",
        y3s2: "y3s2",
        y4s1: "y4s1",
        y4s2: "y4s2",
    };

    getList = (id) => this.state.planner[this.id2List[id]];

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

            // if (source.droppableId === "droppable2") {
            //     this.setState({ plan: newModules });
            // } else {
            //     this.setState({ modules: newModules }); //maybe no need this cause we dont have to reorder in the all-module section
            // }
        } else {
            const result = move(
                this.getList(source.droppableId),
                this.getList(destination.droppableId),
                source,
                destination
            );
            
            console.log("Old State", this.state);
            const newState = JSON.parse(JSON.stringify(this.state));
            let newDestinationArray = [...this.state.planner[destination.droppableId]];
            
            
            // let lastIndex = result.destination ? result.destination.length - 1 : 0;

            newDestinationArray.push(result.movedItem);
            console.log("NEW DESTINATION ARRAY", newDestinationArray);
            console.log("New State", newState);
            newState.planner[source.droppableId] = result.source;
            newState.planner[destination.droppableId] = newDestinationArray;

            // this.setState({
            //     modules: result.droppable,
            //     plan: result.droppable2,
            //     planner: { ...this.state.planner, y1s1: result.y1s1 },
            // });

            this.setState(newState);
        }
    };

    render() {
        let modules;
        modules = this.state.planner.modules.map((module) => {
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
                    <Droppable droppableId="modules" direction="horizontal">
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                style={getListStyle(snapshot.isDraggingOver)}
                                {...provided.droppableProps}
                            >
                                {this.state.planner.modules
                                    ? this.state.planner.modules.map(
                                          (module, index) => (
                                              <Draggable
                                                  key={module.code}
                                                  draggableId={module.code}
                                                  index={index}
                                              >
                                                  {(provided, snapshot) => (
                                                      <div
                                                          ref={
                                                              provided.innerRef
                                                          }
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
                                          )
                                      )
                                    : null}
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
                    <PlanCard
                        droppableId="y1s1"
                        array={this.state.planner.y1s1}
                    />
                    <PlanCard
                        droppableId="y1s2"
                        array={this.state.planner.y1s2}
                    />
                    <PlanCard
                        droppableId="y2s1"
                        array={this.state.planner.y2s1}
                    />
                    <PlanCard
                        droppableId="y2s2"
                        array={this.state.planner.y2s2}
                    />
                    <PlanCard
                        droppableId="y3s1"
                        array={this.state.planner.y3s1}
                    />
                </div>
            </DragDropContext>
        );
    }
}

export default ModuleContainer;
