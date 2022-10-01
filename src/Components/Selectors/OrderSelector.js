import React, { Component } from 'react'
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

export default class OrderSelector extends Component {
    constructor(props) {
        super(props)

        this.state = {
            order: props.order
        }

        this.orderChanged = this.orderChanged.bind(this)
    }
    orderChanged(event) {
        this.setState({
            order: event.target.value
        })
        this.props.handleChanged(event.target.value)
    }
    render() {
        return (
            <FormControl sx={{ width: 100, margin: '10px' }}>
                <InputLabel id={this.props.label + "-simple-select-label"}>{this.props.label}</InputLabel>
                <Select
                    labelId={this.props.label + "-simple-select-label"}
                    id={this.props.label + "-simple-select"}
                    value={this.state.order}
                    label={this.props.label}
                    onChange={this.orderChanged}
                >
                    <MenuItem value='name'>{'Name'}</MenuItem>
                    <MenuItem value={'set'}>{'Set and collector number'}</MenuItem>
                    <MenuItem value={'released'}>{'Release date'}</MenuItem>
                    <MenuItem value={'rarity'}>{'Rarity'}</MenuItem>
                    <MenuItem value={'color'}>{'Color and color identity'}</MenuItem>
                    <MenuItem value={'usd'}>{'U.S. Dollar price'}</MenuItem>
                    <MenuItem value={'tix'}>{'TIX price'}</MenuItem>
                    <MenuItem value={'eur'}>{'Euro price'}</MenuItem>
                    <MenuItem value={'cmc'}>{'Converted mana cost'}</MenuItem>
                    <MenuItem value={'power'}>{'Power'}</MenuItem>
                    <MenuItem value={'toughness'}>{'Toughness'}</MenuItem>
                    <MenuItem value={'edhrec'}>{'EDHREC ranking'}</MenuItem>
                    <MenuItem value={'penny'}>{'Penny Dreadful ranking'}</MenuItem>
                    <MenuItem value={'artist'}>{'Artist name'}</MenuItem>
                    <MenuItem value={'review'}>{'Podcasts reviews'}</MenuItem>
                </Select>
            </FormControl>
        )
    }
}
