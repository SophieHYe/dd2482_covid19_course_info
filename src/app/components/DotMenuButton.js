import React, { Component } from "react";
import {
    ICON_BACKGROUND_COLOR,
} from "../assets/styles.js";
import IconButton from "@material-ui/core/ButtonBase";
import Icon from "../components/Icon";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

class DotMenuButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
        }
    }

    onClickAndClose(onClickFunc) {
        onClickFunc();
        this.setState({ anchorEl: null })
    }

    render() {
        let anchorEl = this.state.anchorEl;
        let label = this.props.label;
        let onClickArray = this.props.onClickArray;
        return (
            <div>
                <IconButton style={s.button} onClick={(event) => this.setState({ anchorEl: event.currentTarget })}>
                    <Icon icon={"moreVert"} size={24} color={ICON_BACKGROUND_COLOR} />
                </IconButton>
                <Menu
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={() => this.setState({ anchorEl: null })}
                >
                    <div>
                        {onClickArray.map((info, index) => (
                            <MenuItem key={index} onClick={() => this.onClickAndClose(onClickArray[index])}>
                                {label[index]}
                            </MenuItem>
                        ))}
                    </div>
                </Menu>
            </div>

        );
    }
}

export default DotMenuButton;

const s = {
    button: {
        height: 30,
        width: 30,
        borderRadius: 30,
    },
};