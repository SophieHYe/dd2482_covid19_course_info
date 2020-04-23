import React, { Component } from "react";
import { 
    BUTTON_HEIGHT,
    BACKGROUND_COLOR, 
    BUTTON_TEXT_COLOR,
} from "../assets/styles.js";


class LinkButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        let onClickFunc = this.props.onClick
        let label = this.props.label;
        return (
            <button style={s.container} onClick={() => onClickFunc()}>
                <div style={s.buttonLabel}>
                    {label}
                </div>
            </button>
        );
    }
}

export default LinkButton;

const s = {
    container: {
        height: BUTTON_HEIGHT,
        padding: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        borderWidth: 0,
        outline: "none",
        backgroundColor: BACKGROUND_COLOR,
    },
    buttonLabel: {
        fontSize: 12,
        fontWeight: "bold",
        color: BUTTON_TEXT_COLOR,
    },
};