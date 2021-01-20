import React, { Component } from 'react'

export default class TransactionCard extends Component {
    render() {
        return (
            <div id="transaction-card">
                <div id="date">{this.props.date}</div>
                <div id="description">{this.props.description}</div>
                <div id="amount">${this.props.amount.toFixed(2)}</div>
            </div>
        )
    }
}
