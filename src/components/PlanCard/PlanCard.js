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
  height: "350px",
  width: "200px",
  padding: "20px",
});

class PlanCard extends Component {
  render() {
    return (
      <div className={classes.PlanCardContainer}>
          <p>
              {this.props.acadYear}
          </p>
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
                          <Module
                            moduleCode={module.code}
                            isDragging={snapshot.isDragging}
                            elective={module.elective ? true : false}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))
                : null}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <h4>Total Credits: {this.props.credits}</h4>
      </div>
    );
  }
}

export default PlanCard;
