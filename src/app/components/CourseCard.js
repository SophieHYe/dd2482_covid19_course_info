import React, { Component } from "react";
import {withRouter} from 'react-router-dom';
import {
    COVID_19_FONT_HEADER_COLOR,
    COVID_19_FONT_HEADER_SIZE,
    COVID_19_FONT_BODY_COLOR,
    COVID_19_FONT_BODY_SIZE,
    FONT_DATE_SIZE,
    FONT_BODY_COLOR_UNSELECTED,
    FONT_WEIGHT_NORMAL,
    FONT_WEIGHT_BOLD,
    FONT_BODY_COLOR,
    COVID_19_FONT_BOTTOM_MARGIN,
    MARGIN_RIGHT,
    MARGIN_TOP,
    COVID_19_FONT_BODY_DATE_COLOR,
} from "../assets/styles.js";
import { formatNumber, formatDate } from "../logic/Utilities";
import ButtonBase from "@material-ui/core/ButtonBase";


class CourseCard extends Component {
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

    renderData(data) {
        return (
            <div style={s.infoTextContainer}>
                <div style={s.infoText}>
                    {data}
                </div>
            </div>
        );
    }

    renderDataWithLabel(text, data) {
        let label = text + ": ";
        return (
            <div style={s.infoTextContainer}>
                <div style={s.infoText}>
                    {label}
                </div>
                <div style={s.infoTextData}>
                    {data}
                </div>
            </div>
        );
    }

    renderDataDouble(text1, data1, text2, data2) {
        let label1 = text1 + ": " + formatNumber("" + data1);
        let label2 = text2 + ": " + formatNumber("" + data2);
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
            <ButtonBase style={s.container} onClick={() => this.props.history.push("/courses/coursesession/" + data.courseId)}>
                <div style={s.dataContainer}>
                    {this.renderHeaderLabel(data.courseCode)}
                    {this.renderData(data.courseName)}
                    {this.renderDataWithLabel("Examination", data.courseExamination)}
                    {this.renderUpdated(data.courseUpdated)}
                </div>
            </ButtonBase>
        );
    }
}

export default withRouter(CourseCard);

const s = {
    container: {
        display: "flex",
        borderBottom: "" + 1 + "px solid " + "#D4D4D4",
        overflow: "hidden",
        textAlign: "start",
    },
    dataContainer: {
        display: "flex",
        flex: 1,
        flexDirection: "column",
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
    infoTextData: {
        minWidth: 100,
        marginRight: MARGIN_RIGHT,
        marginBottom: COVID_19_FONT_BOTTOM_MARGIN,
        color: FONT_BODY_COLOR,
        fontSize: COVID_19_FONT_BODY_SIZE,
        fontWeight: FONT_WEIGHT_NORMAL,
    },
    dateText: {
        display: "flex",
        justifyContent: "flex-end",
        marginTop: MARGIN_TOP,
        marginBottom: 6,
        color: COVID_19_FONT_BODY_DATE_COLOR,
        fontSize: FONT_DATE_SIZE,
        fontWeight: FONT_WEIGHT_NORMAL,
        //backgroundColor: "red",
    }
};