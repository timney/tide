import React from "react";
import { observer, inject } from "mobx-react";
import { Card, Button, H5, H4 } from '@blueprintjs/core'

import './CompanyPage.css'
import { runInAction } from "mobx";

export const Company = ({ store }) => (
  <div>
    <H4>Companies</H4>
    <div className="company">
        {store.companyStore.companies.map(c => (
            <Card interactive>
                <H5>{c.name}</H5>
                <p>{c.number}</p>
                <p>{c.vatNumber}</p>
                <Button onClick={() => store.accountStore.getAccounts(c.companyId)}>
                    Go
                </Button>
            </Card>
        ))}
    </div>
  </div>
);

export const CompanyPage = inject("store")(observer(Company));
