import React, { Component } from "react";
import { 
    SWITCH_COLOR,
} from "../assets/styles.js";
import MdSwitch from "@material-ui/core/Switch";
import { withStyles } from "@material-ui/core/styles";
const CustomColorSwitch = withStyles({
    switchBase: {
      //color: SWITCH_COLOR,
      '&$checked': {
        color: SWITCH_COLOR,
      },
      '&$checked + $track': {
        backgroundColor: SWITCH_COLOR,
      },
    },
    checked: {},
    track: {},
})(MdSwitch);

class Switch extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        let onChangeFunc = this.props.onChange;
        let checked = this.props.checked;
        return (
            <CustomColorSwitch 
                onChange={() => onChangeFunc()} 
                checked={checked}
            />
        );
    }
}

export default Switch;