import React, { Component } from 'react'
import {Redirect} from "react-router-dom"
import {Link} from "react-router-dom"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export default class LogIn extends Component {

    constructor(){
        super();
        this.state={
            user:{
                userName: "",
                password: ""
            },
            redirect: false
        }
    }

    handleChange = (e) => {
        const updatedUser = {...this.state.user}
        const inputField = e.target.name
        const inputValue = e.target.value
        updatedUser[inputField] = inputValue
    
        this.setState({user: updatedUser})
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.mockLogIn(this.state.user)
        this.setState({redirect: true})
    }

    render() {

        if (this.state.redirect) {
            return (<Redirect to="/userProfile"/>)
        }

        return (
            <div id="login-page">
                <div id="login-form">
                    <h1 id="login-title">Login</h1>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group>
                            <Form.Label className="form-labels">Username</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter username" 
                                onChange={this.handleChange}
                                // value={this.state.user.userName}
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label className="form-labels">Password</Form.Label>
                            <Form.Control 
                                type="password" 
                                placeholder="Password" 
                            />
                        </Form.Group>
                        
                        <Button variant="dark" type="submit">
                            Log In
                        </Button>
                    </Form>
                </div>
            </div>
        )
    }
}
