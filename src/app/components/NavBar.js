import React, { Component } from "react";
import { withRouter, useParams } from "react-router-dom";
import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import { Home, FormatListBulleted, Keyboard, Info } from "@material-ui/icons";
import {
    NAV_BAR_HEIGHT,
    NAV_BAR_BACKGROUND_COLOR,
    NAV_BAR_TEXT_SIZE,
    NAV_BAR_ICON_COLOR_SELECTED,
    NAV_BAR_ICON_COLOR_UNSELECTED,
    NAV_BAR_ICON_SIZE,

} from "../assets/styles";

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
        }
    }

    componentDidMount() {
        this.setNavbarValueOnStart();
    }

    setNavbarValueOnStart() {
        let pathName = this.props.history.location.pathname;
        let pathNameArray = pathName.split("/");
        let value = 0;
        if (pathNameArray[1] === "courses") {
            value = 1;
        }
        else if (pathNameArray[1] === "submitcoursesinfo") {
            value = 2;
        }
        else if (pathNameArray[1] === "more") {
            value = 3;
        }
        this.setState({ value: value });
    }

    changeScreen(value, path) {
        this.setState({ value: value });
        this.props.history.push(path);
    }

    render() {
        let value = this.state.value;
        return (
            <BottomNavigation style={s.container} value={value} showLabels={true}>
                <BottomNavigationAction
                    style={{ color: value === 0 ? NAV_BAR_ICON_COLOR_SELECTED : NAV_BAR_ICON_COLOR_UNSELECTED }}
                    label={"Home"}
                    icon={<Home />}
                    onClick={() => this.changeScreen(0, "/")}

                />
                <BottomNavigationAction
                    style={{ color: value === 1 ? NAV_BAR_ICON_COLOR_SELECTED : NAV_BAR_ICON_COLOR_UNSELECTED }}
                    label={"Courses"}
                    icon={<FormatListBulleted />}
                    onClick={() => this.changeScreen(1, "/courses")}

                />
                <BottomNavigationAction
                    style={{ color: value === 2 ? NAV_BAR_ICON_COLOR_SELECTED : NAV_BAR_ICON_COLOR_UNSELECTED }}
                    label={"Submit"}
                    icon={<Keyboard />}
                    onClick={() => this.changeScreen(2, "/submitcoursesinfo")}

                />
                <BottomNavigationAction
                    style={{ color: value === 3 ? NAV_BAR_ICON_COLOR_SELECTED : NAV_BAR_ICON_COLOR_UNSELECTED }}
                    label={"More"}
                    icon={<Info />}
                    onClick={() => this.changeScreen(3, "/more")}
                />
            </BottomNavigation>
        );
    }
}

export default withRouter(NavBar);

const s = {
    container: {
        height: NAV_BAR_HEIGHT,
        backgroundColor: NAV_BAR_BACKGROUND_COLOR,
        //borderTop: ""+NAV_BAR_TOP_BORDER_WIDTH+"px solid "+ NAV_BAR_TOP_BORDER_COLOR,
        boxShadow: "0px 10px 15px #1A1A1A",
    },
    headerButton: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        color: NAV_BAR_ICON_COLOR_SELECTED,
        fontSize: NAV_BAR_TEXT_SIZE,
        border: 0,
        textDecoration: "none",
    },
};