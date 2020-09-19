import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ThemeProvider } from 'emotion-theming'
import theme from '@rebass/preset'
import styled from 'styled-components'

import Home from './screens/Home'
import Exam from './screens/Exam'
import Session from './screens/Session'
import NavBar from './components/Header/NavBar'

const App = (props) => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Route component={NavBar} />
        <Switch>
          <Route path={'/session/:session_id'} component={Session} />
          <Route path={'/exam/:structure_id'} component={Exam} />
          <Route path='/' component={Home} />
        </Switch>
      </Router>
    </ThemeProvider>
  )
}

export default App
