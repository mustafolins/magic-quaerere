import React, { Component } from 'react'
import { StyledPaper } from '../StyledPaper'
import { Tab, Tabs } from '@mui/material'
import { Box } from '@mui/system'
import Card from './Card'

export default class MultifacedCard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            selectedIndex: 1
        }

        this.handleTabChange = this.handleTabChange.bind(this)
    }
    handleTabChange(event, newValue) {
        this.setState({
            selectedIndex: newValue
        })
    }
    render() {
        return (
            <StyledPaper elevation={10} style={{ margin: '5px' }}>

                <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '350px' }}>
                    <Tabs value={this.state.selectedIndex} onChange={this.handleTabChange} textColor={'secondary'} indicatorColor={'secondary'} variant='scrollable' scrollButtons='auto' allowScrollButtonsMobile>
                        <Tab label={this.props.card_faces[0].name} value={1} />
                        <Tab label={this.props.card_faces[1].name} value={2} />
                    </Tabs>
                </Box>
                {this.props.card_faces.map((multiFaceCard, index) => (
                    this.state.selectedIndex !== index + 1 ? '' :
                        <Card key={this.props.card.id + "-" + index} id={this.props.card.id} name={multiFaceCard.name} oracle_text={multiFaceCard.oracle_text}
                            flavor_text={multiFaceCard.flavor_text} image_uris={multiFaceCard.image_uris === undefined ? this.props.card.image_uris : multiFaceCard.image_uris}
                            cmc={multiFaceCard.cmc} color_identity={multiFaceCard.color_identity} legalities={this.props.card.legalities} prices={this.props.card.prices}
                            purchase_uris={this.props.card.purchase_uris} />
                ))}
            </StyledPaper>
        )
    }
}
