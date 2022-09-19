import React, { Component } from 'react'
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { TextField } from '@mui/material';

export default class IntegerComparisonSelector extends Component {
    constructor(props) {
        super(props)

        this.state = {
            equality: props.equality,
            num: props.num
        }

        this.equalityChanged = this.equalityChanged.bind(this)
        this.numChanged = this.numChanged.bind(this)
    }
    equalityChanged(event) {
        this.setState({
            equality: event.target.value,
            num: this.state.num
        })
        this.props.handleChanged(`${event.target.value}${this.state.num}`)
    }
    numChanged(event) {
        this.setState({
            equality: this.state.equality,
            num: event.target.value
        })
        this.props.handleChanged(`${this.state.equality}${event.target.value}`)
    }
    render() {
        return (
            <FormControl style={{margin: '5px'}}>
                <InputLabel id={this.props.label + "-simple-select-label"}>{this.props.label}</InputLabel>
                <Select
                    labelId={this.props.label + "-simple-select-label"}
                    id={this.props.label + "-simple-select"}
                    value={this.state.equality}
                    label={this.props.label}
                    onChange={this.equalityChanged}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={'<'}>{'<'}</MenuItem>
                    <MenuItem value={'<='}>{'<='}</MenuItem>
                    <MenuItem value={'='}>{'='}</MenuItem>
                    <MenuItem value={'>'}>{'>'}</MenuItem>
                    <MenuItem value={'>='}>{'>='}</MenuItem>
                </Select>
                <TextField inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} onChange={this.numChanged} value={this.state.num} />
            </FormControl>
        )
    }
}
