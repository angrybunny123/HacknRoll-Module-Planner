import React, { Component } from "react";
import axios from "./axios.js";
import { TextField, MenuItem } from "@material-ui/core";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import classes from "./App.module.css";

import Module from "./components/Module/Module";
import ModuleContainer from "./components/ModuleContainer/ModuleContainer";
import PlanCard from "./components/PlanCard/PlanCard";
import SummaryContainer from "./components/SummaryContainer/SummaryContainer";

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

class App extends Component {
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
        } else if (event.target.value === "University Level Requirements") {
            stringToPost = "unrestrictedelectives";
        } else if (event.target.value === "Unrestricted Electives") {
            stringToPost = "universitylevelrequirements";
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
                            electives[i].elective = true;
                            newModules.push(electives[i]);
                        }
                    }
                    for (let j = 0; j < newModules.length; j++) {
                        Object.entries(this.state.planner).forEach(
                            ([yearSem, modulesTookEachSem]) => {
                                if (yearSem !== "modules") {
                                    for (
                                        let i = 0;
                                        i < modulesTookEachSem.length;
                                        i++
                                    ) {
                                        if (
                                            modulesTookEachSem[i].code ===
                                            newModules[j].code
                                        ) {
                                            newModules.splice(j, 1);
                                        }
                                    }
                                }
                            }
                        );
                    }
                    this.setState({
                        planner: { ...this.state.planner, modules: newModules },
                    });
                    console.log(newModules);
                } else {
                    let modulesCheck = Object.values(response.data);
                    for (let j = 0; j < modulesCheck.length; j++) {
                        Object.entries(this.state.planner).forEach(
                            ([yearSem, modulesTookEachSem]) => {
                                if (yearSem !== "modules") {
                                    for (
                                        let i = 0;
                                        i < modulesTookEachSem.length;
                                        i++
                                    ) {
                                        if (
                                            modulesTookEachSem[i].code ===
                                            modulesCheck[j].code
                                        ) {
                                            modulesCheck.splice(j, 1);
                                        }
                                    }
                                }
                            }
                        );
                    }
                    this.setState({
                        planner: {
                            ...this.state.planner,
                            modules: modulesCheck,
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
            let newDestinationArray = [
                ...this.state.planner[destination.droppableId],
            ];

            // let lastIndex = result.destination ? result.destination.length - 1 : 0;

            newDestinationArray.push(result.movedItem);
            console.log("NEW DESTINATION ARRAY", newDestinationArray);
            console.log("New State", newState);
            newState.planner[source.droppableId] = result.source;
            newState.planner[destination.droppableId] = newDestinationArray;
            // this.setState({
            //     planner: {
            //         modulesTaken: newDestinationArray,
            //     }
            // })

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
            return <Module moduleCode={module.code} />;
        });

        let moduleFields;
        moduleFields = this.state.dropdown.map((field) => {
            return (
                <MenuItem key={field} value={field}>
                    {field}
                </MenuItem>
            );
        });
        return (
            <div>
                <div className={classes.ModuleContainer}>
                    <DragDropContext onDragEnd={this.onDragEnd}>
                        <div className={classes.SelectionContainer}>
                            {/* <div className={classes.Dropdown}>
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
                            <div className={classes.ModulePool}> */}
                            {/* <Droppable
                                    droppableId="modules"
                                    direction="horizontal"
                                >
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            style={getListStyle(
                                                snapshot.isDraggingOver
                                            )}
                                            {...provided.droppableProps}
                                        >
                                            {this.state.planner.modules
                                                ? this.state.planner.modules.map(
                                                      (module, index) => (
                                                          <Draggable
                                                              key={module.code}
                                                              draggableId={
                                                                  module.code
                                                              }
                                                              index={index}
                                                          >
                                                              {(
                                                                  provided,
                                                                  snapshot
                                                              ) => (
                                                                  <div
                                                                      ref={
                                                                          provided.innerRef
                                                                      }
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
                                </Droppable> */}
                            {/* </div> */}

                            <ModuleContainer
                                moduleFields={this.state.dropdown}
                                value={this.state.currentField}
                                onModuleFieldHandler={this.onModuleFieldHandler}
                                modules={this.state.planner.modules}
                            />
                        </div>
                        <div className={classes.PlanCardContainer}>
                            <PlanCard
                                droppableId="y1s1"
                                acadYear="Y1S1"
                                array={this.state.planner.y1s1}
                            />
                            <PlanCard
                                droppableId="y1s2"
                                acadYear="Y1S2"
                                array={this.state.planner.y1s2}
                            />
                            <PlanCard
                                droppableId="y2s1"
                                acadYear="Y2S1"
                                array={this.state.planner.y2s1}
                            />
                            <PlanCard
                                droppableId="y2s2"
                                acadYear="Y2S2"
                                array={this.state.planner.y2s2}
                            />
                            <PlanCard
                                droppableId="y3s1"
                                acadYear="Y3S1"
                                array={this.state.planner.y3s1}
                            />
                            <PlanCard
                                droppableId="y3s2"
                                acadYear="Y3S2"
                                array={this.state.planner.y3s2}
                            />
                            <PlanCard
                                droppableId="y4s1"
                                acadYear="Y4S1"
                                array={this.state.planner.y4s1}
                            />
                            <PlanCard
                                droppableId="y4s2"
                                acadYear="Y4S2"
                                array={this.state.planner.y4s2}
                            />
                        </div>
                    </DragDropContext>
                </div>
                <div className={classes.SummaryContainer}>
                    <SummaryContainer modules={this.state.planner}/>
                </div>
                {/* <PlanCard /> */}
            </div>
        );
    }
}

export default App;
