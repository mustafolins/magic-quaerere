import React, { Component } from 'react'
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

export default class FormatSelector extends Component {
    constructor(props) {
        super(props)

        this.state = {
            format: props.format
        }

        this.formatChanged = this.formatChanged.bind(this)
    }
    formatChanged(event) {
        this.setState({
            format: event.target.value
        })
        this.props.handleChanged(event.target.value)
    }
    render() {
        return (
            <FormControl sx={{width: 100, margin: '10px' }}>
                <InputLabel id={this.props.label + "-simple-select-label"}>{this.props.label}</InputLabel>
                <Select
                    labelId={this.props.label + "-simple-select-label"}
                    id={this.props.label + "-simple-select"}
                    value={this.state.format}
                    label={this.props.label}
                    onChange={this.formatChanged}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={'commander'}>{'Commander'}</MenuItem>
                    <MenuItem value={'modern'}>{'Modern'}</MenuItem>
                    <MenuItem value={'standard'}>{'Standard'}</MenuItem>
                </Select>
            </FormControl>
        )
    }
}
