import React, { Component } from 'react';
import {
    BACKGROUND_COLOR,
    FONT_HEADER_COLOR,
    FONT_HEADER_SIZE,
    FONT_WEIGHT_BOLD,
    MARGIN_LEFT,
    MARGIN_RIGHT,
    MARGIN_TOP,
    MARGIN_BOTTOM,
    FONT_BODY_SIZE,
    FONT_BODY_COLOR,
    FONT_WEIGHT_NORMAL,
    FONT_LINK_COLOR,
} from "../../../assets/styles";
import { ASD_CONTACT_INFO_ENDPOINT, ABOUT_THE_APP_TEXT, NOVELCOVID_URL } from "../../../assets/constants";
import Loading from "../../../components/Loading";
import HeaderFiller from "../../../components/HeaderFiller";
import BackButton from "../../../components/BackButton";

class AboutApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            data: null,
        };
    }

    componentDidMount() {
        this.getData();
    }

    getData() {
        fetch(ASD_CONTACT_INFO_ENDPOINT).then(response => {
            response.json().then(data => {
                this.setState({ data: data, loading: false });
            });
        });
    }

    renderHeader(text) {
        return (
            <div style={s.headerText}>
                {text}
            </div>
        );
    }

    renderDescription(text) {
        return (
            <div style={s.text}>
                {text}
            </div>
        );
    }

    renderPersonInfo(name, email, phone) {
        return (
            <div style={s.personInfoContainer}>
                <div style={s.name}>
                    {name}
                </div>
                <div>
                    <a style={s.email} href={"mailto:" + email}>
                        {email}
                    </a>
                </div>
            </div>
        );
    }

    renderNovelCOVIDURL(url){
        return (
          <div style={s.personInfoContainer}>
              <div style={s.text}>
                  If you want to know more about the COVID-19 data or the API that we use to fetch the data, please visit NovelCOVID's
                  <div>
                      <a style={s.phone} href={url}>
                          web site.
                      </a>
                  </div>
              </div>
          </div>
        )
    }

    renderBackButton() {
        return (
            <div style={s.posBackBtn}>
                <BackButton />
            </div>
        );
    }

    renderLoading() {
        return (
            <div style={s.loadingContainer}>
                <Loading />
            </div>
        );
    }

    render() {
        let loading = this.state.loading;
        if (loading) {
            return this.renderLoading();
        }
        let data = this.state.data;
        console.log(data)
        return (
            <div style={s.container}>
                <HeaderFiller />
                <div style={s.contentContainer}>
                    {this.renderHeader("COVID19 KTH Course Info")}
                    {this.renderDescription(ABOUT_THE_APP_TEXT)}
                    {this.renderPersonInfo("Johanna Iivanainen", "johanna.ii@outlook.com")}
                    {this.renderPersonInfo(data.contactInfo.name, data.contactInfo.email)}
                    {this.renderNovelCOVIDURL(NOVELCOVID_URL)}
                </div>
                {this.renderBackButton()}
            </div>
        );
    }
}

export default AboutApp;

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
    contentContainer: {
        display: "flex",
        flexDirection: "column",
        marginTop: MARGIN_TOP,
        marginLeft: MARGIN_LEFT,
        marginRight: MARGIN_RIGHT,
        marginBottom: MARGIN_BOTTOM,
    },
    headerText: {
        marginBottom: MARGIN_BOTTOM,
        color: FONT_HEADER_COLOR,
        fontSize: FONT_HEADER_SIZE,
        fontWeight: FONT_WEIGHT_BOLD,
    },
    text: {
        marginBottom: MARGIN_BOTTOM,
        color: FONT_BODY_COLOR,
        fontSize: FONT_BODY_SIZE,
        fontWeight: FONT_WEIGHT_NORMAL,
    },
    personInfoContainer: {
        marginBottom: MARGIN_BOTTOM,
    },
    name: {
        color: FONT_BODY_COLOR,
        fontSize: FONT_BODY_SIZE,
        fontWeight: FONT_WEIGHT_NORMAL,
        lineHeight: 1.2,
    },
    email: {
        color: FONT_LINK_COLOR,
        fontSize: FONT_BODY_SIZE,
        fontWeight: FONT_WEIGHT_BOLD,
        textDecoration: "none",
        lineHeight: 1.2,
    },
    phone: {
        color: FONT_LINK_COLOR,
        fontSize: FONT_BODY_SIZE,
        fontWeight: FONT_WEIGHT_BOLD,
        textDecoration: "none",
        lineHeight: 1.2,
    },
    logloContainer: {
        marginTop: MARGIN_TOP * 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    logo: {
        width: 260,
        objectFit: "cover",
    },
    posBackBtn: {
        position: "fixed", top: MARGIN_TOP, right: 0, left: MARGIN_LEFT,
    },
};