import React, { Component } from "react";
import {withRouter} from 'react-router-dom';
import { 
    FAB_BACKGROUND_COLOR,
    FAB_ICON_COLOR,
    FAB_ICON_SIZE,
} from "../assets/styles.js";
import Icon from "../components/Icon";
import MdFab from "@material-ui/core/Fab";

class Fab extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        let icon = this.props.icon;
        let onClickFunc = this.props.onClick;
        return (
            <MdFab style={s.container} onClick={() => onClickFunc()}>
                <Icon icon={icon} size={FAB_ICON_SIZE} color={FAB_ICON_COLOR} />
            </MdFab>
        );
    }
}

export default withRouter(Fab);

const s = {
    container: {
        backgroundColor: FAB_BACKGROUND_COLOR,
    },
}