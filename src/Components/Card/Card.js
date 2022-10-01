import { Tab, Tabs } from '@mui/material'
import { Box } from '@mui/system'
import React, { Component } from 'react'
import { StyledPaper } from '../StyledPaper'
import CardDetails from './CardDetails'
import CardFlavorText from './CardFlavorText'
import CardOracleText from './CardOracleText'
import CardRules from './CardRules'

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
                        <Tabs value={this.state.selectedIndex} onChange={this.handleTabChange} variant='scrollable' scrollButtons='auto' allowScrollButtonsMobile>
                            <Tab label='Details' value={1} />
                            <Tab label='Oracle Text' value={2} />
                            <Tab label='Flavor Text' value={3} disabled={this.props.flavor_text === undefined} />
                            <Tab label='Rulings' value={4} disabled={this.state.rulings === undefined || this.state.rulings.length === 0} />
                        </Tabs>
                    </Box>
                    {/* Details about card (i.e. cmc, amount, legalities) */}
                    {this.state.selectedIndex !== 1 ? '' :
                        <CardDetails cmc={this.props.cmc} prices={this.props.prices} purchase_uris={this.props.purchase_uris} legalities={this.props.legalities} />
                    }
                    {/* Oracle text */}
                    {this.state.selectedIndex !== 2 ? '' :
                        <CardOracleText oracle_text={this.props.oracle_text} />
                    }
                    {/* Flavor text */}
                    {this.state.selectedIndex !== 3 || this.props.flavor_text === undefined ? '' :
                        <CardFlavorText flavor_text={this.props.flavor_text} />
                    }
                    {/* Rulings */}
                    {this.state.selectedIndex === 4 && this.state.rulings !== undefined && this.state.rulings.length > 0 ?
                        <CardRules rulings={this.state.rulings} />
                        : ''}
                </Box>
            </div>
        )
    }
}
