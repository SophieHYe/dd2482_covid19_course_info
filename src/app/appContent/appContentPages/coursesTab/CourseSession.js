import React, { Component } from 'react';
import {
    BACKGROUND_COLOR,
    FONT_BODY_COLOR_UNSELECTED,
    MARGIN_LEFT,
    MARGIN_RIGHT,
    MARGIN_TOP,
    MARGIN_BOTTOM,
    SEARCH_BAR_HEIGHT,
    FONT_BODY_COLOR,
    FONT_BODY_SIZE,
    FONT_HEADER_COLOR,
    FONT_HEADER_SIZE,
    FONT_WEIGHT_BOLD,
    FONT_DATE_SIZE,
    FONT_WEIGHT_NORMAL,
    HEADER_FILLER_HEIGHT,
    FONT_HEADER_SECONDARY_COLOR,
    COVID_19_FONT_BODY_DATE_COLOR,
    COVID_19_BORDER_COLOR,

} from "../../../assets/styles";
import firebase from "firebase";
import Loading from "../../../components/Loading";
import HeaderFiller from "../../../components/HeaderFiller";
import DotMenuButton from "../../../components/DotMenuButton";
import Button from "../../../components/Button";
import { isEmptyEvaluator, formatDate, extractSingleData } from "../../../logic/Utilities";
import BackButton from "../../../components/BackButton";
import { renderEmpty } from "../../../components/EmptyTab";
import TextField from "../../../components/TextField";
import TextArea from "../../../components/TextArea";

class CourseSession extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            data: null,
            editeMode: false,
            courseCode: "",
            courseName: "",
            courseExamination: "",
            courseInfo: "",
        };
    }

    componentDidMount() {
        let courseId = this.getCourseId();
        this.dataBaseListner(courseId);
    }

    getCourseId() {
        let pathName = this.props.history.location.pathname;
        let pathNameArray = pathName.split("/");
        return pathNameArray[3];
    }

    dataBaseListner(courseId) {
        let ref = firebase.database().ref("kth/courses/" + courseId);
        ref.orderByValue().on("value", data => {
            this.setState({ data: data, loading: false });
        });
    }

    updateCourseInfo() {
        let courseId = this.getCourseId();
        let data = this.state.data;
        let extractedData = extractSingleData(data);
        let courseCode = this.state.courseCode;
        let courseName = this.state.courseName;
        let courseExamination = this.state.courseExamination;
        let courseInfo = this.state.courseInfo;

        if (isEmptyEvaluator(courseCode)) {
            courseCode = extractedData.courseCode;
        }
        if (isEmptyEvaluator(courseName)) {
            courseName = extractedData.courseName;
        }
        if (isEmptyEvaluator(courseExamination)) {
            courseExamination = extractedData.courseExamination;
        }
        if (isEmptyEvaluator(courseInfo)) {
            courseInfo = extractedData.courseInfo;
        }

        let ref = firebase.database().ref("kth/courses/" +  courseId);
        ref.update({
            courseCode: courseCode,
            courseName: courseName,
            courseExamination: courseExamination,
            courseInfo: courseInfo,
            courseUpdated: Date.parse(new Date),
        });
        this.setState({ editeMode: false })
    }

    renderLoading() {
        return (
            <div style={s.loadingContainer}>
                <Loading />
                {this.renderBackButton()}
            </div>
        );
    }

    renderContentEditeMode(data) {
        return (
            <div style={s.container}>
                {this.renderHeaderMenu()}
                {this.renderDate(data.courseUpdated)}
                {this.renderCourseTextFieldEdit("Course Code", "courseCode", data.courseCode , "cc")}
                {this.renderCourseTextFieldEdit("Course Name", "courseName", data.courseName , "cn" )}
                {this.renderCourseTextFieldEdit("Course Examination", "courseExamination", data.courseExamination , "ce")}
                {this.renderCourseTextAreaEdit("Course Info", "courseInfo", data.courseInfo , "ci")}
                <div style={s.posSaveBtn}>
                    <Button label={"Save changes"} onClick={() => this.updateCourseInfo()} />
                </div>
                {this.renderBackButton()}
            </div>
        );
    }

    renderContent(data) {
        return (
            <div style={s.container}>
                {this.renderHeaderMenu()}
                {this.renderDate(data.courseUpdated)}
                {this.renderCourseCode(data.courseCode)}
                {this.renderCourseName(data.courseName)}
                {this.renderCourseInformation("Course Examination:", data.courseExamination)}
                {this.renderCourseInformation("Course Info:", data.courseInfo)}
                {this.renderBackButton()}
            </div>
        );
    }

    renderHeaderMenu() {
        let editeMode = this.state.editeMode;
        return (
            <div style={s.headerContainer}>
                <HeaderFiller />
                <DotMenuButton
                    label={["Edit course"]}
                    onClickArray={
                        [
                            () => this.setState({ editeMode: !editeMode }),
                        ]
                    }
                />
            </div>
        );
    }

    renderCourseTextFieldEdit(label, bindning, startValue, id) {
        return (
            <TextField
                style={s.courseCode}
                id={id}
                startValue={startValue}
                label={label}
                type={"text"}
                onChange={(event) => this.setState({ [bindning]: event.target.value })}
            />
        );
    }

    renderCourseTextAreaEdit(label, bindning, startValue, id) {
        return (
          <TextArea
            style={s.textArea}
            rowsMin={3}
            rowsMax={15}
            id={id}
            startValue={startValue}
            label={label}
            type={"text"}
            onChange={(event) => this.setState({ [bindning]: event.target.value })}
          />
        );
    }

    renderDate(date) {
        let formatedDate = formatDate(date);
        return (
            <div style={s.courseDate}>
                {formatedDate}
            </div>
        );
    }

    renderCourseCode(text) {
        return (
            <div style={s.courseCode}>
                {text}
            </div>
        );
    }

    renderCourseName(text) {
        return (
            <div style={s.courseName}>
                {text}
            </div>
        );
    }

    renderCourseInformation(header, text) {
        return (
            <div style={s.courseInformationContainer}>
                <div style={s.courseInformationHeader}>
                    {header}
                </div>
                <div style={s.courseInformationText}>
                    {text}
                </div>
            </div>
        );
    }

    renderBackButton() {
        return (
            <div style={s.posBackBtn}>
                <BackButton />
            </div>
        );
    }
    render() {
        let loading = this.state.loading;
        if (loading) {
            return this.renderLoading();
        }
        let data = this.state.data;
        if (!data.exists()) {
            return renderEmpty();
        }
        let extractedData = extractSingleData(data);
        if (this.state.editeMode) {
            return this.renderContentEditeMode(extractedData);
        }
        else {
            return this.renderContent(extractedData);
        }
    }
}

