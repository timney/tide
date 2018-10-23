import React from 'react'
import { H5, Card, Button } from '@blueprintjs/core'

export const AccountView = ({ account, viewClick}) => (
    <Card interactive key={account.accountId}>
        <H5>{account.name}</H5>
        <p>{account.balance}</p>
        <Button onClick={viewClick}>
            Go
        </Button>
    </Card>
)
