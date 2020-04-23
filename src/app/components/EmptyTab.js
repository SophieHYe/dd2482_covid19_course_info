import React from 'react';
import Icon from "./Icon";
import {
    ICON_BODY_COLOR,
    FONT_HEADER_SIZE,
    FONT_HEADER_COLOR,
    FONT_WEIGHT_NORMAL,
    BACKGROUND_COLOR,
} from "../assets/styles";

export function renderEmpty() {
    let label = "404 missing page";
    return (
        <div style={s.container}>
            <Icon icon={"block"} size={60} color={ICON_BODY_COLOR} />
            <div style={s.text}>
                {label}
            </div>
        </div>
    );
}

const s = {
    container: {
        display: "flex",
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: BACKGROUND_COLOR,
    },
    text: {
        color: FONT_HEADER_COLOR,
        fontSize: FONT_HEADER_SIZE,
        fontWeight: FONT_WEIGHT_NORMAL,
    },
};