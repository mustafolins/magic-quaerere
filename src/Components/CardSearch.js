import { Alert, Button, CircularProgress, Divider, Grid, Pagination, Snackbar } from '@mui/material';
import React, { Component } from 'react'
import AutocompleteName from './AutocompleteName';
import AutocompleteWithUrl from './AutocompleteWithUrl';
import Card from './Card';
import ColorSelector, { colors } from './ColorSelector';
import FormatSelector from './FormatSelector';
import IntegerComparisonSelector from './IntegerComparisonSelector';
import SearchInput from './SearchInput';
import { StyledPaper } from './StyledPaper';

const dividerStyle = {
    margin: '15px'
}

export default class CardSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSearching: false,
            hasEror: false,
            totalCards: 0,
            showCardNotification: false,
            nextPage: '',
            currentPage: 0,
            cardData: null,
            color: props.color,
            power: props.power,
            toughness: props.toughness,
            searchText: props.searchText,
            nameText: props.searchText,
            creatureText: props.creatureText,
            keywordText: props.keywordText,
            format: props.format
        }
        this.search = this.search.bind(this);
        this.containsTextChanged = this.containsTextChanged.bind(this);
        this.nameTextChanged = this.nameTextChanged.bind(this);
        this.creatureTextChanged = this.creatureTextChanged.bind(this);
        this.colorChanged = this.colorChanged.bind(this);
        this.powerChanged = this.powerChanged.bind(this);
        this.toughChanged = this.toughChanged.bind(this);
        this.formatChanged = this.formatChanged.bind(this);
        this.generateQuery = this.generateQuery.bind(this);
        this.handleNotificationClose = this.handleNotificationClose.bind(this);
        this.loadNextPage = this.loadNextPage.bind(this);
        this.getSearchResults = this.getSearchResults.bind(this);
        this.keywordTextChanged = this.keywordTextChanged.bind(this);
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
    nameTextChanged(value) {
        this.setState({
            nameText: value
        })
    }
    containsTextChanged(event) {
        this.setState({
            searchText: event.target.value
        })
    }
    creatureTextChanged(value){
        this.setState({
            creatureText: value
        })
    }
    keywordTextChanged(value){
        this.setState({
            keywordText: value
        })
    }
    formatChanged(format) {
        this.setState({
            format: format
        })
    }
    handleNotificationClose() {
        this.setState({
            showCardNotification: false
        })
    }
    loadNextPage(event, page) {
        this.setState({
            currentPage: page
        })

        let pageQuery = this.state.nextPage
        this.getSearchResults(pageQuery.replace(/(page=)\d*/, `page=${page}`), true)
    }
    search() {
        this.setState({
            currentPage: 1
        })

        let query = this.generateQuery();
        this.getSearchResults(query, false);
    }
    getSearchResults(query, isFromPagination) {
        this.setState({
            isSearching: true,
            totalCards: !isFromPagination ? 0 : this.state.totalCards
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

                this.setState({
                    cardData: data.data,
                    isSearching: false,
                    hasEror: data.data === undefined,
                    totalCards: (data.data === undefined) ? 0 : data.total_cards,
                    showCardNotification: (data.data === undefined) ? false : data.total_cards > 0 && !isFromPagination,
                    nextPage: (data.data === undefined) ? '' : ((isFromPagination) ? this.state.nextPage : data.next_page)
                });
            });
    }

    generateQuery() {
        let query = 'https://api.scryfall.com/cards/search?q=';
        let hasOthers = false;
        // paramater for searching cards that contain the given name text in the name
        if (this.state.nameText !== '' && this.state.nameText !== undefined) {
            query += this.state.nameText;
            hasOthers = true;
        }
        // paramater for searching contents of the oracle text of a card
        if (this.state.searchText !== '' && this.state.searchText !== undefined) {
            query += (hasOthers ? '+' : '') + encodeURIComponent('o:') + '"' + this.state.searchText + '"';
            hasOthers = true;
        }
        // parameter for specifying legality/format (i.e. commander, modern, etc.)
        if (this.state.format !== '' && this.state.format !== undefined) {
            query += (hasOthers ? '+' : '') + encodeURIComponent('f:') + this.state.format;
            hasOthers = true;
        }
        // adds parameter for the gien colors and excluding unspecified colors from search
        if (this.state.color.length > 0) {
            console.log(colors.filter((color) => !this.state.color.includes(color.code)));
            query += (hasOthers ? '+' : '') + encodeURIComponent('c:' + this.state.color.join(''))
                + '+' + encodeURIComponent('-c:' + colors.filter((color) => !this.state.color.includes(color.code)).map((color) => color.code).join(''));
            hasOthers = true;
        }
        // adds power parameter
        if (this.state.power !== '' && this.state.power !== undefined) {
            query += (hasOthers ? '+' : '') + 'pow' + encodeURIComponent(this.state.power);
            hasOthers = true;
        }
        // adds toughness parameter
        if (this.state.toughness !== '' && this.state.toughness !== undefined) {
            query += (hasOthers ? '+' : '') + 'tou' + encodeURIComponent(this.state.toughness);
            hasOthers = true;
        }
        // adds creature type parameter
        if (this.state.creatureText !== '' && this.state.creatureText !== undefined) {
            query += (hasOthers ? '+' : '') + encodeURIComponent('t:' + this.state.creatureText);
            hasOthers = true;
        }
        // adds keyword ability parameter
        if (this.state.keywordText !== '' && this.state.keywordText !== undefined) {
            query += (hasOthers ? '+' : '') + encodeURIComponent('keyword:' + this.state.keywordText);
            hasOthers = true;
        }
        console.log(query);
        return query;
    }

    render() {
        return (
            <div>
                <h1>Magic Quaerere</h1>

                <Divider style={dividerStyle} />

                <AutocompleteName searchTextChanged={this.nameTextChanged} label='Name' />
                <SearchInput searchTextChanged={this.containsTextChanged} label='Contains' />
                <AutocompleteWithUrl searchTextChanged={this.creatureTextChanged} label='Creature Types' url='https://api.scryfall.com/catalog/creature-types' />
                <AutocompleteWithUrl searchTextChanged={this.keywordTextChanged} label='Keyword Abilities' url='https://api.scryfall.com/catalog/keyword-abilities' />

                <FormatSelector label='Format' handleChanged={this.formatChanged} format='' />

                <ColorSelector colorChanged={this.colorChanged} color={this.state.color} />

                <IntegerComparisonSelector label='Power' handleChanged={this.powerChanged} equality='>' num='3' />
                <IntegerComparisonSelector label='Toughness' handleChanged={this.toughChanged} equality='' num='' />

                <Button variant='contained' onClick={this.search} style={{ margin: '30px' }}>Search!</Button>

                <Divider style={dividerStyle} />

                {this.state.totalCards > 0 ? <Pagination count={Math.ceil(this.state.totalCards / 175)} onChange={this.loadNextPage} page={this.state.currentPage} /> : ''}

                {/* Show progress wheel if retrieving results */}
                {(this.state.isSearching) ? <CircularProgress /> : ''}

                {/* Display error if no cards could be found. */}
                {(this.state.hasEror) ? <Alert severity='error'>No cards found with the current search criteria!</Alert> : ''}

                {/* Display notification for number of cards found. */}
                <Snackbar open={this.state.showCardNotification} autoHideDuration={10000} onClose={this.handleNotificationClose}>
                    <Alert severity='success'>Found {this.state.totalCards} cards.</Alert>
                </Snackbar>

                {/* Display cards in a grid */}
                <Grid container style={{ justifyContent: 'center' }}>
                    {(this.state.cardData == null) ? '' : this.state.cardData.map((card) => (
                        <StyledPaper key={card.id} elevation={10} style={{ margin: '5px' }}>
                            <Card id={card.id} name={card.name} oracle_text={card.oracle_text} flavor_text={card.flavor_text} image_uris={card.image_uris}
                                cmc={card.cmc} color_identity={card.color_identity} legalities={card.legalities} prices={card.prices} />
                        </StyledPaper>
                    ))}
                </Grid>

                {this.state.totalCards > 0 ? <Pagination count={Math.ceil(this.state.totalCards / 175)} onChange={this.loadNextPage} page={this.state.currentPage} /> : ''}
            </div>
        )
    }
}
