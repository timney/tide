  import React from "react"
  import { observer, inject } from "mobx-react"

  import { Header } from "./Header"
  import { CompanyPage } from "../company/CompanyPage"

  import './HomePage.css'

  export const Home = ({ store }) => (
    <div className="home">
      <Header />
      <CompanyPage />
    </div>
  )

  export const HomePage = inject("store")(observer(Home))
