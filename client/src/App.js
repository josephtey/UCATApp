import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ThemeProvider } from 'emotion-theming'
import theme from '@rebass/preset'

import Home from './screens/Home'
import Exam from './screens/Exam'
import Section from './screens/Section'
import NavBar from './components/Header/NavBar'

const App = (props) => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Route component={NavBar} />
        <Switch>
          <Route path={'/exam/:structure_id/:section_id'} component={Section} />
          <Route path={'/exam/:structure_id'} component={Exam} />
          <Route path='/' component={Home} />
        </Switch>
      </Router>
    </ThemeProvider>
  )
}

export default App
