import React, { Component } from 'react'

export default class CardOracleText extends Component {
    render() {
        return (
            <div style={{ textAlign: 'left' }}>
                {this.props.oracle_text.split('\n').map((text, index) => (
                    <p key={index}>{text}</p>
                ))}
            </div>
        )
    }
}
