import React from 'react'
import { observer, inject } from "mobx-react"
import { H4 } from '@blueprintjs/core'
import { compose, mapProps } from 'recompose'
import { Column, Table, Cell, ColumnHeaderCell } from "@blueprintjs/table";
 

const date = (transactions) => (index) => (
    <Cell>{new Date(transactions[index].isoTransactionDateTime).toLocaleString('en-GB', { timeZone: 'UTC' })}</Cell>
)

const amount = (transactions) => (index) => (
    <Cell>{transactions[index].amount}</Cell>
)

const type = (transactions) => (index) => (
    <Cell>{transactions[index].type}</Cell>
)

const desc = (transactions) => (index) => (
    <Cell style={{ minWidth: '300px' }}>{transactions[index].description}</Cell>
)

const descHeader = () => <ColumnHeaderCell name={"Description"} />

const Branch = (test, todo) => Wrapped => props => test(props) ? todo() : <Wrapped {...props} />

export const Transaction = ({ transactions }) => (
    <React.Fragment>
        <div className="transactions">
            <H4>Transactions</H4>
            <Table 
                className="transaction" 
                numRows={transactions.length}
                columnWidths={[150, 100, 100, 300]}>
                <Column name="Date" cellRenderer={date(transactions)} />
                <Column name="Amount" cellRenderer={amount(transactions)} />
                <Column name="Type" cellRenderer={type(transactions)} />
                <Column columnHeaderCellRenderer={descHeader} cellRenderer={desc(transactions)} />
            </Table>
        </div>
    </React.Fragment>
)

const enhance = compose(
    inject('store'),
    mapProps(({ store }) => ({
        transactions: store.transactionStore.transactions
    })),
    observer,
    Branch(
        props => {
            console.log('test', props)
            return props.transactions && !props.transactions.length
        },
        () => null
    ),
)

export const TransactionPage = enhance(Transaction)