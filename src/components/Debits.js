import React, { Component } from 'react'
import AccountBalance from './AccountBalance';
import TransactionCard from './TransactionCard';
import Button from "react-bootstrap/Button"

export default class Debits extends Component {

    constructor(props){
        super(props);
        this.state={
            debit: {
                description: "",
                amount: "",
                date: ""
            }
        }
    }

    handleChange = (event) => {
        const updatedDebit = { ...this.state.debit };
        const inputField = event.target.name;
        const inputValue = event.target.value;
    
        updatedDebit[inputField] = inputValue;
        if (inputField === "amount") {
            updatedDebit.amount = Number(inputValue);
        }

        updatedDebit.date = new Date().toLocaleDateString("en-US");

        this.setState({ debit: updatedDebit });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.addDebit(this.state.debit);
    };

    render() {
        return (
            <div id="debit-background">
                <div id="debit-page">
                    <h1 id="debits-title">Debits</h1>
                    <div id="debits-account-balance">
                        <AccountBalance accountBalance={this.props.accountBalance}/>
                        Debit total: ${this.props.debitTotal}
                    </div>

                    <div id="add-debit">
                        <h3>Add a transaction</h3>
                        <form onSubmit={this.handleSubmit}>
                            <input
                                name="description"
                                type="text"
                                value={this.state.debit.description}
                                onChange={this.handleChange}
                                placeholder="Enter description"
                                required
                            />
                            <input
                                name="amount"
                                type="number"
                                value={this.state.debit.amount}
                                onChange={this.handleChange}
                                placeholder="Enter amount"
                                required
                            />
                            <Button id="add-btn" type="submit" variant="outline-secondary">Add</Button>
                        </form>
                    </div>

                    <div id="debit-history">
                        <h3>Debit History</h3>
                        <div id="history-table-header">
                            <div id="date">Date</div>
                            <div id="description">Description</div>
                            <div id="amount">Amount</div>
                        </div>
                        {this.props.debits.map((transaction)=>{
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
