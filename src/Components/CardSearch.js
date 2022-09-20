import { Button, Divider } from '@mui/material';
import React, { Component } from 'react'
import Card from './Card';
import ColorSelector, { colors } from './ColorSelector';
import IntegerComparisonSelector from './IntegerComparisonSelector';
import SearchInput from './SearchInput';

const divStyle = {
    padding: '2px'
}

const dividerStyle = {
    margin: '15px'
}

export default class CardSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cardData: null,
            color: props.color,
            power: props.power,
            toughness: props.toughness,
            searchText: props.searchText,
            nameText: props.searchText
        }
        this.search = this.search.bind(this);
        this.containsTextChanged = this.containsTextChanged.bind(this);
        this.nameTextChanged = this.nameTextChanged.bind(this);
        this.colorChanged = this.colorChanged.bind(this);
        this.powerChanged = this.powerChanged.bind(this);
        this.toughChanged = this.toughChanged.bind(this);
    }
    colorChanged(event) {
        this.setState({
            color: event.target.value
        })
    }
    powerChanged(event) {
        this.setState({
            power: event
        })
    }
    toughChanged(event) {
        this.setState({
            toughness: event
        })
    }
    nameTextChanged(event) {
        this.setState({
            nameText: event.target.value
        })
    }
    containsTextChanged(event) {
        this.setState({
            searchText: event.target.value
        })
    }
    search() {
        let query = 'https://api.scryfall.com/cards/search?q='
        let hasOthers = false
        if (this.state.nameText !== '' && this.state.nameText !== undefined) {
            query += this.state.nameText
            hasOthers = true
        }
        if (this.state.searchText !== '' && this.state.searchText !== undefined) {
            query += (hasOthers ? '+' : '') + encodeURIComponent('o:') + '"' + this.state.searchText + '"'
            hasOthers = true
        }
        if (this.state.color.length > 0) {
            console.log(colors.filter((color) => !this.state.color.includes(color.code)))
            query += (hasOthers ? '+' : '') + encodeURIComponent('c:' + this.state.color.join(''))
                + '+' + encodeURIComponent('-c:' + colors.filter((color) => !this.state.color.includes(color.code)).map((color) => color.code).join(''))
            hasOthers = true
        }
        if (this.state.power !== '') {
            query += (hasOthers ? '+' : '') + 'pow' + encodeURIComponent(this.state.power)
            hasOthers = true
        }
        if (this.state.toughness !== '' && this.state.toughness != null) {
            query += (hasOthers ? '+' : '') + 'tou' + encodeURIComponent(this.state.toughness)
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
                <Divider style={dividerStyle} />
                
                <SearchInput searchTextChanged={this.nameTextChanged} placeHolder='Name' />
                <SearchInput searchTextChanged={this.containsTextChanged} placeHolder='Contains' />
                <ColorSelector colorChanged={this.colorChanged} color={this.state.color} />
                <IntegerComparisonSelector label='Power' handleChanged={this.powerChanged} equality='>' num='3' />
                <IntegerComparisonSelector label='Toughness' handleChanged={this.toughChanged} equality='' num='' />
                <Button variant='contained' onClick={this.search} style={{margin: '30px'}}>Search!</Button>

                <Divider style={dividerStyle} />

                {(this.state.cardData == null) ? '' : this.state.cardData.map((card) => (
                    <div key={card.id} style={divStyle}>
                        <Card name={card.name} oracle_text={card.oracle_text} flavor_text={card.flavor_text} image_uris={card.image_uris}
                            cmc={card.cmc} color_identity={card.color_identity} legalities={card.legalities} prices={card.prices} />
                    </div>
                ))}
            </div>
        )
    }
}
