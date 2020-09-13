import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { getSessionDetails, resetSessionDetail } from '../actions/session'
import Loading from '../components/Shared/Loading'
import styled from 'styled-components'
import {
  Text
} from 'rebass'

import Question from '../components/Session/Question'
import Review from '../components/Session/Review';


const mapDispatchToProps = { getSessionDetails, resetSessionDetail }

const mapStateToProps = (state) => {
  return state
}

const Session = (props) => {

  useEffect(() => {
    props.getSessionDetails(props.match.params.session_id)

    return () => {
      props.resetSessionDetail()
    }
  }, [])

  if (props.session.isFetchingSession) return <Loading />
  if (!props.session.currentSession || !props.session.currentSection) return null

  return (
    <Container>
      <Text>
        <b>Current Session ID:</b> {props.match.params.session_id}<br />
        <b>Current Section ID:</b> {props.session.currentSection.section_id}
      </Text>

      {props.session.reviewMode
        ? <Review
          returnHome={() => {
            props.history.push('/')
          }}
        />
        : <Question />
      }



    </Container >
  )
}
const Container = styled.div`
  padding: 30px;
`


export default connect(mapStateToProps, mapDispatchToProps)(Session)
