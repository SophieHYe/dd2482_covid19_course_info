import React, { Component } from "react";
import {
    COVID_19_FONT_HEADER_COLOR,
    COVID_19_FONT_HEADER_SIZE,
    COVID_19_FONT_BODY_COLOR,
    COVID_19_FONT_BODY_SIZE,
    FONT_DATE_SIZE,
    FONT_BODY_COLOR_UNSELECTED,
    FONT_WEIGHT_NORMAL,
    FONT_WEIGHT_BOLD,
    MARGIN_BOTTOM,
    COVID_19_FONT_BOTTOM_MARGIN,
    MARGIN_RIGHT,
    COVID_19_FONT_BODY_DATE_COLOR,
} from "../assets/styles.js";
import {formatNumber, formatDate} from "../logic/Utilities"


class Convid19InfoCardGlobal extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    renderHeaderLabel(label){
        return(
            <div style={s.headerText}>
                {label}
            </div>
        );
    }

    renderDataSingle(text1, data1) {
        let label1 = text1+ ": " + formatNumber("" + data1);
        return (
            <div style={s.infoTextContainer}>
                <div style={s.infoText}>
                    {label1}
                </div>
            </div>
        );
    }

    renderUpdated(updated) {
        let label = "Updated: " + formatDate(updated);
        return(
            <div style={s.dateText}>
                {label}
            </div>
        );
    }

    render() {
        let data = this.props.data;
        return (
            <div style={s.container}>
                {this.renderHeaderLabel("Global")}
                {this.renderDataSingle("Cases", data.cases)}
                {this.renderDataSingle("Deaths", data.deaths)}
                {this.renderDataSingle("Recovered", data.recovered)}
                {this.renderDataSingle("Active", data.active)}
                {this.renderUpdated(data.updated)}
            </div>
        );
    }
}

export default Convid19InfoCardGlobal;

const s = {
    container: {
        display: "flex",
        flexDirection: "column",
        //borderRadius: 6,
        //border: "" + 1 + "px solid " + "#f6f6f6",
        //boxShadow: "1px 1px 2px #a9a9a9",
        borderBottom: "" + 1 + "px solid " + "#D4D4D4",
        overflow: "hidden",
    },
    headerText: {
        marginBottom: COVID_19_FONT_BOTTOM_MARGIN,
        color: COVID_19_FONT_HEADER_COLOR,
        fontSize: COVID_19_FONT_HEADER_SIZE,
        fontWeight: FONT_WEIGHT_BOLD,
    },
    infoTextContainer: {
        display: "flex",
        flexDirection: "row",
    },
    infoText: {
        minWidth: 100,
        marginRight: MARGIN_RIGHT,
        marginBottom: COVID_19_FONT_BOTTOM_MARGIN,
        color: COVID_19_FONT_BODY_COLOR,
        fontSize: COVID_19_FONT_BODY_SIZE,
        fontWeight: FONT_WEIGHT_NORMAL,
    },
    dateText: {
        marginBottom: 6,
        display: "flex",
        justifyContent: "flex-end",
        color: COVID_19_FONT_BODY_DATE_COLOR,
        fontSize: FONT_DATE_SIZE,
        fontWeight: FONT_WEIGHT_NORMAL,
        //backgroundColor: "red",
    }
};