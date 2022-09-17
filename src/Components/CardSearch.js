import React, { Component } from 'react'
import Card from './Card';

export default class CardSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cardData: null,
            color: props.color,
            power: props.power
        }
        this.search = this.search.bind(this);
        this.colorChanged = this.colorChanged.bind(this);
        this.powerChanged = this.powerChanged.bind(this);
    }
    colorChanged(event) {
        this.setState({
            cardData: this.state.cardData,
            color: event.target.value,
            power: this.state.power
        })
    }
    powerChanged(event) {
        this.setState({
            cardData: this.state.cardData,
            color: this.state.color,
            power: event.target.value
        })
    }
    search() {
        fetch('https://api.scryfall.com/cards/search?q=c%3A' + this.state.color + '+pow' + encodeURIComponent(this.state.power))
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

                <button onClick={this.search}>Search!</button>

                <ul>
                    {(this.state.cardData == null) ? '' : this.state.cardData.map((card) => (
                        <li key={card.id}>
                            <Card name={card.name} oracle_text={card.oracle_text} flavor_text={card.flavor_text} image_uris={card.image_uris} />
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}
