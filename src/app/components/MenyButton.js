import React, { Component } from "react";
import { 
    FONT_BODY_COLOR,
    FONT_BODY_SIZE,
    FONT_WEIGHT_NORMAL,
    BORDER_COLOR_2,
    MARGIN_LEFT,
    MARGIN_RIGHT,
    ICON_LARGE_SIZE,
    ICON_LARGE_COLOR,
} from "../assets/styles.js";
import MdButton from "@material-ui/core/Button";
import Icon from "./Icon";

class MenyButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        let icon = this.props.icon;
        let btnText = this.props.btnText;
        let onClickFunc = this.props.onClick;
        let lastBorder = this.props.lastBorder
        let margin = (MARGIN_LEFT * 2) + ICON_LARGE_SIZE;
        if (lastBorder) {
            margin = 0;
        }
        return (
            <div>
                <MdButton style={s.btnContainer} onClick={() => onClickFunc()}>
                    <div style={s.container}>
                        <div style={s.iconLabelContainer}>
                            <div style={s.iconContainer}>
                                <Icon icon={icon} size={ICON_LARGE_SIZE} color={ICON_LARGE_COLOR}/>
                            </div>
                            <div style={s.labelContainer}>
                                {btnText}
                            </div>
                        </div>
                        <div style={s.arrowContainer}>
                        <Icon icon={"navigateNext"} size={ICON_LARGE_SIZE} color={ICON_LARGE_COLOR}/>
                        </div>
                    </div>
                </MdButton>
                <div style={{marginLeft: margin, borderBottom: "" + 1 + "px solid " + BORDER_COLOR_2,}} />
            </div>
        );
    }
}

export default MenyButton;

const s = {
    btnContainer: {
        display: "flex",
        //flex: 1,
        height: 50,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        padding: 0,
        borderRadius: 0,
        overflow: "hidden",
        textTransform: "none",
        //borderBottom: "" + 10 + "px solid " + BORDER_COLOR_2,
    },
    container: {
        display: "flex",
        flex: 1,
        justifyContent: "space-between",
        height: 50,
        width: "100%",
        flexDirection: "row",
    },
    iconLabelContainer: {
        display: "flex",
        justifyContent: "center",
    },
    iconContainer: {
        marginLeft: MARGIN_LEFT,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    labelContainer: {
        marginLeft: MARGIN_LEFT,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: FONT_BODY_COLOR,
        fontSize: FONT_BODY_SIZE,
        fontWeight: FONT_WEIGHT_NORMAL,
    },
    arrowContainer: {
        marginRight: MARGIN_RIGHT,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    icon: {
        color: FONT_BODY_COLOR,
        fontSize: FONT_BODY_SIZE,
    },
};