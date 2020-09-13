import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import { getSessionDetails, resetSessionDetail } from '../actions/session'
import Loading from '../components/Shared/Loading'
import styled from 'styled-components'
import {
  Heading,
  Button,
  Text,
  Box
} from 'rebass'

import Question from '../components/Session/Question'
import ResponseStatus from '../components/Session/ResponseStatus'


const mapDispatchToProps = { getSessionDetails, resetSessionDetail }

const mapStateToProps = (state) => {
  return state
}

const Session = (props) => {

  useEffect(() => {
    // Get Session Details if it doesn't already exist
    props.getSessionDetails(props.match.params.session_id)

    return () => {
      props.resetSessionDetail()
    }
  }, [])

  if (props.session.isFetchingSession) return <Loading />
  if (!props.session.currentSession) return null

  return (
    <Container>
      <Text>
        Current Session ID: {props.match.params.session_id}
      </Text>

      <Question />

      <ResponseStatus />
    </Container >
  )
}
const Container = styled.div`
  padding: 30px;
`


export default connect(mapStateToProps, mapDispatchToProps)(Session)
