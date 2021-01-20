import React, { Component } from 'react'
import AccountBalance from "./AccountBalance"
import Button from "react-bootstrap/Button"
import TransactionCard from "./TransactionCard"

export default class Credits extends Component {
    constructor(props){
        super(props);
        this.state={
            credit: {
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

        updatedCredit.date = new Date().toLocaleDateString("en-US");

        this.setState({ credit: updatedCredit });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.addCredit(this.state.credit);
    };

    render() {
        return (
            <div id="credit-background">
                <div id="credit-page">
                    <h1 id="credits-title">Credits</h1>
                    <div id="credits-account-balance">
                        <AccountBalance accountBalance={this.props.accountBalance}/>
                        Credit Total: ${this.props.creditTotal}
                    </div>

                    <div id="add-credit">
                        <h3>Add a transaction</h3>
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
                            <Button id="add-btn" type="submit" variant="outline-secondary">Add</Button>
                        </form>
                    </div>

                    <div id="debit-history">
                        <h3>Credit History</h3>
                        <div id="history-table-header">
                            <div id="date">Date</div>
                            <div id="description">Description</div>
                            <div id="amount">Amount</div>
                        </div>
                        {this.props.credits.map((transaction)=>{
                            let date = new Date(transaction.date)
                            return(
                                <TransactionCard
                                    description = {transaction.description}
                                    amount={transaction.amount}
                                    date={date.toLocaleDateString("en-US")}
                                />
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
}
