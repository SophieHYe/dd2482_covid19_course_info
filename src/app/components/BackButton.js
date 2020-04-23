import React, { Component } from "react";
import {withRouter} from 'react-router-dom';
import { 
    BACK_BUTTON_BACKGROUND_COLOR,
    BACK_BUTTON_ICON_COLOR,
} from "../assets/styles.js";
import Fab from "@material-ui/core/Fab";
import { ArrowBack } from "@material-ui/icons";

class BackButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <Fab style={s.container} onClick={() =>  this.props.history.goBack()}>
               <ArrowBack style={s.icon} />
            </Fab>
        );
    }
}

export default withRouter(BackButton);

const s = {
    container: {
        height: 40,
        width: 40,
        backgroundColor: BACK_BUTTON_BACKGROUND_COLOR,
    },
    icon: {
        color: BACK_BUTTON_ICON_COLOR,
    }
}