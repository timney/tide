import React from 'react'
import { observer, inject } from "mobx-react"
import { H4, H5, Card } from '@blueprintjs/core'
import { compose, mapProps } from 'recompose'
import { Column, Table, Cell } from "@blueprintjs/table";
 
const amount = (transactions) => (index) => (
    <Cell>{transactions[index].amount}</Cell>
)

export const Transaction = ({ transactions }) => (
    <div>
        <H4>Transactions</H4>
        <Table className="transaction" numRows={transactions.length}>
            {transactions.map(t => {
                const am = () => <Cell>{t.amount}</Cell>
                const pyi = () => <Cell>{t.pyi}</Cell>
                const desc = () => <Cell>{t.description}</Cell>
                return [
                    <Column name="amount" cellRenderer={am} />,
                    <Column name="pyi" cellRenderer={pyi} />,
                    <Column name="description" cellRenderer={desc} />,
                ]
            })}
        </Table>
    </div>
)

const enhance = compose(
    inject('store'),
    mapProps(({ store }) => ({
        transactions: store.transactionStore.transactions
    })),
    observer
)

export const TransactionPage = enhance(Transaction)