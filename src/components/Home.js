import React, { Component } from 'react'
import AccountBalance from './AccountBalance'
import {Link} from "react-router-dom"

export default class Home extends Component {
    render() {
        return (
            <div>
                <img src="https://letstalkpayments.com/wp-content/uploads/2016/04/Bank.png" alt="bank"/>
                <h1>Bank of React</h1>
                <div id="links">
                    <Link to="/userProfile">User Profile</Link>
                    <Link to="/login">Login</Link>
                    <Link to="/debit">Debit</Link>
                    <Link to="/credit">Credit</Link>
                    <AccountBalance accountBalance={this.props.accountBalance}/>
                </div>
            </div>
        )
    }
}
