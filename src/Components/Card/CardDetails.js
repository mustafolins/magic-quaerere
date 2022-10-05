import { Link } from '@mui/material'
import React, { Component } from 'react'

export default class CardDetails extends Component {
    render() {
        return (
            <div style={{ textAlign: 'right' }}>
                <p>CMC: {this.props.cmc}</p>
                {/* Prices */}
                <p>{Object.entries(this.props.prices).filter((kv) => kv[1] !== null).map((kv) => (kv[1] !== null ? `${kv[0]}: ${kv[1]}` : '')).join(', ')}</p>
                {/* Purchase Urls */}
                {this.props.purchase_uris !== undefined ?
                    Object.entries(this.props.purchase_uris)
                        .filter((kv) => kv[1] !== undefined && kv[1] !== null)
                        .map((kv, index) => (
                            <p key={index}>
                                <Link href={kv[1]} color={'secondary'} underline='hover' target='_blank' rel='noreferrer'>{`Purchase on ${kv[0]}`}</Link>
                            </p>
                        ))
                    : ''}
                {/* Legalities */}
                <p>{Object.entries(this.props.legalities).filter((kv) => kv[1] !== 'not_legal').map((kv) => (kv[1] === 'legal' ? `${kv[0]}: ${kv[1]}` : '')).join(', ')}</p>
            </div>
        )
    }
}
