import React, { Component } from 'react'
import AccountBalance from './AccountBalance'
import {Link} from "react-router-dom"

export default class Home extends Component {
    render() {
        return (
            <div id="homepage">
                <img 
                    id="bank-img" 
                    src="https://images.unsplash.com/photo-1518713408716-82d62758922f?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=687&q=80" 
                    alt="bank"
                />
                <div id="homepage-text">
                    <h1 id="home-title">Bank of React</h1>
                    <AccountBalance accountBalance={this.props.accountBalance}/>
                </div>
            </div>
        )
    }
}
