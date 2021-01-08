import React, { Component } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";


import classes from "./PlanCard.module.css";

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
        );
    }
}

export default PlanCard;
