import React from "react";
import { observer, inject } from 'mobx-react'
import { Grid, AppBar, Toolbar, Typography } from "@material-ui/core";

export const Home = ({ store }) => (
    <div>
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            Tide dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Grid container spacing={24}>
        <Grid item xs={2}>
          Menu
        </Grid>
        <Grid item xs={8}>
          <h1>Customers</h1>
          {store.companies.length}
        </Grid>
      </Grid>
    </div>
  )

  export const HomePage = inject('store')(observer(Home))