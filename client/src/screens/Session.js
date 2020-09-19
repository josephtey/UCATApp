import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { getSessionDetails, resetSessionDetail, startSection, stopSection } from '../actions/session'
import Loading from '../components/Shared/Loading'
import styled from 'styled-components'
import {
  Text
} from 'rebass'

import Question from '../components/Session/Question'
import Review from '../components/Session/Review';
import Start from '../components/Session/Start';
import Results from '../components/Session/Results';


const mapDispatchToProps = { getSessionDetails, resetSessionDetail, stopSection }

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
  if (!props.session.currentSession) return null

  return (
    <>

      <TopBar>

      </TopBar>

      <Container>

        {props.session.mode === "review" ? <Review />
          : props.session.mode === "question" ?
            <Question />
            : props.session.mode === "start" ?
              <Start />
              : props.session.mode === "results" ?
                <Results />
                : null
        }
      </Container>

      <BottomBar>

      </BottomBar>



    </>
  )
}
const Container = styled.div`
  padding: 30px;
`
const TopBar = styled.div`
  background: #2ecfb0;
  height: 50px;
`

const BottomBar = styled.div`
  background: #2ecfb0;
  height: 50px;
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
`

export default connect(mapStateToProps, mapDispatchToProps)(Session)
