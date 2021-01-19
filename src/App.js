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
      accountBalance: 0,
      debitAmount: 0,
      creditAmount: 0,
      debits: [],
      credits: [],
      currentUser: {
        userName: "bob_loblaw",
        memberSince: "08/23/99"
      }
    }
  }

  componentDidMount(){

    // Getting debits data from an api
    const getDebits = async () => {
      try{
        let response = await fetch ("https://moj-api.herokuapp.com/debits");

        if(!response.ok){
          throw new Error("Something went wrong");
        }

        let data = await response.json();
        
        this.setState({
          debits: data
        })
      }

      catch (error){
        console.log("error", error);
      }
    }

    // Getting credits data from an api
    const getCredits = async () => {
      try{
        let response = await fetch ("https://moj-api.herokuapp.com/credits");

        if(!response.ok){
          throw new Error("Something went wrong");
        }

        let data = await response.json();
        
        this.setState({
          credits: data
        })
      }

      catch (error){
        console.log("error", error);
      }
    }

    getDebits();
    getCredits();
  }

  componentDidUpdate(prevProps, prevState) {
    // If debit list changes, update totals accordingly
    if (prevState.debits !== this.state.debits) {
      let debitTotal = 0;
      for (let transaction of this.state.debits) {
        debitTotal += transaction.amount;
      }

      this.setState({
        debitAmount: debitTotal.toFixed(2)
      });
    }

    // If credit list changes, update totals accordingly
    if (prevState.credits !== this.state.credits) {
      let creditTotal = 0;
      for (let transaction of this.state.credits) {
        creditTotal += transaction.amount;
      }

      this.setState({
        creditAmount: creditTotal.toFixed(2)
      });
    }
  }

  mockLogIn = (loginInfo) => {
    const newUser = {...this.state.currentUser}
    newUser.userName = loginInfo.userName
    this.setState({currentUser: newUser})
  }

  addDebit = (debit) => {
    debit.date = new Date().toISOString();
    const newDebits = [debit, ...this.state.debits];
    this.setState({ debits: newDebits });
  };

  addCredit = (credit) => {
    credit.date = new Date().toISOString();
    const newCredits = [credit, ...this.state.credits];
    this.setState({ credits: newCredits });
  };

  render() {
    const HomeComponent = () => (
      <Home accountBalance={this.state.accountBalance}/>
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
        accountBalance={this.state.accountBalance}
        debits={this.state.debits}
        debitAmount={this.state.debitAmount}
        addDebit={this.addDebit}
      />
    );

    const CreditComponent = () => (
      <Credits
        accountBalance={this.state.accountBalance}
        credits={this.state.credits}
        creditAmount={this.state.creditAmount}
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