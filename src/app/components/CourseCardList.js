import React, { Component } from "react";
import { 
    MARGIN_BOTTOM,
} from "../assets/styles.js";
import CourseCard from "../components/CourseCard";

class CourseCardList extends Component {
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
                        <CourseCard data={info} />
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

export default CourseCardList;

const s = {
    container: {
        display: "flex",
        flexDirection: "column",
    },
};