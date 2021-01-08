import React, { Component } from "react";

import classes from "./ModuleContainer.module.css";
import { TextField, InputLabel, Select, MenuItem } from "@material-ui/core";

import Module from "../Module/Module";
import Input from "../FormElement/Input/Input";
import Card from "../Card";
import Board from "../Board";

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
    };

    onModuleFieldHandler = (event) => {
        this.setState({ currentField: event.target.value });
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
                <div className={classes.ModulePool}>
                    <label>Modules</label>
                    {modules}
                </div>
            </div>
        );
    }
}

export default ModuleContainer;
