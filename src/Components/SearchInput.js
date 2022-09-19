import { FormControl, TextField } from '@mui/material'
import React, { Component } from 'react'

export default class SearchInput extends Component {
    render() {
        return (
            <FormControl style={{ margin: '10px' }}>
                <TextField onChange={this.props.searchTextChanged} placeholder='Contains' />
            </FormControl>
        )
    }
}
