import './App.css';
import React, { Component } from 'react'
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import axios from "axios";
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
      accountBalance: 0,
      debitTotal: 0,
      creditTotal: 0,
      debits: [],
      credits: [],
      currentUser: {
        userName: "janeDoe",
        memberSince: "08/23/99"
      }
    }
  }

  componentDidMount(){
    let debitTotal = 0;
    let creditTotal = 0;

    // Getting debit data from an api

    axios
      .get("https://moj-api.herokuapp.com/debits")
      .then(response=>{
        let debits = response.data;

        debits.forEach(transaction => {
          debitTotal += transaction.amount;
        })

        this.setState({ 
          debits,
          debitTotal
        })
      })
      .catch(error=>{
        console.log(error);
      })
  
    axios
      .get("https://moj-api.herokuapp.com/credits")
      .then(response=>{
        let credits = response.data;

        credits.forEach(transaction => {
          creditTotal += transaction.amount;
        })

        this.setState({ 
          credits, 
          creditTotal
        })
      })
      .catch(error=>{
        console.log(error);
      })
  }

  addDebit = (newDebit) =>{
    let updatedDebits = [newDebit, ...this.state.debits];
    this.setState({
      debits: updatedDebits,
      debitTotal: this.state.debitTotal + Number(newDebit.amount)
    })
  }

  addCredit = (newCredit) =>{
    let updatedCredits = [newCredit, ...this.state.debits];
    this.setState({
      credits: updatedCredits,
      creditTotal: this.state.creditTotal + Number(newCredit.amount)
    })
  }

  mockLogIn = (loginInfo) => {
    const newUser = {...this.state.currentUser};
    newUser.userName = loginInfo.userName;
    this.setState({currentUser: newUser});
  }

  render() {

    let accountBalance = (this.state.creditTotal - this.state.debitTotal).toFixed(2);

    const HomeComponent = () => (
      <Home accountBalance={accountBalance}/>
    );

    const UserProfileComponent = () => (
      <UserProfile 
        userName={this.state.currentUser.userName} 
        memberSince={this.state.currentUser.memberSince}
      />
    )

    const LogInComponent = () => (
      <LogIn 
        user={this.state.currentUser} 
        mockLogIn={this.mockLogIn} 
        {...this.props}
      />
    )

    const DebitComponent = () => (
      <Debits
        accountBalance={accountBalance}
        debits={this.state.debits}
        debitTotal={this.state.debitTotal}
        addDebit={this.addDebit}
      />
    );

    const CreditComponent = () => (
      <Credits
        accountBalance={accountBalance}
        credits={this.state.credits}
        creditTotal={this.state.creditTotal}
        addCredit={this.addCredit}
      />
    );

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