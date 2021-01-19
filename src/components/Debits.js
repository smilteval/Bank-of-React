import React, { Component } from 'react'
import {Link} from "react-router-dom"
import AccountBalance from './AccountBalance';
import TransactionCard from './TransactionCard';

export default class Debits extends Component {

    constructor(props){
        super(props);
        this.state={
            debit: {
                id: "",
                description: "",
                amount: "",
                date: ""
            }
        }
    }

    render() {
        return (
            <div id="debit-page">
                
                <h1 id="debits-title">Debits</h1>
                <div id="debits-account-balance">
                    <AccountBalance accountBalance={this.props.accountBalance}/>
                </div>
                <div>Debit Amount: ${this.props.debitAmount}</div>

                <div id="debit-history">
                    <h3>Debit History</h3>
                    {this.props.debits.map((transaction)=>{
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
