import React, { Component } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

export default class NavigationBar extends Component {
    render() {
        return (
            <div id="navigation-bar">
                <Navbar fixed="top" bg="dark" variant="dark">
                    <Navbar.Brand href="/">Bank of React</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href="/userProfile">User Profile</Nav.Link>
                        <Nav.Link href="/debit">Debit</Nav.Link>
                        <Nav.Link href="/credit">Credit</Nav.Link>
                    </Nav>
                    <Nav className="ml-auto" id="login-btn">
                        <Nav.Link href="/login">Login</Nav.Link>
                    </Nav>
            </Navbar>
            </div>
        )
    }
}
