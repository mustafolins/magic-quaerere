import React, { Component } from 'react'
import Card from './Card';

const liStyle = {
    padding: '2px'
}

export default class CardSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cardData: null,
            color: props.color,
            power: props.power,
            toughness: null
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
    toughChanged(event){
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
        if (this.state.color !== '') {
            query += encodeURIComponent('c:' + this.state.color)
            hasOthers = true
        }
        if (this.state.power !== '') {
            query += (hasOthers ? '+' : '') + 'pow' + encodeURIComponent(this.state.power) // might want to use drop-down box for equality comparison
            hasOthers = true
        }
        if (this.state.toughness !== '') {
            query += (hasOthers ? '+' : '') + 'tou' + encodeURIComponent(this.state.toughness) // might want to use drop-down box for equality comparison
            hasOthers = true
        }
        console.log(query)
        fetch(query)
            .then(response => {
                return response.json();
            })
            .then((data) => {
                console.log(data)

                this.setState({
                    cardData: data.data,
                    color: this.state.color,
                    power: this.state.power
                })
            })
    }
    render() {
        return (
            <div>
                <input type="text" placeholder='Color' value={(this.state.color != null) ? this.state.color : ''} onChange={this.colorChanged}></input>
                <input type="text" placeholder='Power' value={(this.state.power != null) ? this.state.power : ''} onChange={this.powerChanged}></input>
                <input type="text" placeholder='Toughness' value={(this.state.toughness != null) ? this.state.toughness : ''} onChange={this.toughChanged}></input>

                <button onClick={this.search}>Search!</button>

                <ul>
                    {(this.state.cardData == null) ? '' : this.state.cardData.map((card) => (
                        <li key={card.id} style={liStyle}>
                            <Card name={card.name} oracle_text={card.oracle_text} flavor_text={card.flavor_text} image_uris={card.image_uris}
                            cmc={card.cmc} color_identity={card.color_identity} legalities={card.legalities} prices={card.prices} />
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}
