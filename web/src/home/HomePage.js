  import React from "react"
  import { observer, inject } from "mobx-react"

  import { Header } from "./Header"
  import { CompanyPage } from "../company/CompanyPage"
  import { AccountPage } from '../account/AccountPage'
  import { TransactionPage } from '../transaction/TransactionPage'

  import './HomePage.css'

  export const Home = ({ store }) => (
    <div className="home">
      <Header />
      <CompanyPage />
      <AccountPage />
      <TransactionPage />
    </div>
  )

  export const HomePage = inject("store")(observer(Home))
