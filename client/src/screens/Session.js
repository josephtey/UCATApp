import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { getSessionDetails, resetSessionDetail, startSection, stopSection } from '../actions/session'
import Loading from '../components/Shared/Loading'
import styled from 'styled-components'
import LogoImage from '../assets/in2medlogo.png'

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

  if (props.session.isFetchingSession) return <Loading duringSession={true} />
  if (!props.session.currentSession) return null

  return (
    <>

      <TopBar>
        <TopBarInner>
          <TopBarLeft>
            {props.session.currentSection ? props.session.currentSection.name : null}
          </TopBarLeft>
          <img src={LogoImage} width="100" />
          <TopBarRight>
            30 minutes left
          </TopBarRight>
        </TopBarInner>
      </TopBar>

      <Container>

        {props.session.mode === "review" ? <Review />
          : props.session.mode === "question" ?
            <Question />
            : props.session.mode === "start" ?
              <Start
                returnHome={() => props.history.push('/')}
              />
              : props.session.mode === "results" ?
                <Results
                  returnHome={() => props.history.push('/')}
                />
                : null
        }
      </Container>
    </>
  )
}
const Container = styled.div`
  padding: 30px;
  width: 1000px;
  margin: 0 auto;
`
const TopBar = styled.div`
  box-shadow: 10px 10px 20px rgba(0,0,0, 0.02);
  background: white;
  height: 70px;
  width: 100%;
`

const TopBarInner = styled.div`
  width: 1000px;
  height: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const TopBarLeft = styled.div`
`
const TopBarRight = styled.div`
`
export default connect(mapStateToProps, mapDispatchToProps)(Session)
