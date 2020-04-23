import React, { Component } from 'react';
import {
    BACKGROUND_COLOR,
    FONT_BODY_COLOR_UNSELECTED,
    MARGIN_LEFT,
    MARGIN_RIGHT,
    MARGIN_TOP,
    MARGIN_BOTTOM,
    BORDER_COLOR_1,
    FONT_BODY_COLOR,
    FONT_WEIGHT_NORMAL,
} from "../../../assets/styles";
import firebase from "firebase";
import Loading from "../../../components/Loading";
import MenyButton from "../../../components/MenyButton";
import Button from "../../../components/Button";

class More extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            data: null,
        };
    }

    componentDidMount() {
        //this.dataBaseListner();
    }

    changeScreen(choice) {
        if (choice === "signOut") {
            firebase.auth().signOut();
            this.props.history.push("/");
        }
        else {
            this.props.history.push(choice);
        }
    }

    renderLoading() {
        return (
            <div style={s.loadingContainer}>
                <Loading />
            </div>
        );
    }

    renderProfile(extractedData) {
        let profilePicUrl = extractedData.photoURL;
        let fullName = extractedData.name + " " + extractedData.lastName;
        let userId = "User-ID: " + extractedData.publicKey;
        return (
            <div style={s.profileContainer}>
                <img style={s.profilePic} src={profilePicUrl} />
                <div style={s.profileName}>
                    {fullName}
                </div>
                <div style={s.profileUserId}>
                    {userId}
                </div>
            </div>
        );
    }

    render() {
        return (
            <div style={s.container}>
                <MenyButton icon={"language"} btnText={"Add countries"} onClick={() => this.changeScreen("/more/addcountrys")} />
                <MenyButton icon={"info"} btnText={"About the App"} onClick={() => this.changeScreen("/more/aboutapp")} lastBorder={true} />
                <div style={{ marginBottom: MARGIN_BOTTOM }} />
            </div>
        );
    }
}

export default More;

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
    profileContainer: {
        marginTop: MARGIN_TOP,
        marginLeft: MARGIN_LEFT,
    },
    profilePic: {
        height: 100,
        width: 100,
        borderRadius: 50,
        objectFit: "cover",
    },
    profileName: {
        color: FONT_BODY_COLOR,
        fontSize: 24,
        fontWight: FONT_WEIGHT_NORMAL,
    },
    profileUserId: {
        marginBottom: MARGIN_BOTTOM,
        color: FONT_BODY_COLOR,
        fontSize: 14,
        fontWight: FONT_WEIGHT_NORMAL,
    },
    profileBorder: {
        borderTop: "" + 1 + "px solid " + BORDER_COLOR_1,
    },
};