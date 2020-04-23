import React, { Component } from 'react';
import {
    BACKGROUND_COLOR,
    MARGIN_TOP,
    MARGIN_LEFT,
    MARGIN_RIGHT,
    MARGIN_BOTTOM,
    NAV_BAR_BACKGROUND_COLOR,
    BORDER_RADIUS,
    COVID_19_BORDER_COLOR,
    MARGIN,
    FONT_WEIGHT_NORMAL,
    FONT_BODY_COLOR,
    FONT_BODY_SIZE,
} from "../../../assets/styles";
import firebase from "firebase";
import Loading from "../../../components/Loading";
import TextField from "../../../components/TextField";
import TextArea from "../../../components/TextArea";
import Error from "../../../components/Error";
import Button from "../../../components/Button";
import { isEmptyEvaluator, alertData } from "../../../logic/Utilities";
import { ONLY_CAPITAL_CHARS } from "../../../assets/constants";

class SubmitCoursesInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            courseCode: "",
            courseName: "",
            courseExamination: "",
            courseInfo: "",
            errorMessage: "",
            linkBtnObj: { status: false, label: "no errors", link: "" },
            langData: null,
            loading: true,
        };
    }

    componentDidMount() {
        this.getContentText();
    }

    getContentText() {
        let url = "https://dd2482-covid19-course-info.firebaseio.com/language/en/submitTab/SubmitCoursesInfo.json";
        fetch(url).then(response => {
            response.json().then(data => {
                this.setState({ langData: data, loading: false });
            });
        });
    }

    submit = async () => {
        let courseCode = this.state.courseCode;
        let courseName = this.state.courseName;
        let courseExamination = this.state.courseExamination;
        let courseInfo = this.state.courseInfo;
        if (this.checkCourseCode(courseCode)) {
            return;
        }
        let response = await this.checkIfCourseExits(courseCode);
        if (response.status) {
            this.setState({ errorMessage: response.message, linkBtnObj: {status: true, label: courseCode, link: response.link} });
            return;
        }
        if (isEmptyEvaluator(courseName)) {
            this.setState({ errorMessage: "You need to enter a course name" });
            return;
        }
        if (this.checkCourseExamination(courseExamination)) {
            return;
        }
        let date = Date.parse(new Date);
        let ref = firebase.database().ref("kth/courses/");
        ref.push({
            courseCode: courseCode,
            courseName: courseName,
            courseExamination: courseExamination,
            courseInfo: courseInfo,
            courseUpdated: date,
        });
        this.setState({
            courseCode: "",
            courseName: "",
            courseExamination: "",
            courseInfo: "",
            errorMessage: "",
        });
    }

    checkIfCourseExits = async (courseCode) => {
        let responseJson = await this.getAllOtherCourses();
        let keys = Object.keys(responseJson);
        let len = keys.length;
        let obj = { status: false, message: "no errors", link: "" }
        for (let i = 0; i < len; i++) {
            if (courseCode === responseJson[keys[i]].courseCode) {
                obj.status = true;
                obj.message = "Course code: " + courseCode + " allready exits. Checkout the link below";
                obj.link = "/courses/" + keys[i];
            }
        }
        return obj;
    }

    getAllOtherCourses = async () => {
        let url = "https://dd2482-covid19-course-info.firebaseio.com/kth/courses.json";
        try {
            let response = await fetch(url);
            let responseJson = await response.json();
            return responseJson;
        }
        catch (error) {
            this.setState({ errorMessage: "Server not respodning, error code: 6tgh876ytghji8erf" });
        }
    }

    checkCourseCode(courseCode) {
        if (isEmptyEvaluator(courseCode)) {
            this.setState({ errorMessage: "You need to enter a course code" });
            return true;
        }
        if (courseCode.length < 6) {
            this.setState({ errorMessage: "Course code need to be at least 6 characters" });
            return true;
        }
        let charPart = courseCode.substring(0, 2)
        if (!charPart.match(ONLY_CAPITAL_CHARS)) {
            this.setState({ errorMessage: "Course code need to start with two capital characters" });
            return true;
        }
        return false;
    }

    checkCourseExamination(courseExamination) {
        if (isEmptyEvaluator(courseExamination)) {
            this.setState({ errorMessage: "You need to enter a course examination info" });
            return true;
        }
        if (courseExamination.length > 60) {
            this.setState({ errorMessage: "Course examination info can max be 60 characters long" });
            return true;
        }
        return false;
    }

    renderLoading() {
        return (
            <div style={s.loadingContainer}>
                <Loading />
            </div>
        );
    }

    renderInfoText(text) {
        return (
            <div>
                {text}
            </div>
        );
    }

    renderInputField(label, type, bindning) {
        return (
            <TextField
                style={s.inputText}
                label={label}
                type={type}
                onChange={(event) => this.setState({ [bindning]: event.target.value })}
                value={this.state[bindning]}
            />
        );
    }

    renderTextArea(placeholder, bindning) {
        return (
            <TextArea
                style={s.textArea}
                rowsMin={4}
                owsMax={16}
                placeholder={placeholder}
                onChange={(event) => this.setState({ [bindning]: event.target.value })}
                value={this.state[bindning]}
            />
        );
    }

    renderRedirectButton() {
        let linkBtnObj = this.state.linkBtnObj;
        if (linkBtnObj.status) {
            return (
                <div style={s.redirectButtonContainer}>
                    <Button label={linkBtnObj.label} fontWeight={FONT_WEIGHT_NORMAL} onClick={() => this.props.history.push(linkBtnObj.link)} />
                </div>
            );
        }
        else {
            return;
        }

    }

    render() {
        let loading = this.state.loading;
        if (loading) {
            return this.renderLoading();
        }
        let langData = this.state.langData;
        return (
            <div style={s.container}>
                <div style={s.inputContainer}>
                    {this.renderInfoText(langData.explanationText)}
                    {this.renderInputField("Course Code", "text", "courseCode")}
                    {this.renderInputField("Course Name", "text", "courseName")}
                    {this.renderInputField("Course Examination", "text", "courseExamination")}
                    {this.renderTextArea("Course Information", "courseInfo")}
                    <div style={s.controlContainer}>
                        <Error errorText={this.state.errorMessage} />
                        <Button label={"Submit information"} fontWeight={FONT_WEIGHT_NORMAL} onClick={() => this.submit()} />
                    </div>
                    {this.renderRedirectButton()}
                </div>
            </div>
        );
    }
}

