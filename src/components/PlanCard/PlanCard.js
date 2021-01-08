import React, { Component } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";

import Module from "../Module/Module";
import classes from "./PlanCard.module.css";

const getPlanStyle = (isDraggingOver) => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
    display: "flex",
    flexWrap: "wrap",
    alignContent: "flex-start",
    padding: 8,
    overflow: "auto",
    border: "2px solid black",
    height: "450px",
    width: "90px",
    padding: "20px",
});


class PlanCard extends Component {

    render() {

        return (
            <div className={classes.PlanCardContainer}>
                    <Droppable droppableId={this.props.droppableId} direction="vertical">
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                style={getPlanStyle(snapshot.isDraggingOver)}
                            >
                                {this.props.array
                                    ? this.props.array.map((module, index) => (
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
                                                      <Module moduleCode={module.code} isDragging={snapshot.isDragging} />
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
        );
    }
}

export default PlanCard;
