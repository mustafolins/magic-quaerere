import React, { Component } from 'react'
import { Divider } from '@mui/material'
import Player from './Player'

const dividerStyle = {
    margin: '15px'
}

export default class Battlefield extends Component {
    constructor(props) {
        super(props)

        this.state = {
            cardData: [],
            opponentData: [],
            nameText: props.searchText,
        }

        this.nameTextChanged = this.nameTextChanged.bind(this);
        this.search = this.search.bind(this);
        this.generateQuery = this.generateQuery.bind(this);
        this.handleNotificationClose = this.handleNotificationClose.bind(this);
        this.getSearchResults = this.getSearchResults.bind(this);
    }
    handleNotificationClose() {
        this.setState({
            showCardNotification: false
        })
    }
    nameTextChanged(value) {
        this.setState({
            nameText: value
        })
    }
    search() {
        this.setState({
            currentPage: 1
        })

        let query = this.generateQuery();
        this.getSearchResults(query, false);
    }
    getSearchResults(query) {
        this.setState({
            isSearching: true,
        })
        fetch(query,
            {
                method: 'GET'
            })
            .then(response => {
                return response.json();
            })
            .then((data) => {
                console.log(data);

                if (data.status !== 404) {
                    this.state.cardData.push(data)
                }
                this.setState({
                    isSearching: false,
                    hasEror: data === undefined,
                    totalCards: (data === undefined) ? 0 : this.state.cardData.length,
                    showCardNotification: (data === undefined) ? false : this.state.cardData.length > 0,
                });
            });
    }

    generateQuery() {
        let query = 'https://api.scryfall.com/cards/named?exact=';
        // paramater for searching cards that contain the given name text in the name
        if (this.state.nameText !== '' && this.state.nameText !== undefined) {
            query += this.state.nameText;
        }
        console.log(query);
        return query;
    }
    render() {
        return (
            <div>
                <Player />

                <Divider style={dividerStyle} />
                
                <Player />
            </div>
        )
    }
}
