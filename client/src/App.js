import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ThemeProvider } from 'emotion-theming'
import theme from '@rebass/preset'
import { connect } from 'react-redux'
import { getCookie } from './utils/helpers'

import Home from './screens/Home'
import Exam from './screens/Exam'
import Session from './screens/Session'
import Login from './screens/Login'
import Practice from './screens/Practice'
import PracticeTopic from './screens/PracticeTopic'

import NavBar from './components/Header/NavBar'
import Loading from './components/Shared/Loading'

import { getUser } from './actions/auth'

import Import from './screens/Import';
import { HotKeys } from "react-hotkeys";

const mapDispatchToProps = { getUser }

const mapStateToProps = (state) => {
  return state
}

const App = (props) => {
  const [authenticated, setAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    const token = getCookie("jwt")

    if (token) {
      props.getUser()
      setAuthenticated(true)
    }

    setLoading(false)
  }, [])


  if (loading) {
    return <Loading />
  }

  return (

    <ThemeProvider theme={theme}>
      <div id="root">
        <Router>
          {authenticated ?
            <>
              <Route render={(props) => <NavBar {...props} setAuthenticated={setAuthenticated} />} />
              <Switch>
                <Route path={'/session/:session_id'} component={Session} />
                <Route path={'/exam/:structure_id'} component={Exam} />
                <Route path={'/mock/:structure_id'} component={Exam} />
                <Route path={'/practice/:category_id'} component={PracticeTopic} />
                <Route path='/practice' component={Practice} />
                <Route path='/import' component={Import} />
                <Route path='/mocks' render={(props) => <Home {...props} type={"Mock"} />} />
                <Route path='/' render={(props) => <Home {...props} type={"Exam"} />} />
              </Switch>
            </>
            :
            <>
              <Route render={(props) => <Login {...props} setAuthenticated={setAuthenticated} />} />
            </>
          }
        </Router>
      </div>

    </ThemeProvider>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
