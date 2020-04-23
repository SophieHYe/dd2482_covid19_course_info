import React, { Component } from "react";
import { 
    FONT_BODY_SIZE,
    FONT_WEIGHT_NORMAL,
    MARGIN_TOP,
} from "../assets/styles.js";


class Error extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        let errorText = this.props.errorText;
        return (
            <div style={s.container}>
                <div style={s.errorText}>
                    {errorText}
                </div>
            </div>
        );
    }
}

export default Error;

const s = {
    container: {
        marginTop: MARGIN_TOP,
        minHeight: 40,
    },
    errorText: {
        fontSize: FONT_BODY_SIZE,
        fontWeight: FONT_WEIGHT_NORMAL,
        color: "red",
    },
};