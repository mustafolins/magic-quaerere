import React, { Component } from 'react'

const imgStyle = {
    border: '1px solid #ddd',
    borderRadius: '4px',
    padding: '5px',
    width: '95%'
}

const divStyle = {
    border: '1px dashed #fff'
}

export default class Card extends Component {
    constructor(props) {
        super(props)

        this.state = {
            imgToUse: (props.image_uris !== undefined && props.image_uris.normal !== undefined) ? props.image_uris.normal : ''
        }
    }
    render() {
        return (
            <table style={divStyle}>
                <tr>
                    <td>
                        <p>{this.props.name}</p>
                    </td>
                    <td>
                        <p>CMC: {this.props.cmc}</p>
                    </td>
                    <td style={{textAlign: 'left', width: '10%'}}>
                        <p>USD foil: {(this.props.prices != null && this.props.prices.usd_foil != null) ? this.props.prices.usd_foil : ''}</p>
                    </td>
                </tr>
                <tr>
                    <td style={{width: '33%'}}>
                        <img src={this.state.imgToUse} alt='' style={imgStyle} />
                    </td>
                    <td style={{textAlign: 'left'}}>
                        <p>Oracle Text:</p>
                        <p>{this.props.oracle_text}</p>
                        <p>Flavor:</p>
                        <p>{this.props.flavor_text}</p>
                    </td>
                </tr>
            </table>
        )
    }
}
