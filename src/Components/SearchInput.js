import { FormControl, TextField } from '@mui/material'
import React, { Component } from 'react'

export default class SearchInput extends Component {
    render() {
        return (
            <FormControl style={{ margin: '10px' }}>
                <TextField value={this.props.value} onChange={this.props.searchTextChanged} label={this.props.label} />
            </FormControl>
        )
    }
}
