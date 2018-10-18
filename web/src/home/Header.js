import React from "react";
import { H1 } from '@blueprintjs/core'

import './Header.css'

export const Header = () => (
  <div className="header">
    <div className="title">
        <H1>Tide Dashboard</H1>
    </div>
    <div className="sub-title">
        <a href="http://github.com/timney/tide">github.com/timney/tide</a>
    </div>
  </div>
)
