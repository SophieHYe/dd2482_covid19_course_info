import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import {
	BACKGROUND_COLOR,
	NAV_BAR_HEIGHT,
} from "../assets/styles"
import NavBar from "../components/NavBar";

import Home from "./appContentPages/homeTab/Home";

import Courses from "./appContentPages/coursesTab/Courses";
import CourseSession from "./appContentPages/coursesTab/CourseSession";

import SubmitCoursesInfo from "./appContentPages/submitTab/SubmitCoursesInfo";

import More from "./appContentPages/moreTab/More";
import AddCountrys from "./appContentPages/moreTab/AddCountrys";
import AboutApp from "./appContentPages/moreTab/AboutApp";

import MissingPage from "../MissingPage";

class AppContentRogutes extends Component {
	constructor(props) {
        super(props);
        this.state = {
			tab: 0,
        };
	}

	renderNavbar(){
        return(
            <div style={s.navbarContainer}>
                <NavBar />
            </div>
        );
    }

	render() {
		return (
			<div style={s.appContainer}>
				<BrowserRouter>
					<div style={s.container}>						
						<Switch>
							<Route path="/" exact component={Home} />
							<Route path="/courses" exact component={Courses} />
							<Route path="/courses/coursesession" component={CourseSession} />
							<Route path="/submitcoursesinfo" component={SubmitCoursesInfo} />
							<Route path="/more" exact component={More} />
							<Route path="/more/addcountrys" exact component={AddCountrys} />
							<Route path="/more/aboutapp" exact component={AboutApp} />
							<Route component={MissingPage}/>
						</Switch>
					</div>
					<div style={{marginTop: NAV_BAR_HEIGHT}}/>
					{this.renderNavbar()}
				</BrowserRouter>
			</div>
		);
	}
}

export default AppContentRogutes;

const s = {
	appContainer: {
	},
    container: {
		display: "flex",
		flex: 1,
		//flexDirection: "column",
		minHeight: "calc(100vh - " + NAV_BAR_HEIGHT + "px)",
		backgroundColor: BACKGROUND_COLOR,
	},
	navbarContainer: {
        position: "fixed", bottom: 0, right: 0, left: 0,
    },
};