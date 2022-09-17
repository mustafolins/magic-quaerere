import React, { Component } from 'react'

export default class Card extends Component {
    constructor(props) {
        super(props)

        this.state = {
            imgToUse: (props.image_uris !== undefined && props.image_uris.normal !== undefined) ? props.image_uris.normal : ''
        }
    }
    render() {
        return (
            <div>
                <p>{this.props.name}</p>
                <p>{this.props.oracle_text}</p>
                <p>{this.props.flavor_text}</p>
                <img src={this.state.imgToUse} alt='' />
            </div>
        )
    }
}
