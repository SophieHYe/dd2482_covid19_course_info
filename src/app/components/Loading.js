import React, { Component } from "react";
import { 
    LOADING_CIRCLE_COLOR,
    LOADING_CIRCLE_BACKGROUND_COLOR,
} from "../assets/styles.js";
import CircularProgress from '@material-ui/core/CircularProgress';

class Loading extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <div style={s.container}>
                <CircularProgress style={s.progressCircle}/>
            </div>
        );
    }
}

export default Loading;

const s = {
    container: {
        backgroundColor: LOADING_CIRCLE_BACKGROUND_COLOR,
    },
    progressCircle: {
        color: LOADING_CIRCLE_COLOR,
    }
};