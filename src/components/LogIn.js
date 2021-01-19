import React, { Component } from 'react'
import {Redirect} from "react-router-dom"

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
                    <form onSubmit={this.handleSubmit}>
                        <div>
                            <label className="form-labels">Username</label>
                            <input
                                type="text"
                                name="userName"
                                onChange={this.handleChange}
                                value={this.state.user.userName}
                                className="form-control mb-2"
                            />
                        </div>
                        <div>
                            <label className="form-labels">Password</label>
                            <input
                                type="password"
                                name="password"
                                className="form-control mb-3"
                            />
                        </div>
                        <button className="btn btn-dark">Log In</button>
                    </form>
                </div>
            </div>
        )
    }
}
