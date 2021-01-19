import './App.css';
import React, { Component } from 'react'
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import Home from "./components/Home"
import UserProfile from "./components/UserProfile"
import LogIn from "./components/LogIn"
import Debits from "./components/Debits"
import Credits from "./components/Credits"
import NavigationBar from './components/NavigationBar';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class App extends Component {

  constructor(){
    super();

    this.state = {
      accountBalance: 14568.27,
      currentUser: {
        userName: "bob_loblaw",
        memberSince: "08/23/99"
      }
    }
  }

  mockLogIn = (loginInfo) => {
    const newUser = {...this.state.currentUser}
    newUser.userName = loginInfo.userName
    this.setState({currentUser: newUser})
  }

  render() {

    const HomeComponent = () => (<Home accountBalance={this.state.accountBalance}/>);
    const UserProfileComponent = () => (<UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince}/>)
    const LogInComponent = () => (<LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} {...this.props}/>)
    const DebitComponent = () => (<Debits/>);
    const CreditComponent = () => (<Credits/>);

    return (
      <>
        <NavigationBar/>
        <Router>
        <Switch>
          <Route exact path = "/" render={HomeComponent}/>
          <Route exact path = "/userProfile" render={UserProfileComponent}/>
          <Route exact path = "/login" render={LogInComponent}/>
          <Route exact path = "/debit" render={DebitComponent}/>
          <Route exact path = "/credit" render={CreditComponent}/>
        </Switch>
      </Router>
    </>
    )
  }
}