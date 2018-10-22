import React from 'react'
import { observer, inject } from "mobx-react"
import { H4, H5, Card, Button } from '@blueprintjs/core'
import { compose, mapProps, branch, renderNothing } from 'recompose'

import './AccountPage.css'

export const Account = ({ accounts, getTransactions }) => (
  <div>
    <H4>Accounts</H4>
    <div className="account">
      {accounts.map(a => (
        <Card interactive key={a.accountId}>
            <H5>{a.name}</H5>
            <p>{a.balance}</p>
            <Button onClick={() => getTransactions(a.accountId)}>
              Go
            </Button>
        </Card>
      ))}
    </div>
  </div>
)

const enhance = compose(
  inject('store'),
  mapProps(({ store }) => ({
    accounts: store.accountStore.accounts,
    hasAccounts: store.accountStore.accounts.length > 0,
    getTransactions: e => store.transactionStore.getTransactions(e)
  })),
  observer,
)

export const AccountPage = enhance(Account)