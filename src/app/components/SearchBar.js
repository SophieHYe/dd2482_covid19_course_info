import React, { Component } from "react";
import {
    FONT_SEARCH_BAR_SIZE,
    FONT_SEARCH_BAR_COLOR,
    SEARCH_BAR_HEIGHT,
    ICON_SEARCH_BAR_COLOR,
    ICON_SEARCH_BAR_SIZE,
} from "../assets/styles.js";
import Paper from '@material-ui/core/Paper';
import Icon from "./Icon";

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        let placeholder = this.props.placeholder;
        let type = this.props.type;
        let onChangeFunc = this.props.onChange;
        let value = this.props.value;
        return (
            <Paper style={s.container}>
                <Icon icon={"search"} size={ICON_SEARCH_BAR_SIZE} color={ICON_SEARCH_BAR_COLOR}/>
                <input
                    style={s.input}
                    placeholder={placeholder}
                    type={type}
                    onChange={(event) => onChangeFunc(event)}
                    value={value}
                />
            </Paper>

        );
    }
}

export default SearchBar;

const s = {
    container: {
        display: "flex",
        flex: 1,
        height: SEARCH_BAR_HEIGHT,
        alignItems: "center",
        paddingLeft: 6,
        paddingRight: 18,
    },
    input: {
        width: "100%",
        color: FONT_SEARCH_BAR_COLOR,
        fontSize: FONT_SEARCH_BAR_SIZE,
        outline: "none",
        border: 0,
    }
};