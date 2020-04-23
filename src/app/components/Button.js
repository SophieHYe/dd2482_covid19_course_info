import React, { Component } from "react";
import { 
    BUTTON_HEIGHT,
    BUTTON_BORDER_RADIUS,
    BUTTON_BACKGROUND_COLOR, 
    BUTTON_TEXT_COLOR,
    FONT_BODY_SIZE,
    FONT_WEIGHT_NORMAL,
} from "../assets/styles.js";
import MdButton from "@material-ui/core/Button";

class Button extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        let onClickFunc = this.props.onClick;
        let label = this.props.label;
        let fontWeight = this.props.fontWeight;
        if (typeof fontWeight === "undefined") {
            fontWeight = FONT_WEIGHT_NORMAL;
        }
        const s2 = {
            buttonLabel: {
                fontSize: FONT_BODY_SIZE,
                fontWeight: fontWeight,
                color: BUTTON_TEXT_COLOR,
            },
        };
        return (
            <MdButton style={s.container} onClick={() => onClickFunc()}>
                <div style={s2.buttonLabel}>
                    {label}
                </div>
            </MdButton>
        );
    }
}

export default Button;

const s = {
    container: {
        height: BUTTON_HEIGHT,
        width: "100%",
        backgroundColor: BUTTON_BACKGROUND_COLOR,
        borderRadius: BUTTON_BORDER_RADIUS,
    },
    buttonLabel: {
        fontSize: FONT_BODY_SIZE,
        fontWeight: "bold",
        color: BUTTON_TEXT_COLOR,
    },
};