export default CourseSession;

const s = {
    container: {
        display: "flex",
        flex: 1,
        flexDirection: "column",
        marginLeft: MARGIN_LEFT,
        marginRight: MARGIN_RIGHT,
        backgroundColor: BACKGROUND_COLOR,
    },
    textArea: {
        marginTop: MARGIN_TOP,
        marginBottom: MARGIN_TOP,
        borderRadius: 8,
        border: "" + 1 + "px solid " + COVID_19_BORDER_COLOR,
        backgroundColor: BACKGROUND_COLOR,
        color: FONT_BODY_COLOR,
        fontSize: FONT_BODY_SIZE,
        fontWeight: FONT_WEIGHT_NORMAL,
        fontFamily: "arial",
        whiteSpace: "pre-wrap",
    },
    loadingContainer: {
        display: "flex",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: BACKGROUND_COLOR,
    },
    headerContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    courseDate: {
        display: "flex",
        //flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-end",
        color: COVID_19_FONT_BODY_DATE_COLOR,
        fontSize: FONT_DATE_SIZE,
        fontWeight: FONT_WEIGHT_NORMAL,
    },
    courseCode: {
        display: "flex",
        flexDirection: "column",
        color: FONT_HEADER_COLOR,
        fontSize: FONT_HEADER_SIZE,
        fontWeight: FONT_WEIGHT_BOLD,
        wordBreak: "break-word",
    },
    courseName: {
        display: "flex",
        flexDirection: "column",
        marginBottom: MARGIN_BOTTOM,
        color: FONT_HEADER_COLOR,
        fontSize: FONT_BODY_SIZE,
        fontWeight: FONT_WEIGHT_BOLD,
        wordBreak: "break-word",
    },
    courseInformationContainer: {
        display: "flex",
        flexDirection: "column",
        marginBottom: MARGIN_BOTTOM,
    },
    courseInformationHeader: {
        display: "flex",
        flexDirection: "column",
        color: FONT_HEADER_SECONDARY_COLOR,
        fontSize: FONT_BODY_SIZE,
        fontWeight: FONT_WEIGHT_BOLD,
        wordBreak: "break-word",
    },
    courseInformationText: {
        display: "flex",
        flexDirection: "column",
        marginBottom: MARGIN_BOTTOM,
        color: FONT_HEADER_COLOR,
        fontSize: FONT_BODY_SIZE,
        fontWeight: FONT_WEIGHT_NORMAL,
        wordBreak: "break-word",
        whiteSpace: "pre-wrap",
    },
    posBackBtn: {
        width: 40,
        position: "fixed", top: MARGIN_TOP, right: 0, left: MARGIN_LEFT,
    },
};