import React, { Component } from 'react'
import Card from './Card';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

const divStyle = {
    padding: '2px'
}

const colors = [
    {
        color: 'green',
        code: 'g'
    },
    {
        color: 'white',
        code: 'w'
    },
    {
        color: 'red',
        code: 'r'
    },
    {
        color: 'blue',
        code: 'u'
    },
    {
        color: 'black',
        code: 'b'
    }
]

export default class CardSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cardData: null,
            color: props.color,
            power: props.power,
            toughness: props.toughness
        }
        this.search = this.search.bind(this);
        this.colorChanged = this.colorChanged.bind(this);
        this.powerChanged = this.powerChanged.bind(this);
        this.toughChanged = this.toughChanged.bind(this);
    }
    colorChanged(event) {
        this.setState({
            cardData: this.state.cardData,
            color: event.target.value,
            power: this.state.power,
            toughness: this.state.toughness
        })
    }
    powerChanged(event) {
        this.setState({
            cardData: this.state.cardData,
            color: this.state.color,
            power: event.target.value,
            toughness: this.state.toughness
        })
    }
    toughChanged(event) {
        this.setState({
            cardData: this.state.cardData,
            color: this.state.color,
            power: this.state.power,
            toughness: event.target.value
        })
    }
    search() {
        let query = 'https://api.scryfall.com/cards/search?q='
        let hasOthers = false
        if (this.state.color.length > 0) {
            console.log(colors.filter((color) => !this.state.color.includes(color.code)))
            query += encodeURIComponent('c:' + this.state.color.join(''))
                + '+' + encodeURIComponent('-c:' + colors.filter((color) => !this.state.color.includes(color.code)).map((color) => color.code).join(''))
            hasOthers = true
        }
        if (this.state.power !== '') {
            query += (hasOthers ? '+' : '') + 'pow' + encodeURIComponent(this.state.power) // might want to use drop-down box for equality comparison
            hasOthers = true
        }
        if (this.state.toughness !== '' && this.state.toughness != null) {
            query += (hasOthers ? '+' : '') + 'tou' + encodeURIComponent(this.state.toughness) // might want to use drop-down box for equality comparison
            hasOthers = true
        }
        console.log(query)
        fetch(query,
            {
                method: 'GET'
            })
            .then(response => {
                return response.json();
            })
            .then((data) => {
                console.log(data)

                this.setState({
                    cardData: data.data,
                    color: this.state.color,
                    power: this.state.power,
                    toughness: this.state.toughness
                })
            })
    }
    render() {
        return (
            <div>
                <FormControl sx={{ m: 1, width: 300 }}>
                    <InputLabel id="color-multiple-chip-label">Color</InputLabel>
                    <Select
                        labelId="color-multiple-chip-label"
                        id="color-multiple-chip"
                        multiple
                        value={(this.state.color != null) ? this.state.color : []}
                        onChange={this.colorChanged}
                        input={<OutlinedInput id="color-select-multiple-chip" label="Chip" />}
                        renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.map((value) => (
                                    <Chip
                                        key={colors.find((color) => color.code === value).color}
                                        label={colors.find((color) => color.code === value).color}
                                        style={
                                            {
                                                color: (value === 'w') ? 'black' : 'white',
                                                backgroundColor: colors.find((color) => color.code === value).color
                                            }
                                        } />
                                ))}
                            </Box>
                        )}
                    >
                        {colors.map((color) => (
                            <MenuItem
                                key={color.color}
                                value={color.code}
                            >
                                {color.color}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <input type="text" placeholder='Power' value={(this.state.power != null) ? this.state.power : ''} onChange={this.powerChanged}></input>
                <input type="text" placeholder='Toughness' value={(this.state.toughness != null) ? this.state.toughness : ''} onChange={this.toughChanged}></input>

                <button onClick={this.search}>Search!</button>

                <ul>
                    {(this.state.cardData == null) ? '' : this.state.cardData.map((card) => (
                        <div key={card.id} style={divStyle}>
                            <Card name={card.name} oracle_text={card.oracle_text} flavor_text={card.flavor_text} image_uris={card.image_uris}
                                cmc={card.cmc} color_identity={card.color_identity} legalities={card.legalities} prices={card.prices} />
                        </div>
                    ))}
                </ul>
            </div>
        )
    }
}
