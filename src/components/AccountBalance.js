import React, { Component } from 'react'

export default class AccountBalance extends Component {
    render() {
        return (
            <div>
                Account Balance: ${this.props.accountBalance}
            </div>
        )
    }
}
