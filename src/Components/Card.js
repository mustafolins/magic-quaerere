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
            <table style={divStyle}>
                <thead>
                    <tr>
                        <th>{this.props.name}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <p>CMC: {this.props.cmc}</p>
                            <p>USD: {this.state.priceToUse}</p>
                            <p>Commander: {this.props.legalities.commander} Modern: {this.props.legalities.modern} Standard: {this.props.legalities.standard}</p>
                        </td>
                    </tr>
                    <tr>
                        <td style={{ textAlign: 'left' }}>
                            <p>Oracle Text:</p>
                            <p>{this.props.oracle_text}</p>
                            <p>Flavor:</p>
                            <p>{this.props.flavor_text}</p>
                        </td>
                    </tr>
                    <tr>
                        <td style={{ width: '350px' }}>
                            <img src={this.state.imgToUse} alt='' style={imgStyle} />
                        </td>
                    </tr>
                </tbody>
            </table>
        )
    }
}
