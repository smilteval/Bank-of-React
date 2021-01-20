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
    const getDebits = async () => {

      let response = await fetch ("https://moj-api.herokuapp.com/debits");
      let debits = await response.json();
      
      debits.forEach(transaction => {
        debitTotal += transaction.amount;
      })

      this.setState({ debits, debitTotal })
    }
  
    // Getting credits data from an api
    const getCredits = async () => {

      let response = await fetch ("https://moj-api.herokuapp.com/credits");
      let credits = await response.json();
      
      credits.forEach(transaction => {
        creditTotal += transaction.amount;
      })

      this.setState({ credits, creditTotal })
    }

    getDebits();
    getCredits();
  }

  componentDidUpdate(prevProps, prevState) {
    // If debit list changes, update debit total accordingly
    if (prevState.debits !== this.state.debits) {

      let debitTotal = 0;
      
      this.state.debits.forEach(transaction => {
        debitTotal += transaction.amount;
      })

      debitTotal = debitTotal.toFixed(2);

      this.setState({debitTotal});
    }

    // If credit list changes, update credit total accordingly
    if (prevState.credits !== this.state.credits) {

      let creditTotal = 0;

      this.state.credits.forEach(transaction => {
        creditTotal += transaction.amount;
      })

      creditTotal = creditTotal.toFixed(2);

      this.setState({creditTotal});
    }

    // If debit or credit lists change, update account balance accordingly
    if (prevState.debitTotal !== this.state.debitTotal 
      || prevState.creditTotal !== this.state.creditTotal) {

      let accountBalance = (this.state.creditTotal - this.state.debitTotal).toFixed(2);

      this.setState({accountBalance});
    }
  }

  mockLogIn = (loginInfo) => {
    const newUser = {...this.state.currentUser};
    newUser.userName = loginInfo.userName;
    this.setState({currentUser: newUser});
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
        debitTotal={this.state.debitTotal}
        addDebit={this.addDebit}
      />
    );

    const CreditComponent = () => (
      <Credits
        accountBalance={this.state.accountBalance}
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