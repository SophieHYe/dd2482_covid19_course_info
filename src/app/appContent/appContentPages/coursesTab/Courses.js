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
import firebase from "firebase";
import Loading from "../../../components/Loading";
import { extractData } from "../../../logic/Utilities";
import CourseCardList from "../../../components/CourseCardList";
import SearchBar from "../../../components/SearchBar";
import { extractSearchResults } from "../../../logic/Search"; 

class Courses extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            data: null,
            searchValue: "",
        };
    }

    componentDidMount() {
        this.dataBaseListner();
    }

    dataBaseListner() {
        let ref = firebase.database().ref("kth/courses");
        ref.orderByValue().on("value", data => {
            this.setState({ data: data, loading: false });
        });
    }

    renderLoading() {
        return (
            <div style={s.loadingContainer}>
                <Loading />
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
                        onChange={(event) => this.setState({searchValue: event.target.value})}
                        value={this.state.searchValue}
                    />
                </div>
            </div>
        );
    }

    renderDataList(dataArray){
        let searchValue = this.state.searchValue;
        if (searchValue === ""){
            return (
                <CourseCardList dataList={dataArray} />
            );
        }
        else {
            let searchedDataArray = extractSearchResults(dataArray, searchValue);
            return(
                <CourseCardList dataList={searchedDataArray} />
            );
        }
    }

    render() {
        let loading = this.state.loading;
        if (loading) {
            return this.renderLoading();
        }
        let data = this.state.data;
        let dataArray = extractData(data);
        return (
            <div style={s.container}>
                <div style={s.dataContainer}>
                    <div style={{ marginTop: MARGIN_TOP+SEARCH_BAR_HEIGHT+MARGIN_BOTTOM }} />
                    {this.renderDataList(dataArray)}
                </div>
                {this.renderSearchBar()}
            </div>
        );
    }
}

export default Courses;

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
    mainGameContainer: {
        display: "flex",
        flex: 1,
        flexDirection: "column",
    },
    gameContainer: {
        display: "flex",
        flexDirection: "column",
        backgroundColor: BACKGROUND_COLOR,
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