import React from "react"
import { observer, inject } from "mobx-react"
import { Tree, Classes } from '@blueprintjs/core'
import { compose, mapProps } from 'recompose'

import './CompanyPage.css'

const mapToTree = accounts => c => ({
    label: c.name,
    id: c.companyId,
    hasCaret: true,
    path: [1],
    isExpanded: !!accounts.length,
    secondaryLabel: 'Company',
    icon: 'office',
    childNodes: accounts.map(mapToChild)
})

const mapToChild = a => ({
    id: a.accountId,
    label: a.name,
    secondaryLabel: 'Account',
    isAccount: true,
    icon: 'bank-account'
})

export const Company = ({ companies, accounts, getAccounts, getTransactions }) => (
  <div>
    <div className="company">
        <Tree
            className={`${Classes.ELEVATION_0} tree`}
            contents={companies.map(mapToTree(accounts))}
            onNodeClick={(node) => !node.isAccount ? getAccounts(node.id) : getTransactions(node.id)}
        />
    </div>
  </div>
);

const enhance = compose(
    inject('store'),
    mapProps(({ store }) => ({
        companies: store.companyStore.companies,
        accounts: store.accountStore.accounts,
        getAccounts: e => store.accountStore.getAccounts(e),
        getTransactions: e => store.transactionStore.getTransactions(e)
    })),
    observer
)

export const CompanyPage = enhance(Company);
