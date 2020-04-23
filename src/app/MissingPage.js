import React, { Component } from 'react';
import {renderEmpty} from "./components/EmptyTab";

export default class MissingPage extends Component {
	render() {
		return (
			<div style={s.container}>
                {renderEmpty()}
            </div>
		);
	}
}

const s = {
    container: {
		display: "flex",
		flex: 1,
		alignItems: "center",
        justifyContent: "center",
	},
};