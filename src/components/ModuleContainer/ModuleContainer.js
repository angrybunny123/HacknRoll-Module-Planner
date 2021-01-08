import React, { Component } from "react";

import classes from "./ModuleContainer.module.css";

import Module from "../Module/Module";
import Card from "../Card";
import Board from "../Board";

class ModuleContainer extends Component {
    state = {
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

        console.log(modules);

        return (
            <div>
                <div>
                    <h3>dropdown</h3>
                </div>
                <div>
                    <label>Modules</label>
                    {modules}
                </div>
            </div>
        );
    }
}

export default ModuleContainer;
