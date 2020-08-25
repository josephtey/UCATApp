import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Home from './screens/Home'

const App = (props) => {
  return (
    <Router>
      <Route path='/' component={Home} />
    </Router>
  )
}

export default App
