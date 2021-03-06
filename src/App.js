import React, { Component } from "react";
import axios from "./axios.js";
import { TextField, MenuItem, Button } from "@material-ui/core";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import classes from "./App.module.css";

import Navbar from "./components/Navbar/Navbar";
import Module from "./components/Module/Module";
import ModuleContainer from "./components/ModuleContainer/ModuleContainer";
import PlanCard from "./components/PlanCard/PlanCard";
import SummaryContainer from "./components/SummaryContainer/SummaryContainer";

import { checkPrereq } from "./util/NusModChecker.js";

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
            stringToPost: "",
        };
        this.onDragEnd = this.onDragEnd.bind(this);
    }

    componentDidMount() {
        // const queryparam = '&orderBy="userId"&equalTo="' + localStorage.getItem("userId") + '"';
        const userId = localStorage.getItem("userId");
        axios
            .get(`/userdata/${userId}.json`)
            .then((res) => {
                console.log(res.data.data);
                const values = Object.entries(res.data.data);
                const newState = JSON.parse(JSON.stringify(this.state));
                console.log(values);
                values.forEach((value) => {
                    // console.log(newState.planner.value[0]);
                    newState.planner[value[0]] = value[1];
                    // console.log(this.state.planner[value[0]]);
                    // console.log(value[0]);
                    // console.log("DestinationArray", newDestinationArray);
                });
                this.setState(newState);
                console.log("newState", newState);
            })

            .catch((err) => {
                console.log(err.message);
            });
    }

    onSaveHandler = () => {
        const userId = localStorage.getItem("userId");
        let data = {
            data: this.state.planner,
        };
        if (userId !== null) {
            axios
                .patch(`/userdata/${userId}.json`, data)
                .then((res) => {
                    console.log(res.data);
                })
                .catch((err) => {
                    console.log(err.message);
                });
        }
    };

    onModuleFieldHandler = (event) => {
        this.setState({ currentField: event.target.value });
        this.state.stringToPost = "";
        if (event.target.value === "Foundation") {
            this.state.stringToPost = "foundation";
        } else if (event.target.value === "Math and Science") {
            this.state.stringToPost = "mathscience";
        } else if (event.target.value === "IT Professionalism") {
            this.state.stringToPost = "itprofessionalism";
        } else if (event.target.value === "University Level Requirements") {
            this.state.stringToPost = "unrestrictedelectives";
        } else if (event.target.value === "Unrestricted Electives") {
            this.state.stringToPost = "universitylevelrequirements";
        } else if (event.target.value === "Team Project") {
            this.state.stringToPost = "teamproject";
        } else if (event.target.value === "Industrial Experience") {
            this.state.stringToPost = "industrial";
        } else if (event.target.value === "Algorithms & Theory") {
            this.state.stringToPost = "focusareas/algorithmsandtheory";
        } else if (event.target.value === "Artificial Intelligence") {
            this.state.stringToPost = "focusareas/artificialintelligence";
        } else if (event.target.value === "Computer Graphics & Games") {
            this.state.stringToPost = "focusareas/computergraphicsandgames";
        } else if (event.target.value === "Computer Security") {
            this.state.stringToPost = "focusareas/computersecurity";
        } else if (event.target.value === "Database Systems") {
            this.state.stringToPost = "focusareas/databasesystems";
        } else if (event.target.value === "Multimedia Information Retrieval") {
            this.state.stringToPost = "focusareas/multimedia";
        } else if (event.target.value === "Networking & Distributed Systems") {
            this.state.stringToPost =
                "focusareas/networkinganddistributedsystems";
        } else if (event.target.value === "Parallel Computing") {
            this.state.stringToPost = "focusareas/parallelcomputing";
        } else if (event.target.value === "Programming Languages") {
            this.state.stringToPost = "focusareas/programminglanguages";
        } else if (event.target.value === "Software Engineering") {
            this.state.stringToPost = "focusareas/softwareengineering";
        }
        axios
            .get(`${this.state.stringToPost}.json`)
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

            let moduleTaken = [];

            const arrKey = Object.keys(this.state.planner);
            arrKey.splice(0, 1);
            arrKey.forEach((key, index) => {
                moduleTaken = moduleTaken.concat(this.state.planner[key]);
            });

            let getlink = "";
            if (this.state.stringToPost.includes("focusareas")) {
                console.log("hi im in focusarea");
                getlink = `${this.state.stringToPost}/primaries/${result.movedItem.code}.json`;
                axios
                    .get(getlink)
                    .then((res) => res.data.prerequisites)
                    .then((prerequisites) => {
                        if (prerequisites === "none") {
                            return true;
                        }

                        let canTake = false;
                        const prereqArr = Object.keys(prerequisites);

                        prereqArr.forEach((element) => {
                            // check with user data

                            // check for OR
                            if (element.search("-") !== -1) {
                                console.log("hi im inside OR");
                                const arr = element.split("-");
                                console.log(arr);
                                console.log(moduleTaken);
                                canTake = false;

                                arr.forEach((module, index) => {
                                    moduleTaken.forEach((modTaken, i) => {
                                        console.log(modTaken);
                                        console.log(module);
                                        canTake =
                                            canTake || modTaken.code === module;
                                    });
                                });

                                if (!canTake) {
                                    return false;
                                }
                            } else {
                                console.log(canTake);

                                // AND
                                // loop through user data
                                console.log("hi im at AND");
                                console.log(moduleTaken);
                                moduleTaken.forEach((modTaken, i) => {
                                    console.log(modTaken);
                                    console.log(element);
                                    if (modTaken.code === element) {
                                        canTake = true;
                                        return;
                                    }
                                });

                                if (!canTake) {
                                    return false;
                                }
                            }
                        });
                        console.log(canTake);
                        return canTake;
                    })
                    .then((bool) => {
                        if (bool) {
                            console.log("hi im inside true");
                            newDestinationArray.push(result.movedItem);
                            console.log(
                                "NEW DESTINATION ARRAY",
                                newDestinationArray
                            );
                            console.log("New State", newState);
                            newState.planner[source.droppableId] =
                                result.source;
                            newState.planner[
                                destination.droppableId
                            ] = newDestinationArray;
                            this.setState(newState);
                        } else {
                            alert("Prerequisite not satisfied!!");
                        }
                    })
                    .catch((err) => {
                        getlink = `${this.state.stringToPost}/electives/${result.movedItem.code}.json`;
                        axios
                            .get(getlink)
                            .then((res) => res.data.prerequisites)
                            .then((prerequisites) => {
                                if (prerequisites === "none") {
                                    return true;
                                }

                                let canTake = false;
                                const prereqArr = Object.keys(prerequisites);

                                prereqArr.forEach((element) => {
                                    // check with user data

                                    // check for OR
                                    if (element.search("-") !== -1) {
                                        console.log("hi im inside OR");
                                        const arr = element.split("-");
                                        console.log(arr);
                                        console.log(moduleTaken);
                                        canTake = false;

                                        arr.forEach((module, index) => {
                                            moduleTaken.forEach(
                                                (modTaken, i) => {
                                                    console.log(modTaken);
                                                    console.log(module);
                                                    canTake =
                                                        canTake ||
                                                        modTaken.code ===
                                                            module;
                                                }
                                            );
                                        });

                                        if (!canTake) {
                                            return false;
                                        }
                                    } else {
                                        console.log(canTake);

                                        // AND
                                        // loop through user data
                                        console.log("hi im at AND");
                                        console.log(moduleTaken);
                                        moduleTaken.forEach((modTaken, i) => {
                                            console.log(modTaken);
                                            console.log(element);
                                            if (modTaken.code === element) {
                                                canTake = true;
                                                return;
                                            }
                                        });

                                        if (!canTake) {
                                            return false;
                                        }
                                    }
                                });
                                console.log(canTake);
                                return canTake;
                            })
                            .then((bool) => {
                                if (bool) {
                                    console.log("hi im inside true");
                                    newDestinationArray.push(result.movedItem);
                                    console.log(
                                        "NEW DESTINATION ARRAY",
                                        newDestinationArray
                                    );
                                    console.log("New State", newState);
                                    newState.planner[source.droppableId] =
                                        result.source;
                                    newState.planner[
                                        destination.droppableId
                                    ] = newDestinationArray;
                                    this.setState(newState);
                                } else {
                                    alert("Prerequisite not satisfied!!");
                                }
                            })
                            .catch((err) => console.log(err));
                    });
            } else {
                getlink = `${this.state.stringToPost}/${result.movedItem.code}.json`;
                axios
                    .get(getlink)
                    .then((res) => res.data.prerequisites)
                    .then((prerequisites) => {
                        if (prerequisites === "none") {
                            return true;
                        }

                        let canTake = false;
                        const prereqArr = Object.keys(prerequisites);

                        prereqArr.forEach((element) => {
                            // check with user data

                            // check for OR
                            if (element.search("-") !== -1) {
                                const arr = element.split("-");
                                canTake = false;

                                arr.forEach((module, index) => {
                                    moduleTaken.forEach((modTaken, i) => {
                                        canTake =
                                            canTake || modTaken.code === module;
                                    });
                                });

                                if (!canTake) {
                                    return false;
                                }
                            } else {
                                // AND
                                // loop through user data
                                moduleTaken.forEach((modTaken, i) => {
                                    if (modTaken.code === element) {
                                        canTake = true;
                                        return;
                                    }
                                });

                                if (!canTake) {
                                    return false;
                                }
                            }
                        });

                        return canTake;
                    })
                    .then((bool) => {
                        if (bool) {
                            newDestinationArray.push(result.movedItem);
                            console.log(
                                "NEW DESTINATION ARRAY",
                                newDestinationArray
                            );
                            console.log("New State", newState);
                            newState.planner[source.droppableId] =
                                result.source;
                            newState.planner[
                                destination.droppableId
                            ] = newDestinationArray;
                            console.log("Brand new state", newState);
                            this.setState(newState);
                        } else {
                            alert("Prerequisite not satisfied!!");
                        }
                    })
                    .catch((err) => console.log(err));
            }
        }

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
                <Navbar
                    isAuthenticated={localStorage.getItem("token") !== null}
                />
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
                                credits={creditsPerSem(this.state.planner.y1s1)}
                                array={this.state.planner.y1s1}
                            />
                            <PlanCard
                                droppableId="y1s2"
                                acadYear="Y1S2"
                                credits={creditsPerSem(this.state.planner.y1s2)}
                                array={this.state.planner.y1s2}
                            />
                            <PlanCard
                                droppableId="y2s1"
                                acadYear="Y2S1"
                                credits={creditsPerSem(this.state.planner.y2s1)}
                                array={this.state.planner.y2s1}
                            />
                            <PlanCard
                                droppableId="y2s2"
                                acadYear="Y2S2"
                                credits={creditsPerSem(this.state.planner.y2s2)}
                                array={this.state.planner.y2s2}
                            />
                            <PlanCard
                                droppableId="y3s1"
                                acadYear="Y3S1"
                                credits={creditsPerSem(this.state.planner.y3s1)}
                                array={this.state.planner.y3s1}
                            />
                            <PlanCard
                                droppableId="y3s2"
                                acadYear="Y3S2"
                                credits={creditsPerSem(this.state.planner.y3s2)}
                                array={this.state.planner.y3s2}
                            />
                            <PlanCard
                                droppableId="y4s1"
                                acadYear="Y4S1"
                                credits={creditsPerSem(this.state.planner.y4s1)}
                                array={this.state.planner.y4s1}
                            />
                            <PlanCard
                                droppableId="y4s2"
                                acadYear="Y4S2"
                                credits={creditsPerSem(this.state.planner.y4s2)}
                                array={this.state.planner.y4s2}
                            />
                        </div>
                    </DragDropContext>
                    <Button onClick={this.onSaveHandler}>SAVE</Button>
                </div>
                <div className={classes.SummaryContainer}>
                    <SummaryContainer
                        modules={this.state.planner}
                        totalCredits={totalCredits(this.state.planner)}
                    />
                </div>
                {/* <PlanCard /> */}
            </div>
        );
    }
}

function creditsPerSem(yearSem) {
    let credits = 0;
    for (let i = 0; i < yearSem.length; i++) {
        credits = credits + yearSem[i].credits;
    }
    return credits;
}

function totalCredits(planner) {
    let credits = 0;
    Object.entries(planner).forEach(([yearSem, mods]) => {
        if (yearSem !== "modules") {
            for (let i = 0; i < mods.length; i++) {
                credits = credits + mods[i].credits;
            }
        }
    });
    return credits;
}

export default App;
