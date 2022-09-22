import { ExpandMore } from '@mui/icons-material'
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material'
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
                ) : 'No listed price.'
        }
    }
    render() {
        return (
            <div style={{ width: '350px'}}>
                <h2>{this.props.name}</h2>
                {/* Details about card (i.e. cmc, amount, legalities) */}
                <Accordion expanded>
                    <AccordionSummary>
                        <h3>Details:</h3>
                    </AccordionSummary>
                    <AccordionDetails style={{textAlign: 'right'}}>
                        <p>CMC: {this.props.cmc}</p>
                        <p>USD: {this.state.priceToUse}</p>
                        <p>Commander: {this.props.legalities.commander} Modern: {this.props.legalities.modern} Standard: {this.props.legalities.standard}</p>
                    </AccordionDetails>
                </Accordion>
                {/* Oracle text */}
                <Accordion style={{textAlign: 'left'}}>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                        <h3>Oracle Text:</h3>
                    </AccordionSummary>
                    <AccordionDetails>
                        <p>{this.props.oracle_text}</p>
                    </AccordionDetails>
                </Accordion>
                {/* Flavor text */}
                <Accordion disabled={this.props.flavor_text === undefined} style={{textAlign: 'left'}}>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                        <h3>Flavor:</h3>
                    </AccordionSummary>
                    <AccordionDetails>
                        <p>{this.props.flavor_text}</p>
                    </AccordionDetails>
                </Accordion>
                {/* Card Image */}
                <StyledPaper elevation={16} style={{marginTop: '10px'}}>
                    <img src={this.state.imgToUse} alt='' style={imgStyle} />
                </StyledPaper>
            </div>
        )
    }
}
