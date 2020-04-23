import React, { Component } from 'react';
import {
    BACKGROUND_COLOR,
    FONT_BODY_COLOR_UNSELECTED,
    MARGIN_LEFT,
    MARGIN_RIGHT,
    MARGIN_TOP,
    MARGIN_BOTTOM,
    SEARCH_BAR_HEIGHT,
    ICON_BACKGROUND_SIZE,
    ICON_BACKGROUND_COLOR,
} from "../../../assets/styles";
import {COVID19_COUNTRIES_STATS_ENDPOINT} from "../../../assets/constants";
import Loading from "../../../components/Loading";
import { isEmptyEvaluator, alertData } from "../../../logic/Utilities";
import Convid19InfoCard from "../../../components/Convid19InfoCard";
import SearchBar from "../../../components/SearchBar";
import Switch from "../../../components/Switch";
import { setCookie, getCookie } from "../../../logic/Cookie";

class AddCountrys extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            data: null,
            searchValue: "",
        };
    }

    componentDidMount() {
    }

    getCovid19Country = async (country) => {
        if (isEmptyEvaluator(country)) {
            this.setState({ data: null, loading: false });
            return;
        }
        try {
            let response = await fetch(COVID19_COUNTRIES_STATS_ENDPOINT + country);
            let responseJson = await response.json();
            this.setState({ data: responseJson, loading: false });
        }
        catch (error) {
            this.setState({ errorMessage: "Server not respodning, error code: 6tgh876ytghji8erf" });
        }
    }

    handleSearch = async (searchValue) => {
        this.setState({ searchValue: searchValue, loading: true });
        await this.getCovid19Country(searchValue);
    }

    cookieCountryListHandler(country, checked) {
        if (checked) {
            this.removeFromCountryList(country);
        }
        else {
            this.addToCountryList(country);
        }
        this.setState({ loading: false });
    }

    addToCountryList(country) {
        let countryList = getCookie("countryList");
        if (isEmptyEvaluator(countryList)) {
            setCookie("countryList", country, 365)
        }
        setCookie("countryList", countryList+","+country, 365);
    }

    removeFromCountryList(country) {
        let countryListString = getCookie("countryList");
        let countryListArray = countryListString.split(",")
        for (let i = 0; i < countryListArray.length; i++) {
            if(country === countryListArray[i]) {
                countryListArray.splice(i, 1);
                break;
            }
        }
        setCookie("countryList", countryListArray.toString(), 365)
    }

    checkIfAllreadyInCountryList(country){
        let countryListString = getCookie("countryList");
        let countryListArray = countryListString.split(",")
        for (let i = 0; i < countryListArray.length; i++) {
            if(country === countryListArray[i]) {
                return true;
            }
        }
        return false;
    }

    renderLoading() {
        return (
            <div style={s.loadingContainer}>
                <Loading />
                {this.renderSearchBar()}
            </div>
        );
    }

    renderSearchBar() {
        return (
            <div style={s.posSearchBar}>
                <div style={s.searchBarContainer}>
                    <SearchBar
                        placeholder={"Search"}
                        type={"text"}
                        onChange={(event) => this.handleSearch(event.target.value)}
                        value={this.state.searchValue}
                    />
                </div>
            </div>
        );
    }

    renderSearchResult(data) {
        let text = "Search for a country you like to add to the home screen";
        let compare = "Country not found or doesn't have any cases";
        if (isEmptyEvaluator(data)) {
            return (
                <div>
                    {text}
                </div>
            );
        }
        else if (data.message === compare) {
            return (
                <div>
                    {data.message}
                </div>
            );
        }
        else {
            let checked = this.checkIfAllreadyInCountryList(data.country);
            return (
                <div>
                    <Convid19InfoCard data={data} />
                    <div style={s.labelSwitchContainter}>
                        <div>
                            Add to Home screen
                        </div>
                        <Switch
                            onChange={() => this.cookieCountryListHandler(data.country, checked)}
                            checked={checked}
                        />
                    </div>
                </div>

            );
        }
    }

    render() {
        let loading = this.state.loading;
        if (loading) {
            return this.renderLoading();
        }
        let data = this.state.data;
        return (
            <div style={s.container}>
                <div style={s.dataContainer}>
                    <div style={{ marginTop: MARGIN_TOP + SEARCH_BAR_HEIGHT + MARGIN_BOTTOM }} />
                    {this.renderSearchResult(data)}
                </div>
                {this.renderSearchBar()}
            </div>
        );
    }
}

export default AddCountrys;

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
    dataContainer: {
        marginLeft: MARGIN_LEFT,
        marginRight: MARGIN_RIGHT,
    },
    emptyContainer: {
        display: "flex",
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    emptyText: {
        fontSize: 24,
        color: FONT_BODY_COLOR_UNSELECTED,
    },
    labelSwitchContainter: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    posSearchBar: {
        width: "100%",
        position: "fixed", top: MARGIN_TOP,
    },
    searchBarContainer: {
        marginLeft: MARGIN_LEFT,
        marginRight: MARGIN_RIGHT,
    }
};