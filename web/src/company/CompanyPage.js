import React from "react";
import { observer, inject } from "mobx-react";
import { Card, Button, H5, H4 } from '@blueprintjs/core'
import { compose, mapProps } from 'recompose'

import './CompanyPage.css'

export const Company = ({ companies, getAccounts }) => (
  <div>
    <H4>Companies</H4>
    <div className="company">
        {companies.map(c => (
            <Card interactive key={c.companyId}>
                <H5>{c.name}</H5>
                <p>{c.number}</p>
                <p>{c.vatNumber}</p>
                <Button onClick={() => getAccounts(c.companyId)}>
                    Go
                </Button>
            </Card>
        ))}
    </div>
  </div>
);

const enhance = compose(
    inject('store'),
    mapProps(({ store }) => ({
        companies: store.companyStore.companies,
        getAccounts: e => store.accountStore.getAccounts(e)
    })),
    observer
)

export const CompanyPage = enhance(Company);
