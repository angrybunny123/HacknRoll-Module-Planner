import React from "react";

<<<<<<< HEAD
function Card(props) {
    const dragStart = (e) => {
=======
const Card = (props) => { 
    const dragStart = e => { 
>>>>>>> 4cb130b9dd587f4811736ab81fa02da23cbc766c
        const target = e.target;
        e.dataTransfer.setData("card_id", target.id);

        setTimeout(() => {
            target.style.display = "none";
        }, 0);
    };

    const dragOver = (e) => {
        e.stopPropagation();
    };

    return (
        <div
            id={props.id}
            className={props.className}
            draggable={props.draggable}
            onDragStart={dragStart}
            onDragOver={dragOver}
        >
            {props.children}
        </div>
    );
}

export default Card;
