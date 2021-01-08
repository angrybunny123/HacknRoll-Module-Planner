import React, { Component } from "react";
import Dragula from "react-dragula";

import classes from "./PlanCard.module.css";

class PlanCard extends Component {

    componentDidMount() {
        var container = React.findDOMNode(this);
        Dragula([container]);
    }

    render() {
        return (
            <div>
                <div className={classes.PlanCard}>
                    <div>Swap me around</div>
                    <div>Swap her around</div>
                    <div>Swap him around</div>
                    <div>Swap them around</div>
                    <div>Swap us around</div>
                    <div>Swap things around</div>
                    <div>Swap everything around</div>
                </div>
            </div>
        );
    }
}

export default PlanCard;
