import React, { Component } from 'react'
import { Alert, Button, CircularProgress, Grid, Snackbar } from '@mui/material'
import { StyledPaper } from '../StyledPaper'
import Card from '../Card/Card'
import AutocompleteName from '../AutoComplete/AutocompleteName'

export default class Player extends Component {
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

                {/* Show progress wheel if retrieving results */}
                {(this.state.isSearching) ? <CircularProgress /> : ''}

                {/* Display error if no cards could be found. */}
                {(this.state.hasEror) ? <Alert severity='error'>Card couldn't be added!</Alert> : ''}

                {/* Display notification for number of cards found. */}
                <Snackbar open={this.state.showCardNotification} autoHideDuration={10000} onClose={this.handleNotificationClose}>
                    <Alert severity='success'>Added {this.state.totalCards} card.</Alert>
                </Snackbar>

                <AutocompleteName searchTextChanged={this.nameTextChanged} label='Name' />
                <Button variant='contained' onClick={this.search} style={{ marginTop: '15px', width: '100%' }}>Search!</Button>

                {/* Display cards in a grid */}
                <Grid container style={{ justifyContent: 'center' }}>
                    {(this.state.cardData == null) ? '' : this.state.cardData.map((card) => (
                        <StyledPaper key={card.id} elevation={10} style={{ margin: '5px' }}>
                            <Card id={card.id} name={card.name} oracle_text={card.oracle_text} flavor_text={card.flavor_text} image_uris={card.image_uris}
                                cmc={card.cmc} color_identity={card.color_identity} legalities={card.legalities} prices={card.prices} purchase_uris={card.purchase_uris} />
                        </StyledPaper>
                    ))}
                </Grid>
            </div>
        )
    }
}
