import React, { Component } from 'react';
import {
    MARGIN_TOP,
    MARGIN_BOTTOM,
    UNDERLINE_COLOR,
    TEXT_SIZE_2,
    TEXT_COLOR_1,
    ICON_LARGE_SIZE,
    BUTTON_BACKGROUND_COLOR,
} from "../assets/styles"
import { changeQuantityEngine } from "./Functions";
import { Add, Remove } from "@material-ui/icons";
import ButtonBase from "@material-ui/core/ButtonBase";
import {isEmptyEvaluator} from "../components/Functions";


class QuantityPicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quantity: "1",
        };
    }

    componentDidMount() {
        let startQuantity= this.props.startQuantity;
        if (!isEmptyEvaluator(startQuantity)) {
            let input = document.getElementById("id1"); 
            input.value = startQuantity;
        }
    }

    changeQuantity(choice, currentQuantity) {
        let minQuantity = this.props.minQuantity;
        if (typeof minQuantity === "undefined") {
            minQuantity = -9007199254740991;
        }
        let maxQuantity = this.props.maxQuantity;
        if (typeof maxQuantity === "undefined") {
            maxQuantity = 9007199254740991;
        }
        let newQuantity = changeQuantityEngine(choice, currentQuantity, minQuantity, maxQuantity);
        this.sendQuantity(newQuantity);
    }

    sendQuantity(newQuantity) {
        this.props.onChange(newQuantity);
    }

    render() {
        let value = this.props.value
        let width = 50;
        if(!isEmptyEvaluator(value)) {
            if(value.length > 4){
                width += (value.length-4)*11;
            }
        }
        let input = {
            textAlign: "center", 
            height: 50,
            width: width,
            borderRadius: 40,
            borderWidth: 1,
            outline: "none",
            overflow: "hidden",
            borderStyle: "solid",
            borderColor: UNDERLINE_COLOR,
            fontSize: TEXT_SIZE_2,
            color: TEXT_COLOR_1,
            backgroundColor: "transparent",
            //backgroundColor: "red",
        }
        return (
            <div style={s.container}>
                <ButtonBase style={s.button} onClick={() => this.changeQuantity("-", value)}>
                    <Remove style={{ fontSize: ICON_LARGE_SIZE, color: TEXT_COLOR_1 }} />
                </ButtonBase>
                <input
                    id={"id1"}
                    style={input}
                    inputProps={{ style: {textAlign: "center"} }}
                    type={"number"}
                    placeholder={"#"}
                    onChange={(event) => this.changeQuantity("set", event.target.value)} 
                    value={value}
                />
                <ButtonBase style={s.button} onClick={() => this.changeQuantity("+", value)}>
                    <Add style={{ fontSize: ICON_LARGE_SIZE, color: TEXT_COLOR_1 }} />
                </ButtonBase>
            </div>
        );
    };
}

export default QuantityPicker;

const s = {
    container: {
        display: "flex",
        marginTop: MARGIN_TOP,
        marginBottom: MARGIN_BOTTOM,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
    },
    button: {
        display: "flex",
        height: 50,
        width: 50,
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: BUTTON_BACKGROUND_COLOR,
    },
    input: {
        textAlign: "center", 
        height: 50,
        width: 50,
        borderRadius: 50,
        borderWidth: 1,
        outline: "none",
        overflow: "hidden",
        borderStyle: "solid",
        borderColor: UNDERLINE_COLOR,
        fontSize: TEXT_SIZE_2,
        color: TEXT_COLOR_1,
        //backgroundColor: "transparent",
        //backgroundColor: "red",
    },
};