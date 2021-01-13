import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import { getSessionDetails, resetSessionDetail, finishSession, nextSection } from '../actions/session'
import Loading from '../components/Shared/Loading'
import styled from 'styled-components'
import LogoImage from '../assets/in2medlogo.png'

import Question from '../components/Session/Question'
import Answer from '../components/Session/Answer'
import Review from '../components/Session/Review';
import Start from '../components/Session/Start';
import Results from '../components/Session/Results';


const mapDispatchToProps = { getSessionDetails, resetSessionDetail, finishSession, nextSection }

const mapStateToProps = (state) => {
  return state
}

const Timer = ({
  startTimestamp,
  sectionTimeLength,
  onFinished
}) => {

  const calculateTimeLeft = () => {
    const totalTime = (sectionTimeLength * 60000)
    const currentTime = new Date().getTime()
    const startTime = new Date(startTimestamp).getTime()
    const timeRemaining = (totalTime - (currentTime - startTime)) / 60000
    const secondsRemaining = ((timeRemaining) - Math.floor(timeRemaining)) * 60
    return [timeRemaining.toFixed(2), Math.floor(timeRemaining), Math.round(secondsRemaining)]
  }

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())
  const [timerStop, setTimerStop] = useState(false)

  useEffect(() => {

    if (!timerStop) {
      const timer = setTimeout(() => {
        setTimeLeft(calculateTimeLeft());

        if (timeLeft[0] < 0) {
          onFinished()
          setTimerStop(true)
        }
      }, 1000);

      return () => clearTimeout(timer);
    }


  })

  if (!startTimestamp) return null

  if (!timeLeft) return null

  if (!timerStop) {
    return (
      <>
        {timeLeft[1]} minutes {timeLeft[2]} seconds left
      </>
    )
  } else {
    return (
      <>
        Time Expired
      </>
    )
  }

}

const Session = (props) => {

  useEffect(() => {
    props.getSessionDetails(props.match.params.session_id)

    return () => {
      props.resetSessionDetail()
    }
  }, [])

  if (props.session.isFetchingSession) return <Loading duringSession={true} />
  if (!props.session.currentSession || !props.session.currentStructure) return null

  return (
    <SessionContainer>

      <TopBar>
        <TopBarInner>
          <TopBarLeft>
            {props.session.currentStructure && props.session.currentSection ?
              <>
                {props.session.currentStructure.name} - {props.session.currentSection.name}
              </>
              : null}
          </TopBarLeft>
          <TopBarRight>
            {props.session.currentStructure.type === "Exam" || props.session.currentStructure.type === "Mock" ?
              <>
                {props.session.currentSession.start_time.length > 0 && props.session.currentSession.start_time.length != props.session.currentSession.end_time.length
                  ? <Timer
                    startTimestamp={props.session.currentSession.start_time[props.session.currentStructure.section_order.indexOf(props.session.currentSection.section_id)]}
                    sectionTimeLength={props.session.currentSection.time}
                    onFinished={() => {
                      alert("You have run out of time!")

                      if (props.session.currentSection.section_id !== props.session.currentStructure.section_order.slice(-1)[0]) {
                        const currentSectionId = props.session.currentSection.section_id
                        const currentSectionIndex = props.session.currentStructure.section_order.indexOf(currentSectionId)
                        props.nextSection(
                          props.session.currentSession.session_id,
                          props.session.currentStructure.section_order[currentSectionIndex + 1]
                        )
                      } else {
                        props.finishSession(props.session.currentSession.session_id, props.session.currentStructure)
                      }

                    }}
                  />
                  : null}
              </>
              : null}
          </TopBarRight>
        </TopBarInner>
      </TopBar>

      <Container>

        {props.session.mode === "review" ? <Review />
          : props.session.mode === "question" ?
            <Question />
            : props.session.mode === "answer" ?
              <Answer />
              : props.session.mode === "start" ?
                <Start
                  returnHome={() => props.history.push('/exam/' + props.session.currentSession.structure_id)}
                />
                : props.session.mode === "results" ?
                  <Results
                    returnHome={() => {
                      props.history.push(
                        props.session.currentStructure.type === "Exam" ?
                          '/exam/' + props.session.currentSession.structure_id
                          : props.session.currentStructure.type === "Practice" ?
                            '/practice/' + props.session.currentStructure.category_id
                            : props.session.currentStructure.type === "Mock" ?
                              '/mock/' + props.session.currentStructure.structure_id
                              : null
                      )
                    }}
                  />
                  : null
        }
      </Container>
    </SessionContainer>
  )
}

const SessionContainer = styled.div`
  background: white;
  min-height: 100vh;
  font-family: arial !important;
`

const Container = styled.div`
  padding-top: 80px;
`
const TopBar = styled.div`
  box-shadow: 10px 10px 20px rgba(0,0,0, 0.02);
  background: #006daa;
  color: white;
  height: 50px;
  width: 100%;
  overflow: hidden;
  position: fixed;
  top: 0;
  z-index: 999;
`

const TopBarInner = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const TopBarLeft = styled.div`
  padding: 30px;
`
const TopBarRight = styled.div`
padding: 30px;
`
export default connect(mapStateToProps, mapDispatchToProps)(Session)
