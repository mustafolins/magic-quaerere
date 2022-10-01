import React, { Component } from 'react'

export default class CardDetails extends Component {
    render() {
        return (
            <div style={{ textAlign: 'right' }}>
                <p>CMC: {this.props.cmc}</p>
                <p>{Object.entries(this.props.prices).filter((kv) => kv[1] !== null).map((kv) => (kv[1] !== null ? `${kv[0]}: ${kv[1]}` : '')).join(', ')}</p>
                <p>{Object.entries(this.props.legalities).filter((kv) => kv[1] !== 'not_legal').map((kv) => (kv[1] === 'legal' ? `${kv[0]}: ${kv[1]}` : '')).join(', ')}</p>
            </div>
        )
    }
}
