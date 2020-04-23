import React, { Component } from "react";
import { 
    MARGIN_BOTTOM,
} from "../assets/styles.js";
import Convid19InfoCard from "../components/Convid19InfoCard";

class Convid19InfoCardList extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    renderCourseCardList(dataList){
        return(
            <div>
                {dataList.map((info) => (
                    <div style={s.container} key={info.keyValue}>
                        <Convid19InfoCard data={info} />
                        <div style={{marginBottom: MARGIN_BOTTOM}}/>
                    </div>
                ))}
            </div>
        );
    }

    render() {
        let dataList = this.props.dataList;
        return this.renderCourseCardList(dataList);
    }
}

export default Convid19InfoCardList;

const s = {
    container: {
        display: "flex",
        flexDirection: "column",
    },
};