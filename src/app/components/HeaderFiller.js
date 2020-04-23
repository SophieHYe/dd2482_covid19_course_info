import React, { Component } from "react";
import {
    HEADER_FILLER_HEIGHT,
} from "../assets/styles";
class HeaderFiller extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <div style={{ marginTop: HEADER_FILLER_HEIGHT }} />
        );
    }
}

export default HeaderFiller;