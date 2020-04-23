import React, { Component } from "react";
import {
    BORDER_COLOR_1,
    FONT_BODY_COLOR,
} from "../assets/styles.js";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import {isEmptyEvaluator} from "../logic/Utilities";

class TextArea extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
        let startValue= this.props.startValue;
        let id= this.props.id;
        if (!isEmptyEvaluator(startValue)) {
            let input = document.getElementById(id);
            input.value = startValue;
        }
    }  

    render() {
        let style = this.props.style;
        let id = this.props.id;
        let rowsMin = this.props.rowsMin;
        let rowsMax = this.props.rowsMax;
        let placeholder = this.props.placeholder;
        let onChangeFunc = this.props.onChange;
        let value = this.props.value;
        return (
            <TextareaAutosize
                id={id}
                style={style}
                rowsMin={rowsMin}
                rowsMax={rowsMax}
                placeholder={placeholder}
                onChange={(event) => onChangeFunc(event)}
                value={value}
            />
        );
    }
}

export default TextArea;