import React, { Component } from 'react'
import AccountBalance from "./AccountBalance"
import Button from "react-bootstrap/Button"
import TransactionCard from "./TransactionCard"

export default class Credits extends Component {
    constructor(props){
        super(props);
        this.state={
            credit: {
                id: "",
                description: "",
                amount: "",
                date: ""
            }
        }
    }

    handleChange = (event) => {
        const updatedCredit = { ...this.state.credit};
        const inputField = event.target.name;
        const inputValue = event.target.value;
    
        updatedCredit[inputField] = inputValue;
        if (inputField === "amount") {
            updatedCredit.amount = Number(inputValue);
        }
        this.setState({ credit: updatedCredit });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.addCredit(this.state.credit);
    };

    render() {
        return (
            <div id="credit-page">
                
                <h1 id="credits-title">Credits</h1>
                <div id="credits-account-balance">
                    <AccountBalance accountBalance={this.props.accountBalance}/>
                </div>
                <div>Credit Amount: ${this.props.creditAmount}</div>

                <div id="add-credit">
                    <form onSubmit={this.handleSubmit}>
                        <input
                            name="description"
                            type="text"
                            value={this.state.credit.description}
                            onChange={this.handleChange}
                            placeholder="Enter description"
                            required
                        />
                        <input
                            name="amount"
                            type="number"
                            value={this.state.credit.amount}
                            onChange={this.handleChange}
                            placeholder="Enter amount"
                            required
                        />
                        <Button type="submit">Add</Button>

                    </form>
                </div>

                <div id="debit-history">
                    <h3>Credit History</h3>
                    {this.props.credits.map((transaction)=>{
                        return(
                            <TransactionCard
                                description = {transaction.description}
                                amount={transaction.amount}
                                date={transaction.date}
                            />
                        )
                    })}
                </div>

            </div>
        )
    }
}