export default SubmitCoursesInfo;

const s = {
    container: {
        display: "flex",
        flex: 1,
        flexDirection: "column",
        backgroundColor: BACKGROUND_COLOR,
    },
    loadingContainer: {
        display: "flex",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: BACKGROUND_COLOR,
    },
    inputContainer: {
        display: "flex",
        flexDirection: "column",
        padding: MARGIN,
        marginTop: MARGIN_TOP,
        marginLeft: MARGIN_LEFT,
        marginRight: MARGIN_RIGHT,
        marginBottom: MARGIN_BOTTOM,
        borderRadius: BORDER_RADIUS,
        backgroundColor: NAV_BAR_BACKGROUND_COLOR,
        border: "" + 1 + "px solid " + COVID_19_BORDER_COLOR,
    },
    inputText: {
        marginTop: MARGIN_TOP,
    },
    textArea: {
        marginTop: MARGIN_TOP,
        borderRadius: 8,
        border: "" + 1 + "px solid " + COVID_19_BORDER_COLOR,
        backgroundColor: BACKGROUND_COLOR,
        color: FONT_BODY_COLOR,
        fontSize: FONT_BODY_SIZE,
        fontWeight: FONT_WEIGHT_NORMAL,
        fontFamily: "arial",
    },
    headerContainer: {
        marginTop: MARGIN_TOP
    },
    redirectButtonContainer: {
        marginTop: MARGIN_TOP,
    }
};