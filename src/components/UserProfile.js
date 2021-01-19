import React, { Component } from 'react'
import Button from "react-bootstrap/Button"

export default class UserProfile extends Component {
    render() {
        return (
            <div id="profile-page">
                <div id="profile-text">
                    <h1 id="profile-title">User Profile</h1>
                    <div id="user-info">
                        <div>Username: {this.props.userName}</div>
                        <div>Member Since: {this.props.memberSince}</div>
                    </div>
                    <Button href="/debit" id="debit-btn" variant="outline-secondary">See Debits ►</Button>
                    <Button href="/credit" id="credit-btn" variant="outline-secondary">See Credits ►</Button>
                </div>
                <img 
                    id="profile-img"
                    src="https://images.pexels.com/photos/4386433/pexels-photo-4386433.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" 
                    alt="wallet with money"
                />
            </div>
        )
    }
}
