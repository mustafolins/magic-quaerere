import { Tab, Tabs } from '@mui/material'
import { Box } from '@mui/system'
import React, { Component } from 'react'
import { StyledPaper } from './StyledPaper'

const imgStyle = {
    border: '1px solid #ddd',
    borderRadius: '4px',
    padding: '5px',
    width: '95%'
}

export default class Card extends Component {
    constructor(props) {
        super(props)

        this.state = {
            imgToUse: (props.image_uris !== undefined && props.image_uris.normal !== undefined) ? props.image_uris.normal : '',
            priceToUse: (this.props.prices != null)
                ? ((this.props.prices.usd_foil != null)
                    ? this.props.prices.usd_foil : ((this.props.prices.usd != null)
                        ? this.props.prices.usd : 'No listed price.'
                    )
                ) : 'No listed price.',
            rulings: [],
            selectedIndex: 1
        }

        this.handleTabChange = this.handleTabChange.bind(this)
    }
    componentDidMount() {
        fetch(`https://api.scryfall.com/cards/${this.props.id}/rulings`,
            {
                method: 'GET'
            })
            .then(response => {
                return response.json();
            })
            .then(data => {
                this.setState({
                    rulings: data.data
                })
            })
    }
    handleTabChange(event, newValue) {
        this.setState({
            selectedIndex: newValue
        })
    }
    render() {
        return (
            <div style={{ width: '350px' }}>
                <h2>{this.props.name}</h2>
                {/* Card Image */}
                <StyledPaper elevation={16} style={{ marginBottom: '10px' }}>
                    <img src={this.state.imgToUse} alt='' style={imgStyle} />
                </StyledPaper>
                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={this.state.selectedIndex} onChange={this.handleTabChange} variant='scrollable' scrollButtons='auto'>
                            <Tab label='Details' value={1} />
                            <Tab label='Oracle Text' value={2} />
                            <Tab label='Flavor Text' value={3} disabled={this.props.flavor_text === undefined} />
                            <Tab label='Rulings' value={4} disabled={this.state.rulings === undefined || this.state.rulings.length === 0} />
                        </Tabs>
                    </Box>
                    {/* Details about card (i.e. cmc, amount, legalities) */}
                    {this.state.selectedIndex !== 1 ? '' :
                        <div style={{ textAlign: 'right' }}>
                            <p>CMC: {this.props.cmc}</p>
                            <p>USD: {this.state.priceToUse}</p>
                            <p>Commander: {this.props.legalities.commander} Modern: {this.props.legalities.modern} Standard: {this.props.legalities.standard}</p>
                        </div>
                    }
                    {/* Oracle text */}
                    {this.state.selectedIndex !== 2 ? '' :
                        <p style={{ textAlign: 'left' }}>{this.props.oracle_text}</p>
                    }
                    {/* Flavor text */}
                    {this.state.selectedIndex !== 3 || this.props.flavor_text === undefined ? '' :
                        <p style={{ textAlign: 'left' }}>{this.props.flavor_text}</p>
                    }
                    {/* Rulings */}
                    {this.state.selectedIndex === 4 && this.state.rulings !== undefined && this.state.rulings.length > 0 ? this.state.rulings.map((rule, index) => (
                        <p key={`${rule.id}-${index}`} style={{ textAlign: 'left' }}>{rule.comment}</p>
                    )) : ''}
                </Box>
            </div>
        )
    }
}
