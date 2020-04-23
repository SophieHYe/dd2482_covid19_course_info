import React, { Component } from 'react';
import {
    BACKGROUND_COLOR,
    FONT_BODY_COLOR_UNSELECTED,
    MARGIN_LEFT,
    MARGIN_RIGHT,
    MARGIN_TOP,
    MARGIN_BOTTOM,
    NAV_BAR_HEIGHT,
    ICON_BACKGROUND_SIZE,
    ICON_BACKGROUND_COLOR,
} from "../../../assets/styles";
import {COVID19_GLOBALL_STATS_ENDPOINT, COVID19_COUNTRIES_STATS_ENDPOINT} from "../../../assets/constants";
import Loading from "../../../components/Loading";
import Convid19InfoCardGlobal from "../../../components/Convid19InfoCardGlobal";
import Convid19InfoCardList from "../../../components/Convid19InfoCardList";
import { isEmptyEvaluator  } from "../../../logic/Utilities";
import {getCookie, setCookie} from "../../../logic/Cookie";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading1: true,
            loading2: true,
            data: null,
            covid19MainInfo: null,
            covid19CountryList: null,
        };
    }

    componentDidMount() {
        this.getCovid19MainInfo();
        this.getCovid19CountryList();
    }

    getCovid19MainInfo() {
        fetch(COVID19_GLOBALL_STATS_ENDPOINT).then(response => {
            response.json().then(data => {
                this.setState({ covid19MainInfo: data, loading1: false });
            });
        });
    }

    getCovid19CountryList = async () => {
        let cookie = getCookie("countryList");
        let cookieList = [];
        if(isEmptyEvaluator(cookie)) {
            setCookie("countryList", "Sweden", 365)
            cookieList.push("Sweden");
        }
        else {
            let cookieSplit = cookie.split(",")
            cookieList = cookieSplit;
        }
        let covid19CountryInfoList = [];
        for (let i = 0; i < cookieList.length; i++) {
            covid19CountryInfoList.push(await this.getCovid19Country(cookieList[i]));
        }
        this.setState({ covid19CountryList: covid19CountryInfoList, loading2: false });
    }

    getCovid19Country = async (country) => {
        if (isEmptyEvaluator(country)) {
            this.setState({ data: null, loading: false });
            return;
        }
        try {
            let response = await fetch(COVID19_COUNTRIES_STATS_ENDPOINT + country);
            let responseJson = await response.json();
            return responseJson;
        }
        catch (error) {
            this.setState({ errorMessage: "Server not respodning, error code: 6tgh876ytghji8erf" });
        }
    }

    changeScreen(path) {
        this.props.history.push(path);
    }

    renderConvid19Header(covid19MainInfo, covid19CountryList) {
        return (
            <div style={s.headerContainer}>
                <Convid19InfoCardGlobal data={covid19MainInfo} />
                <div style={{ marginBottom: MARGIN_BOTTOM }} />
                <Convid19InfoCardList dataList={covid19CountryList} />
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
        let loading1 = this.state.loading1;
        let loading2 = this.state.loading2;
        if (loading1 || loading2) {
            return this.renderLoading();
        }
        let covid19MainInfo = this.state.covid19MainInfo;
        let covid19CountryList = this.state.covid19CountryList;
        return (
            <div style={s.container}>
                {this.renderConvid19Header(covid19MainInfo, covid19CountryList)}
            </div>
        );
    }
}

export default Home;

const s = {
    container: {
        display: "flex",
        flex: 1,
        flexDirection: "column",
        marginLeft: MARGIN_LEFT,
        marginRight: MARGIN_RIGHT,
        backgroundColor: BACKGROUND_COLOR,
    },
    loadingContainer: {
        display: "flex",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: BACKGROUND_COLOR,
    },
    headerContainer: {
        marginTop: MARGIN_TOP
    },
};