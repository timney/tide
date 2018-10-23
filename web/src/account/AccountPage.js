import React from 'react'
import { observer, inject } from "mobx-react"
import { H4, H5, Card, Button } from '@blueprintjs/core'
import { compose, mapProps, branch, renderNothing } from 'recompose'

import { AccountView } from './AccountView'
import './AccountPage.css'

export const Account = ({ accounts, getTransactions }) => (
  <div>
    <H4>Accounts</H4>
    <div className="account">
      {accounts.map(a => (
        <AccountView 
          key={a.accountId}
          account={a}
          viewClick={getTransactions(a.accountId)}
        />
      ))}
    </div>
  </div>
)

const enhance = compose(
  inject('store'),
  branch(
    ({ store }) => store.accountStore.accounts.length === 0,
    renderNothing
  ),
  mapProps(({ store }) => ({
    accounts: store.accountStore.accounts,
    getTransactions: e => () => store.transactionStore.getTransactions(e)
  })),
  
  observer,
)

export const AccountPage = enhance(Account)