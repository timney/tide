import React from 'react'

import { Button, Callout } from "@blueprintjs/core";

const redirect_url = "http://localhost:8899/code"
const client_id = "TidePersonalApi"
const auth_url = "https://api.tide.co/tide-backend/oauth/index.html?redirect_url=" + redirect_url + "&client_id=" + client_id


export const LoginPage = () => {
  return (
    <div>
      <h1>Login</h1>
      <Callout title="Authorise">
        <p>
          Allow access to your Tide account to proceed
        </p>
        <Button onClick={() => window.location = auth_url}>
            Authorise
        </Button>
      </Callout>
    </div>
  )
}
