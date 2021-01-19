import React, { Component } from 'react'

export default class AccountBalance extends Component {
    render() {
        return (
            <div id="home-balance">
                Your Balance: ${this.props.accountBalance}
            </div>
        )
    }
}
