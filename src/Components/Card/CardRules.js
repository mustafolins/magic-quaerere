import React, { Component } from 'react'

export default class CardRules extends Component {
    render() {
        return this.props.rulings.map((rule, index) => (
            <p key={`${rule.id}-${index}`} style={{ textAlign: 'left' }}>{rule.comment}</p>
        ))
    }
}
