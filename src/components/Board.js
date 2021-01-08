import React from "react";

<<<<<<< HEAD
function Board(props) {
    const drop = (e) => {
=======
const Board = (props) => { 
    const drop = e => { 
>>>>>>> 4cb130b9dd587f4811736ab81fa02da23cbc766c
        e.preventDefault();
        const card_id = e.dataTransfer.getData("card_id");

        const card = document.getElementById(card_id);
        card.style.display = "block";

        e.target.appendChild(card);
        //test
    };

    const dragOver = (e) => {
        e.preventDefault();
    };

    return (
        <div
            id={props.id}
            className={props.className}
            onDrop={drop}
            onDragOver={dragOver}
        >
            {props.children}
        </div>
    );
}

export default Board;
