import { Autocomplete, CircularProgress, FormControl, TextField } from '@mui/material'
import React, { Component } from 'react'

export default class AutocompleteWithUrl extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isOpen: false,
            loading: false,
            possibleOptions: []
        }

        this.setOpen = this.setOpen.bind(this)
        this.getAutoCompleteTypes = this.getAutoCompleteTypes.bind(this)
    }
    componentDidMount() {
        fetch(this.props.url,
            {
                method: 'GET'
            })
            .then(response => {
                return response.json()
            })
            .then((data) => {
                this.setState({
                    possibleOptions: data.data,
                    loading: false
                })
            })
    }
    setOpen(open) {
        this.setState({
            isOpen: open
        })
    }
    getAutoCompleteTypes(event, value, reason) {
        this.props.searchTextChanged(value)
    }
    render() {
        return (
            <FormControl style={{ margin: '10px', width: '220px' }}>
                <Autocomplete
                    autoComplete
                    autoSelect
                    freeSolo
                    options={this.state.possibleOptions}
                    loading={this.state.loading}
                    onInputChange={this.getAutoCompleteTypes}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label={this.props.label}
                            InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                    <div>
                                        {this.state.loading ? <CircularProgress color="inherit" size={20} /> : null}
                                        {params.InputProps.endAdornment}
                                    </div>
                                ),
                            }}
                        />
                    )}
                />
            </FormControl>
        )
    }
}
