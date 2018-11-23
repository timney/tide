import React from "react";
import { H1, Navbar, Alignment } from '@blueprintjs/core'

import './Header.css'

export const Header = () => {
  return (
    <Navbar>
      <Navbar.Group align={Alignment.LEFT}>
        <Navbar.Heading>
          Tide dashboard
        </Navbar.Heading>
      </Navbar.Group>
      <Navbar.Group align={Alignment.RIGHT}>
        <a href="http://github.com/timney/tide">github.com/timney/tide</a>
      </Navbar.Group>
    </Navbar>
  )
}
