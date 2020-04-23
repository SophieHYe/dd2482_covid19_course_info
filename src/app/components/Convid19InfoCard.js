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
import { formatNumber, formatDate } from "../logic/Utilities"


class Convid19InfoCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    renderHeaderLabel(label) {
        return (
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

    renderDataDouble(text1, data1, text2, data2) {
        let label1 = text1+ ": " + formatNumber("" + data1);
        let label2 = text2+ ": " + formatNumber("" + data2);
        return (
            <div style={s.infoTextContainer}>
                <div style={s.infoText}>
                    {label1}
                </div>
                <div style={s.infoText}>
                    {label2}
                </div>
            </div>
        );
    }

    renderUpdated(updated) {
        let label = "Updated: " + formatDate(updated);
        return (
            <div style={s.dateText}>
                {label}
            </div>
        );
    }

    render() {
        let data = this.props.data;
        return (
            <div style={s.container}>
                {this.renderHeaderLabel(data.country)}
                {this.renderDataDouble("Cases", data.cases, "Today Cases", data.todayCases)}
                {this.renderDataDouble("Deaths", data.deaths, "Today Deaths", data.todayDeaths)}
                {this.renderDataDouble("Recovered", data.recovered, "Critical", data.critical)}
                {this.renderDataSingle("Active", data.active)}
                {this.renderUpdated(data.updated)}
            </div>
        );
    }
}

export default Convid19InfoCard;

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
        minWidth: 120,
        marginRight: MARGIN_RIGHT,
        marginBottom: COVID_19_FONT_BOTTOM_MARGIN,
        color: COVID_19_FONT_BODY_COLOR,
        fontSize: COVID_19_FONT_BODY_SIZE,
        fontWeight: FONT_WEIGHT_NORMAL,
    },
    dateText: {
        display: "flex",
        justifyContent: "flex-end",
        marginBottom: 6,
        color: COVID_19_FONT_BODY_DATE_COLOR,
        fontSize: FONT_DATE_SIZE,
        fontWeight: FONT_WEIGHT_NORMAL,
        //backgroundColor: "red",
    }
};