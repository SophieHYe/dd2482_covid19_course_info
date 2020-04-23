import React, { Component } from 'react';
import { BrowserRouter, Router, Route, Link, Switch } from "react-router-dom";
import { CONFIG_FIREBASE } from "./assets/constants";
import firebase from "firebase";

import AppContentHolder from "./appContent/AppContentRoutes";

class LoadingScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: false,
            loading: true,
            page: "home",
        };
        this.initFirebase();
    }

    initFirebase() {
        if (!firebase.apps.length) {
            firebase.initializeApp(CONFIG_FIREBASE);
        }
    }

    render() {
        if (this.state.page === "loading") {
            return (<div />);
        }
        else if (this.state.page === "home") {
            return (<AppContentHolder />);
        }
    }
}

export default LoadingScreen;