import React, { Component } from "react";
import {
    MoreVert,
    Reorder,
    Add,
    Home,
    Person, 
    People, 
    Info, 
    Input, 
    NavigateNext, 
    Done, 
    Block,
    FormatListBulleted,
    Search,
    Settings,
    Language,
    Lens
} from "@material-ui/icons";

class Icon extends Component {

    renderIcon(icon, size, color) {
        if (icon === "moreVert") {
            return (
                <MoreVert style={{ fontSize: size, color: color }} />
            );
        }
        else if (icon === "add") {
            return (
                <Add style={{ fontSize: size, color: color }} />
            );
        }
        else if (icon === "reorder") {
            return (
                <Reorder style={{ fontSize: size, color: color }} />
            );
        }
        else if (icon === "home") {
            return (
                <Home style={{ fontSize: size, color: color }} />
            );
        }
        else if (icon === "formatListBulleted") {
            return (
                <FormatListBulleted style={{ fontSize: size, color: color }} />
            );
        }
        else if (icon === "person") {
            return (
                <Person style={{ fontSize: size, color: color }} />
            );
        }
        else if (icon === "people") {
            return (
                <People style={{ fontSize: size, color: color }} />
            );
        }
        else if (icon === "info") {
            return (
                <Info style={{ fontSize: size, color: color }} />
            );
        }
        else if (icon === "input") {
            return (
                <Input style={{ fontSize: size, color: color }} />
            );
        }
        else if (icon === "navigateNext") {
            return (
                <NavigateNext style={{ fontSize: size, color: color }} />
            );
        }
        else if (icon === "done") {
            return (
                <Done style={{ fontSize: size, color: color }} />
            );
        }
        else if (icon === "done") {
            return (
                <Done style={{ fontSize: size, color: color }} />
            );
        }
        else if (icon === "search") {
            return (
                <Search style={{ fontSize: size, color: color }} />
            );
        }
        else if (icon === "block") {
            return (
                <Block style={{ fontSize: size, color: color }} />
            );
        }
        else if (icon === "settings") {
            return (
                <Settings style={{ fontSize: size, color: color }} />
            );
        }
        else if (icon === "language") {
            return (
                <Language style={{ fontSize: size, color: color }} />
            );
        }
        else {
            return (
                <Lens style={{ fontSize: size, color: color }} />
            );
        }
    }

    render() {
        let icon = this.props.icon;
        let size = this.props.size;
        let color = this.props.color;
        return this.renderIcon(icon, size, color);
    }
}

export default Icon;