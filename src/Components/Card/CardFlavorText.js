import React, { Component } from 'react'

export default class CardFlavorText extends Component {
    render() {
        return (
            <p style={{ textAlign: 'left' }}>{this.props.flavor_text}</p>
        )
    }
}
