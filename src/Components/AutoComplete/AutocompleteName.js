import { Autocomplete, CircularProgress, FormControl, TextField } from '@mui/material'
import React, { Component } from 'react'

export default class AutocompleteName extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isOpen: false,
            loading: false,
            possibleOptions: []
        }

        this.setOpen = this.setOpen.bind(this)
        this.getNames = this.getNames.bind(this)
    }
    setOpen(open) {
        this.setState({
            isOpen: open
        })
    }
    getNames(event, value, reason) {
        if (reason === 'input') {
            if (value.length > 2) {
                this.setState({
                    loading: true
                })

                fetch(`https://api.scryfall.com/cards/autocomplete?q=${value}`,
                    {
                        method: 'GET'
                    })
                    .then(response => {
                        return response.json()
                    })
                    .then((data) => {
                        console.log(data);

                        this.setState({
                            possibleOptions: data.data,
                            loading: false
                        })
                    })
            }
            else{
                this.setState({
                    possibleOptions: [],
                    loading: false
                })
            }
        }

        this.props.searchTextChanged(value)
    }
    render() {
        return (
            <FormControl style={{ margin: '10px', width: '220px' }}>
                <Autocomplete
                    value={this.props.value}
                    autoComplete
                    freeSolo
                    options={this.state.possibleOptions}
                    loading={this.state.loading}
                    onInputChange={this.getNames}
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
